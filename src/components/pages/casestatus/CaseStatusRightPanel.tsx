import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Card, Descriptions, Spin, Steps, Button, Tag } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CaseProgressCard from "./CaseProgressCard";
import CaseStatusCard from "./CaseStatusCard";
import "./CaseStatusRightPanel.css";

const { Step } = Steps;

function useFetchCaseSummary() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const state = useAppSelector(state => state);
  const userId = useAppSelector(state => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);

  const fetchCaseSummary = useCallback(async () => {
    console.error("state", state);
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
      // getCaseSummaryApi(id, accessToken)
      //     .then((data) => {
      //       setCaseSummary(data);
      //       setLoading(false);
      //     })
      //     .catch((error) => {
      //       console.error("Failed to fetch case summary:", error);
      //       setError("Failed to fetch case summary. Please try again later.");
      //       setLoading(false);
      //     });
      // Mock data
      const mockCaseSummary: CaseSummary = {
        id: 55,
        applicantName: "Brandon Qi",
        caseType: "Asylum",
        asylumType: "AFFIRMATIVE",
        maritalStatus: "Married",
        applyWithSpouse: false,
        numberOfChildren: 2,
        numberOfApplyingChildren: 1,
        currentStep: "REVIEW_AND_SIGN",
        progress: {
          steps: [
            {
              name: "FILLING_APPLICATION",
              status: "NOT_START",
              substeps: [
                {
                  name: "FILLING_DETAILS",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
              ],
              startedAt: 1716788746776,
              updatedAt: 1716788746776,
            },
            {
              name: "REVIEW_AND_SIGN",
              status: "NOT_START",
              substeps: [
                {
                  name: "LAWYER_REVIEW",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
                {
                  name: "CLIENT_SIGNATURE",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
              ],
              startedAt: 1716788746776,
              updatedAt: 1716788746776,
            },
            {
              name: "SUBMIT_APPLICATION",
              status: "NOT_START",
              substeps: [
                {
                  name: "SUBMIT_APPLICATION",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
                {
                  name: "NOTICE_RECEIPT",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
              ],
              startedAt: 1716788746776,
              updatedAt: 1716788746776,
            },
            {
              name: "FINGERPRINT_INTERVIEW",
              status: "NOT_START",
              substeps: [
                {
                  name: "FINGERPRINT_COLLECTION",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
                {
                  name: "INTERVIEW",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
              ],
              startedAt: 1716788746776,
              updatedAt: 1716788746776,
            },
            {
              name: "FINAL_RESULT",
              status: "NOT_START",
              substeps: [
                {
                  name: "FINAL_REVIEW",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
                {
                  name: "RESULT",
                  status: "NOT_START",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
              ],
              startedAt: 1716788746776,
              updatedAt: 1716788746776,
            },
          ],
        },
        desc: null,
        createdAt: 1715912208190,
        updatedAt: 1718259472477,
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
      <CaseProgressCard caseSummary={caseSummary} />
    </div>
  );
}
