import { Alert } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getCaseSummaryApi } from "../../../api/caseSummaryAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CaseSummary } from "../../../model/apiModels";
import { CaseSubType } from "../../../model/immigrationTypes";
import { updateCurrentCaseInfo } from "../../../reducers/caseSlice";
import { Loading } from "../../common/Loading";
import CaseProgressCard from "./CaseProgressCard";
import "./CaseStatusRightPanel.css";
import CaseSummaryCard from "./CaseSummaryCard";

function useFetchCaseSummary() {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const role = useAppSelector(state => state.auth.role);
  const currentCaseType = useAppSelector(state => state.case.currentCaseType);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);

  const fetchCaseSummary = useCallback(async () => {
    if (!accessToken || !userId || !id || isNaN(Number(id))) {
      const missingField = !accessToken || !userId ? "Access token or user ID" : "Case ID";
      console.error(`${missingField} is missing or invalid`);
      setError(`${missingField} is missing or invalid`);
      return;
    }

    try {
      setLoading(true);

      if (!currentCaseType) {
        console.error("Current case type is missing.");
        setError("Current case type is missing.");
        setLoading(false);
        return;
      }

      const data = await getCaseSummaryApi(accessToken, role, parseInt(id), currentCaseType);

      if (data) {
        setCaseSummary(data);
        if (data.id) {
          dispatch(
            updateCurrentCaseInfo({
              caseId: data.id.toString(),
              caseType: currentCaseType,
              caseSubType: (data.subType as CaseSubType) || null,
            }),
          );
        } else {
          console.error("Case ID is missing in the case summary.");
        }
      } else {
        console.error("Failed to fetch case summary data.");
        setError("Failed to fetch case summary data.");
      }

      setLoading(false);
    } catch (error: any) {
      console.error(error);
      let errMsg = "Failed to fetch case summary. Please try again later.";
      if (error?.message?.includes("403") || error?.status === 403) {
        errMsg = "Forbidden: You do not have permission to access this resource.";
      }
      setError(errMsg);
      setLoading(false);
    }
  }, [accessToken, userId, id, role]);

  useEffect(() => {
    fetchCaseSummary();
  }, [fetchCaseSummary]);

  return { loading, error, caseSummary, setCaseSummary, fetchCaseSummary };
}

export function CaseStatusRightPanel() {
  const { loading, error, caseSummary, setCaseSummary, fetchCaseSummary } = useFetchCaseSummary();
  const { t } = useTranslation();

  const handleCaseSummaryUpdate = () => {
    fetchCaseSummary();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!caseSummary) {
    return null;
  }

  return (
    <div className="caseStatus">
      <CaseSummaryCard caseSummary={caseSummary} />
      <CaseProgressCard caseSummary={caseSummary} onCaseSummaryUpdate={handleCaseSummaryUpdate} />
    </div>
  );
}
