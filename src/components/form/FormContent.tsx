import { Button } from "antd";
import { useEffect } from "react";
import { getFormFields } from "../../api/formTemplateAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { decrementIndexLevel2, incrementIndexLevel2, updateFormFieldsMap } from "../../reducers/caseSlice";
import { updateHighlightMissingFields, updateOnePercentage } from "../../reducers/formSlice";
import { getPercentage } from "../../utils/percentageUtils";
import { QText } from "../common/Fonts";
import { Loading } from "../common/Loading";
import CaseStatusLayout from "../pages/casestatus/CaseStatusLayout";
import "./FormContent.css";
import { FormField } from "./FormField";
import { ExcludedSectionsFromPercentage } from "../../consts/consts";
import { getProfile } from "../../utils/selectorUtils";

interface FormContentProps {
  sectionLabel: string;
  subSectionLabel: string;
  referenceId: string;
  isLawyer?: boolean;
}

export function FormContent(props: FormContentProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(state => state.case.currentStep);
  const formFieldsMap = useAppSelector(state => state.case.formFieldsMap);
  const isFirstStep = useAppSelector(state => state.case.isFirstStep);
  const isLastStep = useAppSelector(state => state.case.isLastStep);

  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const caseType = useAppSelector(state => state.case.currentCaseType);
  const profile = getProfile(caseType, applicationCase);

  const percentage = useAppSelector(state => state.form.percentage);
  const formFields = formFieldsMap && props.referenceId ? formFieldsMap[props.referenceId] : null;

  useEffect(() => {
    if (!props.referenceId) {
      console.error("Reference ID is missing.");
      return;
    }
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

  useEffect(() => {
    if (ExcludedSectionsFromPercentage.includes(props.referenceId)) return;

    if (!formFields) return;

    const { total, fulfilled } = getPercentage(formFields.fields, profile);

    let currentPercentage = 0;
    if (total === 0) {
      currentPercentage = 100;
    } else {
      currentPercentage = Math.round((fulfilled / total) * 100);
    }
    const lastPrecentage = percentage?.[props.sectionLabel]?.[props.subSectionLabel] ?? -1;
    if (currentPercentage !== lastPrecentage) {
      dispatch(
        updateOnePercentage({
          section: props.sectionLabel,
          subSection: props.subSectionLabel,
          value: currentPercentage,
        }),
      );
    }
  }, [props.referenceId, props.sectionLabel, props.subSectionLabel, profile, formFields, percentage]);

  if (!formFields || !currentStep) {
    return (
      <div className="form-content">
        <div className="form-content-form-container">
          <div className="form-content-header">
            <QText level="large">{t("Loading...")}</QText>
          </div>
          <div className="form-content-form">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  const CustomerForm = (
    <div className="form-content">
      <div className="form-content-form-container">
        <div className="form-content-header">
          <QText level="large">{wt(currentStep.label || "")}</QText>
        </div>
        <div className="form-content-form">
          {formFields.fields.map((field, index) => (
            <div key={index}>
              {!field.hideHeader && field.label && <QText level="field-label">{wt(field.label)}</QText>}
              <FormField
                fieldKey={field.key}
                fieldKeyObject={field.keyObject}
                control={field.control}
                label={field.label}
                maxChildPerRow={field.maxChildPerRow}
                subFields={field.fields}
                options={field.options}
                linkage={field.linkage}
                placeholder={field.placeholder}
                format={field.format}
                className={field.className}
                visibility={field.visibility}
                hideHeader={field.hideHeader}
                fieldIndex={field.fieldIndex}
                documentType={field.documentType}
                identity={field.identity}
                syncFields={field.syncFields}
              />
            </div>
          ))}
        </div>
        <div className="form-content-controls-container">
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
                dispatch(updateHighlightMissingFields(true));
              }}
            >
              {t("FindIncomplete")}
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
      </div>
    </div>
  );

  const LawyerForm = <CaseStatusLayout />;

  return <>{props.isLawyer ? LawyerForm : CustomerForm}</>;
}
