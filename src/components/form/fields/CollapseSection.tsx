import { Collapse } from "antd";
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

export interface CollapseSectionProps {
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

export function CollapseSection(props: CollapseSectionProps) {
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

  if (props.subFields && props.subFields.length > 0) {
    if (props.visibility) {
      const isVisible = isSectionVisible(props.visibility, profile, props.fieldIndex);
      if (!isVisible) {
        return <></>;
      }
    }

    const collapseItems:any = []

    props.subFields.map((field, index) => (
      collapseItems.push({
        key: `${index + 1}`,
        label: wt(field.label),
        children: <FormField
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
      })
    ))

    return (
      <Collapse defaultActiveKey={['1']} items={collapseItems}></Collapse>
    );
  } else return <div>Section needs sub fields</div>;
}
