import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Card, Descriptions, Spin, Steps, Button, Tag } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DownloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import CaseProgressCard from "./CaseProgressCard";
import CaseStatusCard from "./CaseStatusCard";
import "./CaseStatusRightPanel.css";

const { Step } = Steps;

function useFetchCaseSummary() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);

  const fetchCaseSummary = useCallback(async () => {
    if (!accessToken || !userId) {
      console.error("Access token or user id is missing");
      setError("Access token or user id is missing");
      return;
    }

    if (!id || isNaN(Number(id))) {
      console.error("Invalid case ID");
      setError("Invalid case ID");
      return;
    }

    try {
      setLoading(true);
      // Mock data
      const mockCaseSummary: CaseSummary = {
        id: 400002,
        applicantName: "Lili Han",
        caseType: "Asylum",
        asylumType: "Political",
        maritalStatus: "Married",
        applyWithSpouse: true,
        numberOfChildren: 2,
        numberOfApplyingChildren: 1,
        currentStep: "Review and Sign",
        progress: "In Progress",
        desc: "Lawyer review in progress",
        createdAt: 1617283200000, // Timestamp for 2024-02-12
        updatedAt: 1617955200000, // Timestamp for 2024-03-19
      };
      setCaseSummary(mockCaseSummary);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch case summary");
    } finally {
      setLoading(false);
    }
  }, [accessToken, userId, id, dispatch]);

  useEffect(() => {
    fetchCaseSummary();
  }, [fetchCaseSummary]);

  return { loading, error, caseSummary };
}

export function CaseStatusRightPanel() {
  const { loading, error, caseSummary } = useFetchCaseSummary();
  const { t } = useTranslation();

  if (loading) {
    return (
      <Spin tip="Loading...">
        <div className="loading-content" />
      </Spin>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!caseSummary) {
    return null;
  }

  return (
    <div className="caseStatus">
      <CaseStatusCard caseSummary={caseSummary} />
      <CaseProgressCard currentStep={caseSummary.currentStep} />
    </div>
  );
}
