import { Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createNewCaseApi, getCasesApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateCases, updateCurrentCaseId } from "../../../reducers/caseSlice";
import { QText } from "../../common/Fonts";
import { CaseIcon, NewApplicationIcon } from "../../icons/Dashboard";
import "./Dashboard.css";
import { Loading } from "../../common/Loading";
import { getCaseId } from "../../../utils/utils";
import { CaseCard } from "./CaseCard";

export function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const cases = useAppSelector(state => state.case.cases);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!accessToken || !userId) {
      console.error(
        `Access token ${accessToken} or user id ${userId} is missing`,
      );
      setLoading(false);
      return;
    }

    getCasesApi(userId, accessToken)
      .then(cases => {
        dispatch(updateCases(cases));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return <Loading />;
  }

  const innerContent =
    cases && cases.length > 0 ? (
      <div className="dashboard-panel has-application">
        {cases.map(c => (
          <CaseCard key={c.id} caseId={c.id} />
        ))}
      </div>
    ) : (
      <div className="dashboard-panel no-application">
        <NewApplicationIcon />
        <QText level="large">{t("Dashboard.FirstApplication")}</QText>
        <QText level="small" color="gray">
          {t("Dashboard.GreetingMessage")}
        </QText>
        <Button type="primary" onClick={createNewCase}>
          {t("Dashboard.CreateNewApplication")}
        </Button>
      </div>
    );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          <QText level="large">{t("Dashboard.Dashboard")}</QText>
        </h2>
        <Button type="primary" onClick={createNewCase}>
          {t("Dashboard.CreateNewApplication")}
        </Button>
      </div>

      {innerContent}
    </div>
  );
}
