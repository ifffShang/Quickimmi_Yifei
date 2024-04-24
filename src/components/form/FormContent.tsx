import { Button } from "antd";
import { useEffect } from "react";
import { getFormFields, updateApplicationCaseApi } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { updateFormFieldsMap } from "../../reducers/caseSlice";
import { QText } from "../common/Fonts";
import "./FormContent.css";
import { FormField } from "./FormField";
import { resetFormState } from "../../reducers/formSlice";
import { getUpdateApplicationCaseData } from "../../utils/utils";

interface FormContentProps {
  referenceId: string;
}

export function FormContent(props: FormContentProps) {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const currentStep = useAppSelector(state => state.case.currentStep);
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

  if (!formFields || !currentStep) {
    return <div>Loading...</div>;
  }

  const saveApplicationCase = () => {
    updateApplicationCaseApi(
      getUpdateApplicationCaseData(applicationCase),
      "accessToken",
    );
  };

  return (
    <div className="form-content">
      <div className="form-content-header">
        <QText level="large">{wt(currentStep.label || "")}</QText>
      </div>
      <div className="form-content-form">
        {formFields.fields.map((field, index) => (
          <div key={index}>
            <QText level="normal bold">{wt(field.label)}</QText>
            <FormField
              parentFieldKey={formFields.key}
              fieldKey={field.key}
              control={field.control}
              label={field.label}
              maxChildPerRow={field.maxChildPerRow}
              subFields={field.fields}
            />
          </div>
        ))}
      </div>
      <div className="form-content-controls">
        <Button type="primary">{wt("Previous")}</Button>
        <Button className="default-button" onClick={saveApplicationCase}>
          {wt("Save")}
        </Button>
        <Button type="primary">{wt("Next")}</Button>
      </div>
    </div>
  );
}
