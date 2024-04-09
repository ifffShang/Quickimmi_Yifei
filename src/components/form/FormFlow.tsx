import { useEffect } from "react";
import { getForm } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateForm } from "../../reducers/caseSlice";
import { QText } from "../common/Fonts";
import { EditForm } from "../icons/Form";
import { FormContent } from "./FormContent";
import "./FormFlow.css";
import { FormNavigation } from "./FormNavigation";

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
      <div className="form-flow-top">
        <QText level="xlarge">Complete the form</QText>
        <div className="form-flow-icon">
          <EditForm />
        </div>
      </div>
      <div className="form-flow-content">
        <FormNavigation steps={form.steps} />
        <FormContent referenceId={id ?? ""} />
      </div>
    </div>
  );
}
