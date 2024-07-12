import { Button } from "antd";
import { useEffect } from "react";
import { getFormFields } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import useRenderingTrace from "../../hooks/renderHooks";
import { decrementIndexLevel2, incrementIndexLevel2, resetForm, updateFormFieldsMap } from "../../reducers/caseSlice";
import { incrementSaveTimes, updateOnePercentage } from "../../reducers/formSlice";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";
import { getPercentage } from "../../utils/percentageUtils";
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

  const isFirstStep = useAppSelector(state => state.case.isFirstStep);
  const isLastStep = useAppSelector(state => state.case.isLastStep);

  const caseId = useAppSelector(state => state.form.caseId);
  const profile = useAppSelector(state => state.form.applicationCase.profile);
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);

  const formFields = formFieldsMap && props.referenceId ? formFieldsMap[props.referenceId] : null;

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

    () => {
      dispatch(resetForm());
    };
  }, [props.referenceId]);

  useEffect(() => {
    if (props.referenceId === "i589_fields_view_reports") return;
    if (!formFields) return;

    const { total, fulfilled } = getPercentage(formFields.fields, profile);

    let currentPercentage = 0;
    if (total === 0) {
      currentPercentage = 100;
    } else {
      currentPercentage = Math.round((fulfilled / total) * 100);
    }
    const lastPrecentage = percentage?.[props.sectionId]?.[props.referenceId] ?? -1;
    console;
    if (currentPercentage !== lastPrecentage) {
      dispatch(
        updateOnePercentage({
          sectionId: props.sectionId,
          referenceId: props.referenceId,
          value: currentPercentage,
        }),
      );
    }
  }, [props.referenceId, props.sectionId, profile, formFields, percentage]);

  useRenderingTrace("FormContent", {
    ...props,
    profile,
    progress,
    percentage,
    formFieldsMap,
    accessToken,
    role,
    currentStep,
    isFirstStep,
    isLastStep,
    caseId,
  });

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
            {!field.hideHeader && field.label && <QText level="field-label">{wt(field.label)}</QText>}
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
              lastField={index === formFields.fields.length - 1}
            />
          </div>
        ))}
      </div>
      <div className="form-content-controls">
        <Button
          disabled={isFirstStep}
          type="primary"
          onClick={() => {
            dispatch(decrementIndexLevel2());
          }}
        >
          {t("Previous")}
        </Button>
        <Button
          className="default-button"
          onClick={() => {
            try {
              updateApplicationCaseFunc(caseId, profile, progress, percentage, role, accessToken);
              dispatch(incrementSaveTimes());
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {t("Save")}
        </Button>
        <Button
          disabled={isLastStep}
          type="primary"
          onClick={() => {
            dispatch(incrementIndexLevel2());
          }}
        >
          {t("Next")}
        </Button>
      </div>
    </div>
  );

  const LawyerForm = <CaseStatusLayout />;

  return <>{props.isLawyer ? LawyerForm : CustomerForm}</>;
}
