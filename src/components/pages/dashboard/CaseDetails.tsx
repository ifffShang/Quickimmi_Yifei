import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCaseProfileAndProgressApi, getForm } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateForm } from "../../../reducers/caseSlice";
import { resetFormState, updateCaseProfileAndProgress } from "../../../reducers/formSlice";
import { buildPercentageObject } from "../../../utils/percentageUtils";
import { CentralizedLoading } from "../../common/Loading";
import { FormContainer } from "../../form/FormContainer";
import useRenderingTrace from "../../../hooks/renderHooks";

export function CaseDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const form = useAppSelector(state => state.case.form);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || !accessToken) return;
    setIsLoading(true);

    getForm("i589_form", form).then(form => {
      dispatch(updateForm(form));
      (async function () {
        try {
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
    });
    return () => {
      dispatch(resetFormState());
    };
  }, [id, accessToken, role, form]);

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
