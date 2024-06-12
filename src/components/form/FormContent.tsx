import { Button, Checkbox, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { getFormFields } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { updateFormFieldsMap } from "../../reducers/caseSlice";
import { QText } from "../common/Fonts";
import { Loading } from "../common/Loading";
import "./FormContent.css";
import { FormField } from "./FormField";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";

const { Option } = Select;

interface FormContentProps {
  referenceId: string;
  isLawyer?: boolean; // Add a prop to indicate if the content is for a lawyer
}

export function FormContent(props: FormContentProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
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
  }, [props.referenceId, dispatch]);

  if (!formFields || !currentStep) {
    return (
      <div className="form-content">
        <div className="form-content-header">
          <QText level="large">{t("Loading...")}</QText>
        </div>
        <div className="form-content-form">
          <Loading />
        </div>
      </div>
    );
  }

  const CustomerForm = (
    <div className="form-content">
      <div className="form-content-header">
        <QText level="large">{wt(currentStep.label || "")}</QText>
      </div>
      <div className="form-content-form">
        {formFields.fields.map((field, index) => (
          <div key={index}>
            {!field.hideHeader && field.label && (
              <QText level="field-label">{wt(field.label)}</QText>
            )}
            <FormField
              fieldKey={field.key}
              control={field.control}
              label={field.label}
              maxChildPerRow={field.maxChildPerRow}
              subFields={field.fields}
              options={field.options}
              placeholder={field.placeholder}
              format={field.format}
              className={field.className}
              visibility={field.visibility}
              hideHeader={field.hideHeader}
              fieldIndex={field.fieldIndex}
            />
          </div>
        ))}
      </div>
      <div className="form-content-controls">
        <Button type="primary">{t("Previous")}</Button>
        <Button
          className="default-button"
          onClick={() =>
            updateApplicationCaseFunc(applicationCase, accessToken)
          }
        >
          {t("Save")}
        </Button>
        <Button type="primary">{t("Next")}</Button>
      </div>
    </div>
  );

  const LawyerForm = (
    <div></div>
  );

  return (
    <>
      {props.isLawyer ? LawyerForm : CustomerForm}
    </>
  );
}
