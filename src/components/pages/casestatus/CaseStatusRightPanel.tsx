import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CaseProgressCard from "./CaseProgressCard";
import CaseSummaryCard from "./CaseSummaryCard";
import "./CaseStatusRightPanel.css";
import { Loading } from "../../common/Loading";
import { getCaseSummaryApi } from "../../../api/caseAPI";
import { updateAsylumType } from "../../../reducers/formSlice";
import { updateCurrentCaseId } from "../../../reducers/caseSlice";

function useFetchCaseSummary() {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const role = useAppSelector(state => state.auth.role);

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
      const data = await getCaseSummaryApi(parseInt(id), accessToken, role);

      if (data) {
        setCaseSummary(data);
        if (data.asylumType) {
          dispatch(updateAsylumType(data.asylumType as "AFFIRMATIVE" | "DEFENSIVE"));
        } else {
          console.error("Asylum type is empty.");
        }
        if (data.id) {
          dispatch(updateCurrentCaseId(data.id.toString()));
        } else {
          console.error("Case ID is missing in the case summary.");
        }
      } else {
        console.error("Failed to fetch case summary data.");
        setError("Failed to fetch case summary data.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch case summary:", error);
      setError("Failed to fetch case summary. Please try again later.");
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
