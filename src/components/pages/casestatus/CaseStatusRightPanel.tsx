import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Spin } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);
  const role = useAppSelector(state => state.auth.role);

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
      const data = await getCaseSummaryApi(parseInt(id), accessToken, role);
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

      // Mock data
      const mockCaseSummary: CaseSummary = {
        id: 55,
        applicantName: "Brandon Qi",
        caseType: "Asylum",
        caseName: "Brandon Qi's Asylum Case",
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
              status: "IN_PROGRESS",
              substeps: [
                {
                  name: "FILLING_DETAILS",
                  status: "IN_PROGRESS",
                  metadata:
                    '{"percentage":{"overall":{"avg":0},"personal_information":{"avg":0,"i589_fields_basic_information":0,"i589_fields_contact_information":0,"i589_fields_immigration_information":0},"family_information":{"avg":0,"i589_fields_spouse_information":0,"i589_fields_children_information":0,"i589_fields_parents_information":0,"i589_fields_siblings_information":0},"background_information":{"avg":0,"i589_fields_address_before_usa":0,"i589_fields_address_past_5y":0,"i589_fields_education_information":0,"i589_fields_employment_information":0},"application_information":{"avg":0,"i589_fields_asylum_claim":0}}}',
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
              ],
              startedAt: 1716788746776,
              updatedAt: 1716788746776,
            },
            {
              name: "REVIEW_AND_SIGN",
              status: "IN_PROGRESS",
              substeps: [
                {
                  name: "LAWYER_REVIEW",
                  status: "COMPLETED",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
                {
                  name: "CLIENT_SIGNATURE",
                  status: "IN_PROGRESS",
                  metadata: null,
                  startedAt: 1716788746776,
                  updatedAt: 1716788746776,
                },
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
      // setCaseSummary(mockCaseSummary);
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

  return { loading, error, caseSummary };
}

export function CaseStatusRightPanel() {
  const { loading, error, caseSummary } = useFetchCaseSummary();
  const { t } = useTranslation();

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
      <CaseProgressCard caseSummary={caseSummary} />
    </div>
  );
}
