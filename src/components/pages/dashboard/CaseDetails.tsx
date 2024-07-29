import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCaseProfileAndProgressApi, getCaseSummaryApi, getForm } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import useRenderingTrace from "../../../hooks/renderHooks";
import { updateForm } from "../../../reducers/caseSlice";
import { updateAsylumType, updateCaseProfileAndProgress } from "../../../reducers/formSlice";
import { buildPercentageObject } from "../../../utils/percentageUtils";
import { CentralizedLoading } from "../../common/Loading";
import { FormContainer } from "../../form/FormContainer";

export function CaseDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const asylumType = useAppSelector(state => state.form.asylumType);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || !accessToken) return;
    setIsLoading(true);
    (async function () {
      try {
        const caseSummary = await getCaseSummaryApi(parseInt(id), accessToken, role);
        if (caseSummary.asylumType) {
          dispatch(updateAsylumType(caseSummary.asylumType as "AFFIRMATIVE" | "DEFENSIVE"));
        } else {
          console.error("Asylum type is empty.");
        }
        let formName = "i589_form_affirmative_asylum";
        if (asylumType === "DEFENSIVE") {
          formName = "i589_form_defensive_asylum";
        }
        const form = await getForm(formName);
        dispatch(updateForm(form));
        const caseDetails = await getCaseProfileAndProgressApi(parseInt(id), accessToken, role);
        if (!caseDetails) {
          console.error(`Failed to get case details for case id ${id}`);
          return;
        }
        const currentPercentage = buildPercentageObject(form, caseDetails.progress);
        dispatch(
          updateCaseProfileAndProgress({
            caseId: parseInt(id),
            profile: caseDetails.profile,
            progress: caseDetails.progress,
            percentage: currentPercentage,
          }),
        );

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    })();
  }, [id, accessToken, role, asylumType]);

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

  return <>{isLoading ? <CentralizedLoading /> : <FormContainer />}</>;
}
