import { useAppSelector } from "../../app/hooks";
import { ControlType } from "../../model/formFlowModels";
import "./FormControlContainer.css";

export interface FormControlContainerProps {
  fieldValue: any;
  children: React.ReactNode;
}

export function FormControlContainer(props: FormControlContainerProps) {
  const highlightMissingFields = useAppSelector(state => state.form.highlightMissingFields);
  let emptyFieldValue = !props.fieldValue;
  if (Array.isArray(props.fieldValue) && props.fieldValue.length !== 0) {
    props.fieldValue.forEach((value: any) => {
      for (const key in value) {
        if (!value[key]) {
          emptyFieldValue = true;
          break;
        }
      }
    });
  }

  const css = highlightMissingFields && emptyFieldValue ? "form-control-container-missing" : "form-control-container";
  return <div className={css}>{props.children}</div>;
}
