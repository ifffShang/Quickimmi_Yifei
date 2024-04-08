import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { updateFormFieldsMap } from "../../reducers/caseSlice";
import "./FormContent.css";
import { getFormFields } from "../../api/caseAPI";
import { FormField } from "./FormField";

interface FormContentProps {
  referenceId: string;
}

export function FormContent(props: FormContentProps) {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const formFieldsMap = useAppSelector(state => state.case.formFieldsMap);
  const formFields =
    formFieldsMap && props.referenceId
      ? formFieldsMap[props.referenceId]
      : null;

  useEffect(() => {
    if (!props.referenceId) return;
    getFormFields(props.referenceId)
      .then(formFieldsRes => {
        dispatch(
          updateFormFieldsMap({
            referenceId: props.referenceId,
            formFields: formFieldsRes,
          }),
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.referenceId]);

  if (!formFields) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-content">
      {formFields.fields.map((field, index) => (
        <div key={index}>
          <label>{wt(field.label)}</label>
          <FormField
            control={field.control}
            label={field.label}
            direction={field.direction}
            subFields={field.fields}
          />
        </div>
      ))}
      <div>
        <button>{wt("Previous")}</button>
        <button>{wt("Next")}</button>
      </div>
    </div>
  );
}
