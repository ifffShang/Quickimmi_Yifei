import { useAppSelector } from "../../app/hooks";
import "./FormControlContainer.css";

export interface FormControlContainerProps {
  fieldValue: any;
  children: React.ReactNode;
  fieldKey?: string;
}

export function FormControlContainer(props: FormControlContainerProps) {
  const highlightMissingFields = useAppSelector(state => state.form.highlightMissingFields);
  console.log("props:::111111111::", props);
  let emptyFieldValue = !props.fieldValue;

  if (Array.isArray(props.fieldValue)) {
    if (props.fieldValue.length === 0) {
      // TODO: Find a better way to handle the required array fields
      if (props.fieldKey && props.fieldKey.indexOf("passportStampPageDocumentIds") > -1) {
        emptyFieldValue = true;
      }
    } else {
      props.fieldValue.forEach((value: any) => {
        for (const key in value) {
          if (!value[key]) {
            emptyFieldValue = true;
            break;
          }
        }
      });
    }
  }

  const css = highlightMissingFields && emptyFieldValue ? "form-control-container-missing" : "form-control-container";
  return <div className={css}>{props.children}</div>;
}
