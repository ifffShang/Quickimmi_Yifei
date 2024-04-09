import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import { NewApplicationIcon } from "../../icons/Dashboard";
import "./Dashboard.css";
import { useTranslation } from "react-i18next";

export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    // if (!isLoggedIn) {
    //   navigate("/signin");
    // }
  }, [isLoggedIn]);

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
        <Button type="primary" onClick={() => navigate("/newcase")}>
          {t("Dashboard.CreateNewApplication")}
        </Button>
      </div>
    </div>
  );
}
