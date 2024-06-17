import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCaseDetailsApi, getForm } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateForm } from "../../../reducers/caseSlice";
import {
  resetFormState,
  updateApplicationCase,
  updatePercentage,
} from "../../../reducers/formSlice";
import { FormFlow } from "../../form/FormFlow";
import { CentralizedLoading } from "../../common/Loading";
import {
  buildFormPercentageObject,
  extractPercentageFromMetadata,
} from "../../../utils/percentageUtils";

export function CaseDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role); // Get user role from state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || !accessToken) return;
    setIsLoading(true);
    getForm("i589_form").then(form => {
      dispatch(updateForm(form));
      (async function () {
        try {
          const caseDetails = await getCaseDetailsApi(
            parseInt(id),
            accessToken,
          );
          if (!caseDetails) {
            console.error(`Failed to get case details for case id ${id}`);
            return;
          }

          const currentPercentage = extractPercentageFromMetadata(
            caseDetails.progress,
          );
          if (!currentPercentage) {
            const defaultPercentage = buildFormPercentageObject(form);
            dispatch(updatePercentage(defaultPercentage));
          } else {
            dispatch(updatePercentage(currentPercentage));
          }

          dispatch(updateApplicationCase(caseDetails));

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
  }, []);

  if (!id) {
    navigate("/dashboard");
    return null;
  }

  return (
    <>
      {isLoading ? (
        <CentralizedLoading />
      ) : (
        <FormFlow isLawyer={role === "lawyer"} />
      )}
    </>
  );
}
