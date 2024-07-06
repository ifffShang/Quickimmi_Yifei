import { Button, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeModal } from "../../../reducers/commonSlice";
import { refreshToken, signOutCurrentUser, startTokenExpirationTimer } from "../../../utils/authUtils";
import { QText } from "../../common/Fonts";
import { useEffect } from "react";
import { countDownTokenRefresh } from "../../../reducers/authSlice";
import { InMemoryCache } from "../../../cache/inMemoryCache";

export function TokenRefreshModal() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const tokenRefreshCountDownSeconds = useAppSelector(state => state.auth.tokenRefreshCountDownSeconds);

  useEffect(() => {
    let intervalId = InMemoryCache.get("tokenRefreshCountDownId");
    if (!intervalId) {
      intervalId = setInterval(() => {
        dispatch(countDownTokenRefresh());
      }, 1000);
      InMemoryCache.set("tokenRefreshCountDownId", intervalId);
    }
  }, []);

  return (
    <div className="token-refresh-container">
      <QText level="large">{t("Renew session")}</QText>
      <Divider />
      <div style={{ margin: "0 0 40px 0" }}>
        <QText level="normal">
          {t("Stay Logged In? Your session will end soon. Refresh now to continue without interruption.")}
        </QText>
      </div>
      <Button
        type="primary"
        onClick={async () => {
          try {
            await refreshToken(dispatch);
            dispatch(closeModal());
            startTokenExpirationTimer(dispatch);
          } catch (error) {
            console.error("Error refreshing token", error);
            dispatch(closeModal());
            signOutCurrentUser(dispatch);
          }
        }}
      >
        {t("Refresh") + ` (${tokenRefreshCountDownSeconds})s`}
      </Button>
    </div>
  );
}
