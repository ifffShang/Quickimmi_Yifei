import { Alert } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCaseProfileAndProgressApi } from "../../../api/caseProfileGetAPI";
import { getCaseSummaryApi } from "../../../api/caseSummaryAPI";
import { fetchCompleteFormDetails } from "../../../api/formTemplateAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import useRenderingTrace from "../../../hooks/renderHooks";
import { updateForm } from "../../../reducers/caseSlice";
import { updateCaseProfileAndProgress } from "../../../reducers/formSlice";
import { getFormPercentage } from "../../../utils/percentageUtils";
import { CentralizedLoading } from "../../common/Loading";
import { FormContainer } from "../../form/FormContainer";

export function CaseDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  const caseType = useAppSelector(state => state.case.currentCaseType);
  const caseSubType = useAppSelector(state => state.case.currentCaseSubType);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !accessToken) {
      navigate("/dashboard");
      console.error("id or accessToken is missing.");
      return;
    }
    setIsLoading(true);
    (async function () {
      try {
        if (!caseType || !caseSubType) {
          console.error("Case type or sub type is missing.");
          return;
        }
        const caseSummary = await getCaseSummaryApi(accessToken, role, parseInt(id), caseType);
        if (!caseSummary) {
          console.error(`Failed to get case summary for case id ${id}`);
          return;
        }

        const formStructure = await fetchCompleteFormDetails(caseType, caseSubType);
        dispatch(updateForm(formStructure));

        const caseDetails = await getCaseProfileAndProgressApi(parseInt(id), accessToken, role, caseType);
        if (!caseDetails) {
          console.error(`Failed to get case details for case id ${id}`);
          return;
        }
        /** We don't rely on the percentage saved in the db since it might be stale */
        const currentPercentage = getFormPercentage(formStructure.formStepsAndFormFieldsList, caseDetails.profile);
        dispatch(
          updateCaseProfileAndProgress({
            caseId: parseInt(id),
            caseType,
            profile: caseDetails.profile,
            progress: caseDetails.progress,
            percentage: currentPercentage,
          }),
        );

        setIsLoading(false);
      } catch (err: any) {
        console.error(err);
        let errMsg = "An error occurred while fetching case details. Please try again later.";
        if (err?.message?.includes("403") || err?.status === 403) {
          errMsg = "Forbidden: You do not have permission to access this resource.";
        }
        setError(errMsg);
        setIsLoading(false);
      }
    })();
  }, [id, accessToken, role]);

  useRenderingTrace("CaseDetails", {
    id,
    accessToken,
    role,
    isLoading,
  });

  if (!id) {
    navigate("/dashboard");
    return null;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return <>{isLoading ? <CentralizedLoading /> : <FormContainer />}</>;
}
