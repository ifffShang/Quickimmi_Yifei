import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCaseDetailsApi, getForm } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateForm } from "../../../reducers/caseSlice";
import { resetFormState, updateApplicationCase } from "../../../reducers/formSlice";
import { FormFlow } from "../../form/FormFlow";

export function CaseDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role); // Get user role from state

  useEffect(() => {
    if (!id || !accessToken) return;
    getForm("i589_form").then(form => {
      dispatch(updateForm(form));
      (async function () {
        try {
          const caseDetails = await getCaseDetailsApi(parseInt(id), accessToken);
          if (!caseDetails) {
            console.error(`Failed to get case details for case id ${id}`);
            return;
          }
          dispatch(updateApplicationCase(caseDetails));
        } catch (err) {
          console.error(err);
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

  return <FormFlow isLawyer={role === "lawyer"} />;
}
