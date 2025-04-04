import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDidUpdateEffect, useFormTranslation } from "../../../hooks/commonHooks";
import { ControlType, IFormField, IFormOptions } from "../../../model/formFlowModels";
import {
  createKeyValuesForRemoveItem,
  dispatchFormValue,
  getCaseDetailValue,
  getFieldValue,
  isSectionVisible,
} from "../../../utils/utils";
import { QText } from "../../common/Fonts";
import { FormField } from "../FormField";
import { SectionHeader } from "../parts/SectionHeader";
import { DocumentType, KeyValues } from "../../../model/commonModels";
import { DefaultAsylumCaseProfile } from "../../../consts/caseProfile";
import { ArrayFields } from "../../../reducers/formSlice";
import { getKeys } from "../../../utils/visibilityUtils";
import { useRef } from "react";
import { getProfile } from "../../../utils/selectorUtils";
import { CaseType } from "../../../model/immigrationTypes";
import { InitialFamilyBasedProfile } from "../../../consts/familyBasedConsts";

export interface SectionProps {
  fieldKey: string;
  control: ControlType;
  label: string;
  maxChildPerRow?: number;
  subFields?: IFormField[];
  options?: IFormOptions[] | string;
  placeholder?: string;
  format?: string;
  className?: string;
  visibility?: string;
  hideHeader?: boolean;
  fieldIndex?: number;
  documentType?: DocumentType;
}

export function Section(props: SectionProps) {
  const dispatch = useAppDispatch();
  const { wt } = useFormTranslation();
  const caseType = useAppSelector(state => state.case.currentCaseType);
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const profile = getProfile(caseType, applicationCase);

  const isVisible = !!props.visibility && isSectionVisible(props.visibility, profile, props.fieldIndex);

  // To track the visibility of each section, key is visibility key and value is boolean
  // We need this because isVisible is too generic and can't be used to track each section
  const visibilityList = useRef<KeyValues>({ [props.visibility ?? "default"]: isVisible });

  const fieldValue = getFieldValue(
    profile,
    props.fieldKey,
    props.control,
    props.options,
    props.format,
    props.fieldIndex,
  );

  useDidUpdateEffect(() => {
    if (props.control !== "removable_section" && props.control !== "section") return;
    if (!props.subFields || props.subFields.length === 0 || !props.visibility) return;

    // If the visibility of the section is not changed, do nothing
    if (visibilityList.current[props.visibility] === isVisible) return;

    visibilityList.current[props.visibility] = isVisible;

    const { textKeys, booleanKeys, selectKeys, documentKeys, documentListKeys } = getKeys(
      props.subFields,
      props.control,
    );

    if (!isVisible) {
      // When text related component is hidden, assign the value to "N/A"
      textKeys &&
        textKeys.length > 0 &&
        dispatchFormValue(
          dispatch,
          caseType,
          textKeys.reduce((obj, key) => ({ ...obj, [key]: "N/A" }), {}),
          props.fieldIndex,
        );

      booleanKeys &&
        booleanKeys.length > 0 &&
        dispatchFormValue(
          dispatch,
          caseType,
          booleanKeys.reduce((obj, key) => ({ ...obj, [key]: "false" }), {}),
          props.fieldIndex,
        );

      selectKeys &&
        selectKeys.length > 0 &&
        dispatchFormValue(
          dispatch,
          caseType,
          selectKeys.reduce((obj, key) => ({ ...obj, [key]: "N/A" }), {}),
          props.fieldIndex,
        );

      documentKeys &&
        documentKeys.length > 0 &&
        dispatchFormValue(
          dispatch,
          caseType,
          documentKeys.reduce((obj, key) => ({ ...obj, [key]: -1 }), {}),
          props.fieldIndex,
        );

      documentListKeys &&
        documentListKeys.length > 0 &&
        dispatchFormValue(
          dispatch,
          caseType,
          documentListKeys.reduce((obj, key) => ({ ...obj, [key]: [] }), {}),
          props.fieldIndex,
        );

      // For array fields like family.children, assign the value to [] when not visible
      const arrFields = props.subFields.filter(field => field?.key?.indexOf("-") > -1);
      for (let i = 0; i < arrFields.length; i++) {
        const key = arrFields[i].key.split("-")[1];
        const overwriteKey = ArrayFields.filter(field => field.field === key)[0].overwriteField;
        dispatchFormValue(
          dispatch,
          caseType,
          {
            [key]: [],
            [overwriteKey]: true,
          },
          props.fieldIndex,
        );
      }
    } else {
      console.log("======== Field is visible, resetting to default value", textKeys);
      // When text related component is shown, assign the value to ""
      textKeys &&
        textKeys.length > 0 &&
        dispatchFormValue(
          dispatch,
          caseType,
          textKeys.reduce(
            (obj, key) => ({
              ...obj,
              [key]: getCaseDetailValue(
                caseType === CaseType.Asylum ? DefaultAsylumCaseProfile : InitialFamilyBasedProfile,
                key,
                0,
              ),
            }),
            {},
          ),
          props.fieldIndex,
        );

      selectKeys &&
        selectKeys.length > 0 &&
        dispatchFormValue(
          dispatch,
          caseType,
          selectKeys.reduce((obj, key) => ({ ...obj, [key]: null }), {}),
          props.fieldIndex,
        );
    }
  }, [isVisible]);

  if (props.subFields && props.subFields.length > 0) {
    if (props.visibility) {
      const isVisible = isSectionVisible(props.visibility, profile, props.fieldIndex);
      if (!isVisible) {
        return <></>;
      }
    }
    if (fieldValue && Array.isArray(fieldValue.arr)) {
      return (
        <>
          {fieldValue.arr.map((_i, arrIndex) => (
            <div key={arrIndex} className="section-container">
              {props.control === "removable_section" && (
                <SectionHeader
                  label={wt(props.label)}
                  fieldIndex={arrIndex}
                  onRemove={() => {
                    const keyValues = createKeyValuesForRemoveItem(fieldValue, arrIndex);
                    dispatchFormValue(dispatch, caseType, keyValues, arrIndex);
                  }}
                />
              )}
              {props?.subFields?.map((field, index) => (
                <div key={index}>
                  {field.label && field.hideHeader !== true && <QText level="normal bold">{wt(field.label)}</QText>}
                  <FormField
                    fieldKey={field.key}
                    control={field.control}
                    label={field.label}
                    options={field.options}
                    placeholder={field.placeholder}
                    className={field.className}
                    maxChildPerRow={field.maxChildPerRow}
                    subFields={field.fields}
                    format={field.format}
                    visibility={field.visibility}
                    fieldIndex={arrIndex}
                    documentType={field.documentType}
                    identity={field.identity}
                  />
                </div>
              ))}
            </div>
          ))}
        </>
      );
    }
    return (
      <div className="section-container">
        {props.subFields.map((field, index) => (
          <div key={index}>
            {field.label && field.hideHeader !== true && <QText level="normal bold">{wt(field.label)}</QText>}
            <FormField
              fieldKey={field.key}
              control={field.control}
              label={field.label}
              options={field.options}
              linkage={field.linkage}
              placeholder={field.placeholder}
              className={field.className}
              maxChildPerRow={field.maxChildPerRow}
              subFields={field.fields}
              format={field.format}
              visibility={field.visibility}
              fieldIndex={props.fieldIndex}
              documentType={field.documentType}
              identity={field.identity}
            />
          </div>
        ))}
      </div>
    );
  } else return <div>Section needs sub fields</div>;
}
