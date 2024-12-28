import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { CaseProfile } from "../../../model/commonApiModels";
import { IFormOptions, ISyncFields } from "../../../model/formFlowModels";
import { CaseType } from "../../../model/immigrationTypes";
import { dispatchFormValue, getFieldValueByKey } from "../../../utils/utils";
import { RadioSelect } from "./Controls";
import { QText } from "../../common/Fonts";

export interface SameAddressCheckboxProps {
  label: string;
  onOptionChange: (value: string) => void;
  fieldValue: boolean;
  caseDetails: CaseProfile | null;
  caseType: CaseType | null;
  fieldIndex?: number;
  options?: IFormOptions[] | string;
  syncFields?: ISyncFields;
}

export function SameAddressCheckboxV2(props: SameAddressCheckboxProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.syncFields && props.caseDetails && props.caseType) {
      const [key, value] = props.syncFields.condition.split("=");
      const fieldValue = getFieldValueByKey(props.caseDetails, key, props.options);
      const mappings = props.syncFields.mappings;
      if (fieldValue === value) {
        const keyValueUpdates = mappings.reduce((acc, mapping) => {
          acc[mapping.destination] = getFieldValueByKey(
            props.caseDetails,
            mapping.source,
            props.options,
            "",
            props.fieldIndex
          );
          return acc;
        }, {});

        const disabledList = mappings.reduce((acc, mapping) => {
          acc[mapping.destination] = "false";
          return acc;
        }, {});

        dispatchFormValue(
          dispatch,
          props.caseType,
          {
            ...keyValueUpdates,
            disabledFields: {
              ...disabledList,
            },
          },
          props.fieldIndex,
        );
      } else {
        const keyValueUpdates = mappings.reduce((acc, mapping) => {
          if (mapping.destination.indexOf("Checkbox") > -1) {
            acc[mapping.destination] = "false";
          } else {
            acc[mapping.destination] = "";
          }
          return acc;
        }, {});

        dispatchFormValue(
          dispatch,
          props.caseType,
          {
            ...keyValueUpdates,
            disabledFields: {},
          },
          props.fieldIndex,
        );
      }
    }
  }, [props.fieldValue, props.fieldIndex]);

  return (
    <>
      <QText level="normal bold">{props.label}</QText>
      <RadioSelect onChange={props.onOptionChange} value={props.fieldValue} options={props.options || ""} />
    </>
  );
}
