import { useEffect } from "react";
import { getForm } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ScreenSize } from "../../model/Models";
import { updateForm } from "../../reducers/caseSlice";
import { FormContent } from "./FormContent";
import "./FormFlow.css";
import { FormNavigation } from "./FormNavigation";

export function FormFlow() {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.case.form);
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const screenSize = useAppSelector(state => state.common.screenSize);
  const isSmallScreen =
    screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;

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
      <div className="form-flow-content">
        {!isSmallScreen && <FormNavigation />}
        <FormContent referenceId={id ?? ""} />
      </div>
    </div>
  );
}
