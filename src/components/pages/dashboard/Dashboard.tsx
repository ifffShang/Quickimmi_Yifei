import { useEffect, useState } from "react";
import { Button, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
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
import { Role } from "../../../consts/consts";

export function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const isLawyer = useAppSelector(state => state.auth.isLawyer);
  const role = useAppSelector(state => state.auth.role);
  const cases = useAppSelector(state => state.case.cases);

  // Extract query parameters from the URL
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(3); // Adjust page size as needed
  // const [pageSize, setPageSize] = useState(6); // Adjust page size as needed
  const [totalItems, setTotalItems] = useState(0);

  const getCases = async () => {
    if (!accessToken || !userId) {
      console.error(
        `Access token ${accessToken} or user id ${userId} is missing`,
      );
      // TODO: pop up error message
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      let cases;
      let data;
      if (isLawyer) {
        data = await getCasesByLawyerApi(
          userId!,
          currentPage,
          pageSize,
          accessToken,
          role,
        );
        cases = data.cases;
        setTotalItems(data.metadata.totalItems);
        console.log(`Number of cases assigned to the lawyer: ${cases.length}`);
        console.log("lawyerId", userId);
        cases.forEach(c => console.log(`Case ID: ${c.id}`));
      } else {
        data = await getCasesApi(
          userId!,
          currentPage,
          pageSize,
          accessToken,
          role,
        );
        cases = data.cases;
        setTotalItems(data.metadata.totalItems);
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
  }, [accessToken, userId, currentPage]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1");
    setCurrentPage(page);
  }, [location.search]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    const query = new URLSearchParams(location.search);
    query.set("page", page.toString());
    navigate({ search: query.toString() });
  };

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
      role,
    );
    dispatch(updateCurrentCaseId(caseId));
    navigate("/case/" + caseId);
  };

  // Create new cases for Lawyers
  const CreateNewCaseForLawyer = async () => {
    if (!isLawyer) {
      console.error("Only lawyer can create case from this page.");
      // TODO: pop up error message
      return;
    }
    if (!accessToken || !userId) {
      console.error(
        `Access token ${accessToken} or lawyer id ${userId} is missing`,
      );
      return;
    }

    navigate("/lawyerNewCase");
  };

  if (loading) {
    return <Loading />;
  }

  // Customer Dashboard Content
  const customerContent =
    cases && cases.length > 0 ? (
      <div className="dashboard-panel has-application">
        {cases.map(c => (
          <CaseCard
            key={c.id}
            caseData={c}
            onDelete={getCases}
          />
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
          <CaseCard
            key={c.id}
            caseData={c}
            onDelete={getCases}
          />
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
        {role === Role.LAWYER ? (
          <Button type="primary" onClick={CreateNewCaseForLawyer}>
            {t("Dashboard.CreateNewApplication")}
          </Button>
        ) : (
          <Button type="primary" onClick={CreateNewApplication}>
            {t("Dashboard.CreateNewApplication")}
          </Button>
        )}
      </div>

      {role === Role.LAWYER ? lawyerContent : customerContent}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          showTotal={total => `Total ${total} items`}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
