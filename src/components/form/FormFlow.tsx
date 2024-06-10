import { useAppSelector } from "../../app/hooks";
import { ScreenSize } from "../../model/commonModels";
import { FormContent } from "./FormContent";
import "./FormFlow.css";
import { FormNavigation } from "./FormNavigation";

interface FormFlowProps {
  isLawyer?: boolean;
}

export function FormFlow({ isLawyer }: FormFlowProps) {
  const form = useAppSelector(state => state.case.form);
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const screenSize = useAppSelector(state => state.common.screenSize);
  const isSmallScreen =
    screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;

  if (!form || indexLevel1 === -1 || indexLevel2 === -1) {
    return <div>Loading...</div>;
  }

  const id = form.steps[indexLevel1].steps[indexLevel2].referenceId;

  return (
    <div className="form-flow">
      <div className="form-flow-content">
        {!isSmallScreen && <FormNavigation />}
        <FormContent referenceId={id ?? ""} isLawyer={isLawyer} />
      </div>
    </div>
  );
}
