import { useAppSelector } from "../../app/hooks";
import "./FormControlContainer.css";

export interface FormControlContainerProps {
  fieldValue: any;
  children: React.ReactNode;
}

export function FormControlContainer(props: FormControlContainerProps) {
  const highlightMissingFields = useAppSelector(state => state.form.highlightMissingFields);
  const css = highlightMissingFields && !props.fieldValue ? "form-control-container-missing" : "form-control-container";
  return <div className={css}>{props.children}</div>;
}
