import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateForm } from "../../reducers/caseSlice";
import { FormContent } from "./FormContent";
import { FormNavigation } from "./FormNavigation";
import "./FormFlow.css";
import { getForm } from "../../api/caseAPI";

export function FormFlow() {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.case.form);
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);

  useEffect(() => {
    getForm("i589_form").then(form => {
      dispatch(updateForm(form));
    });
  }, []);

  if (!form || indexLevel1 === -1 || indexLevel2 === -1) {
    return <div>Loading...</div>;
  }

  const id = form.steps[indexLevel1].steps[indexLevel2].referenceId;

  return (
    <div className="form-flow">
      <div className="form-flow-top">Complete the form</div>
      <div className="form-flow-content">
        <FormNavigation steps={form.steps} />
        <FormContent referenceId={id ?? ""} />
      </div>
    </div>
  );
}
