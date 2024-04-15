import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import { NewApplicationIcon } from "../../icons/Dashboard";
import "./Dashboard.css";
import { useTranslation } from "react-i18next";
import { createNewCaseApi } from "../../../api/caseAPI";
import { updateCurrentCaseId } from "../../../reducers/caseSlice";

export function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);

  useEffect(() => {
    // if (!isLoggedIn) {
    //   navigate("/signin");
    // }
  }, [isLoggedIn]);

  const createNewCase = async () => {
    if (!accessToken || !userId) {
      console.error(
        `Access token ${accessToken} or user id ${userId} is missing`,
      );
      return;
    }
    const caseId = await createNewCaseApi(
      accessToken,
      userId,
      "Asylum",
      "Asylum reason",
    );
    dispatch(updateCurrentCaseId(caseId));
    navigate("/newcase");
  };

  return (
    <div className="dashboard">
      <h2>
        <QText level="large">{t("Dashboard.Dashboard")}</QText>
      </h2>
      <div className="dashboard-panel">
        <NewApplicationIcon />
        <QText level="large">{t("Dashboard.FirstApplication")}</QText>
        <QText level="small" color="gray">
          {t("Dashboard.GreetingMessage")}
        </QText>
        <Button type="primary" onClick={createNewCase}>
          {t("Dashboard.CreateNewApplication")}
        </Button>
      </div>
    </div>
  );
}
