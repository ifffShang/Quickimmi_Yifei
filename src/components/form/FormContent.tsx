import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { getFormFields } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { ControlType } from "../../model/formFlowModels";
import { updateFormFieldsMap } from "../../reducers/caseSlice";
import {
  incrementSaveTimes,
  updateOnePercentage,
} from "../../reducers/formSlice";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";
import {
  getKeyCount,
  includeForLastField,
  includeForPercentageCalc,
} from "../../utils/percentageUtils";
import { QText } from "../common/Fonts";
import { Loading } from "../common/Loading";
import CaseStatusLayout from "../pages/casestatus/CaseStatusLayout";
import "./FormContent.css";
import { FormField } from "./FormField";

interface FormContentProps {
  sectionId: string;
  referenceId: string;
  isLawyer?: boolean;
}

export function FormContent(props: FormContentProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const currentStep = useAppSelector(state => state.case.currentStep);
  const formFieldsMap = useAppSelector(state => state.case.formFieldsMap);

  const caseId = useAppSelector(state => state.form.caseId);
  const profile = useAppSelector(state => state.form.applicationCase.profile);
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);

  const [percentageOfSection, setPercentageOfSection] = useState(0);

  const formFields =
    formFieldsMap && props.referenceId
      ? formFieldsMap[props.referenceId]
      : null;

  const keySet = useRef({});
  const totalFields = useRef(0);
  const fulfilledCount = useRef(0);

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
        if (!formFieldsRes.fields) return;
        const totalKeys = getKeyCount(formFieldsRes.fields);
        console.log("Total keys: ", totalKeys);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.referenceId]);

  useEffect(() => {
    if (props.referenceId === "i589_fields_view_reports") return;
    dispatch(
      updateOnePercentage({
        sectionId: props.sectionId,
        referenceId: props.referenceId,
        value: percentageOfSection,
      }),
    );
  }, [percentageOfSection]);

  const countFulfilledFields = (
    control: ControlType,
    fieldKey: string,
    fieldValue: any,
    lastField: boolean,
    fieldIndex?: number,
  ) => {
    if (lastField && totalFields.current == 0)
      return "Second render of last field";

    const fieldKeyWithIndex =
      fieldIndex !== undefined ? `${fieldKey}_${fieldIndex}` : fieldKey;
    if (
      fieldKeyWithIndex &&
      includeForPercentageCalc(control) &&
      !keySet.current[fieldKeyWithIndex]
    ) {
      totalFields.current++;
      if (fieldValue) fulfilledCount.current++;
      keySet.current[fieldKeyWithIndex] = true;
    }

    if (includeForLastField(control) && lastField && totalFields.current > 0) {
      const percentageOfFulfilledFields = Math.round(
        (fulfilledCount.current / totalFields.current) * 100,
      );
      const currentPercentage = percentage[props.sectionId][props.referenceId];

      if (currentPercentage !== percentageOfFulfilledFields) {
        setTimeout(() => {
          setPercentageOfSection(percentageOfFulfilledFields);
          console.log("* Total fields: ", totalFields.current);
          console.log("* Fulfilled fields: ", fulfilledCount.current);
        }, 100);
      }
      totalFields.current = 0;
      fulfilledCount.current = 0;
      keySet.current = {};
    }

    return totalFields.current + "_" + fulfilledCount.current;
  };

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
              countFulfilledFields={countFulfilledFields}
              lastField={index === formFields.fields.length - 1}
            />
          </div>
        ))}
      </div>
      <div className="form-content-controls">
        <Button type="primary">{t("Previous")}</Button>
        <Button
          className="default-button"
          onClick={() => {
            try {
              updateApplicationCaseFunc(
                caseId,
                profile,
                progress,
                percentage,
                role,
                accessToken,
              );
              dispatch(incrementSaveTimes());
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {t("Save")}
        </Button>
        <Button type="primary">{t("Next")}</Button>
      </div>
    </div>
  );

  const LawyerForm = <CaseStatusLayout />;

  return <>{props.isLawyer ? LawyerForm : CustomerForm}</>;
}
