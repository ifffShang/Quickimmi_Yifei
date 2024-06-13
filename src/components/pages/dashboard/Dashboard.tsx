import { useEffect, useState } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  createNewCaseApi,
  getCasesApi,
  getCasesByLawyerApi,
} from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateCases, updateCurrentCaseId } from "../../../reducers/caseSlice";
import { QText } from "../../common/Fonts";
import { Loading } from "../../common/Loading";
import { NewApplicationIcon } from "../../icons/Dashboard";
import { CaseCard } from "./CaseCard";
import "./Dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const lawyerId = useAppSelector(state => state.auth.lawyerId);
  const role = useAppSelector(state => state.auth.role);
  const cases = useAppSelector(state => state.case.cases);

  const getCases = async () => {
    if (!accessToken || (!userId && !lawyerId)) {
      console.error(
        `Access token ${accessToken} or user id ${userId} is missing`,
      );
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      let cases;
      if (role === "lawyer") {
        cases = await getCasesByLawyerApi(lawyerId!, accessToken);
        console.log(`Number of cases assigned to the lawyer: ${cases.length}`);
        console.log("LawyerID", lawyerId);
        cases.forEach(c => console.log(`Case ID: ${c.id}`));
      } else {
        cases = await getCasesApi(userId!, accessToken);
        console.log(
          `Number of cases assigned to the customer: ${cases.length}`,
        );
        console.log("CustomerID", userId);
        cases.forEach(c => console.log(`Case ID: ${c.id}`));
      }
      dispatch(updateCases(cases));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCases();
  }, [accessToken, userId, lawyerId]);

  // Create new applications for Customers
  const CreateNewApplication = async () => {
    if (!accessToken || !userId) {
      console.error(
        `Access token ${accessToken} or user id ${userId} is missing`,
      );
      return;
    }
    const caseId = await createNewCaseApi(
      accessToken,
      userId,
      "Asylum create reason",
      "AFFIRMATIVE",
    );
    dispatch(updateCurrentCaseId(caseId));
    navigate("/case/" + caseId);
  };

  // Create new cases for Lawyers
  const CreateNewCaseForLawyer = async () => {
    if (!accessToken || !lawyerId) {
      console.error(`Access token ${accessToken} or lawyer id ${lawyerId} is missing`);
      return;
    }
    navigate('/lawyerPreForm');
  };

  if (loading) {
    return <Loading />;
  }

  // Customer Dashboard Content
  const customerContent =
    cases && cases.length > 0 ? (
      <div className="dashboard-panel has-application">
        {cases.map(c => (
          <CaseCard key={c.id} caseId={c.id} onDelete={getCases} />
        ))}
      </div>
    ) : (
      <div className="dashboard-panel no-application">
        <NewApplicationIcon />
        <QText level="large">{t("Dashboard.FirstApplication")}</QText>
        <QText level="small" color="gray">
          {t("Dashboard.GreetingMessage")}
        </QText>
        <Button type="primary" onClick={CreateNewApplication}>
          {t("Dashboard.CreateNewApplication")}
        </Button>
      </div>
    );

  // Lawyer Dashboard Content
  const lawyerContent =
    cases && cases.length > 0 ? (
      <div className="dashboard-panel has-application">
        {cases.map(c => (
          <CaseCard key={c.id} caseId={c.id} onDelete={getCases} />
        ))}
      </div>
    ) : (
      <div className="dashboard-panel no-application">
        <NewApplicationIcon />
        <QText level="large">You have no cases assigned</QText>
        <QText level="small" color="gray">
          Please check back later or create a new case.
        </QText>
        <Button type="primary" onClick={CreateNewCaseForLawyer}>
          Create New Case
        </Button>
      </div>
    );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          <QText level="large">{t("Dashboard.Dashboard")}</QText>
        </h2>
        {role === "lawyer" ? (
          <Button type="primary" onClick={CreateNewCaseForLawyer}>
            {t("Dashboard.CreateNewApplication")}
          </Button>
        ) : (
          <Button type="primary" onClick={CreateNewApplication}>
            {t("Dashboard.CreateNewApplication")}
          </Button>
        )}
      </div>

      {role === "lawyer" ? lawyerContent : customerContent}
    </div>
  );
}
