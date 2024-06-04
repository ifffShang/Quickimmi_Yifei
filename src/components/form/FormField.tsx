import { Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Regex } from "../../consts/consts";
import { useFormTranslation } from "../../hooks/commonHooks";
import { EntryRecord } from "../../model/apiModels";
import { KeyValues } from "../../model/commonModels";
import {
  ControlType,
  IFormField,
  IFormOptions,
} from "../../model/formFlowModels";
import {
  createKeyValuesForAddItem,
  createKeyValuesForRemoveItem,
  dispatchFormValue,
  formatCityAndCountryStr,
  getCaseDetailValue,
  getFieldValue,
} from "../../utils/utils";
import { QText } from "../common/Fonts";
import "./FormField.css";
import { AddItemControl } from "./fields/AddItemControl";
import {
  CheckBox,
  QDatePicker,
  QTextArea,
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./fields/Controls";
import { DocumentList } from "./fields/DocumentList";
import { EntryRecords } from "./fields/EntryRecords";
import { GenerateDocument } from "./fields/GenerateDocument";
import { LocationDropdown } from "./fields/LocationDropdown";
import { PassportUploader } from "./fields/PassportUploader";
import { SameAddressCheckbox } from "./fields/SameAddressCheckbox";
import { TextboxWithNA } from "./fields/TextboxWithNA";
import { RemovableSectionHeader } from "./parts/RemovableSectionHeader";

export interface FormFieldProps {
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
}

export function FormField(props: FormFieldProps) {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const caseDetails = useAppSelector(
    state => state.form.applicationCase?.profile,
  );

  const placeholder = props.placeholder ? wt(props.placeholder) : "";

  const fieldValue = getFieldValue(
    caseDetails,
    props.fieldKey,
    props.control,
    props.options,
    props.format,
    props.fieldIndex,
  );

  console.log(
    `Field key ${props.fieldKey}, value: ${JSON.stringify(fieldValue)}, control: ${props.control}`,
  );

  const onOptionChange = (value: string) => {
    if (props.options && Array.isArray(props.options)) {
      const option = props.options.find(option => option.value === value);
      if (option && option.keyValue) {
        if (
          option.keyValue?.indexOf(",") > -1 &&
          props.fieldKey?.indexOf(",") > -1
        ) {
          const keys = props.fieldKey.split(",");
          const values = option.keyValue.split(",");
          const keyValues = {} as KeyValues;
          keys.forEach((key, index) => {
            keyValues[key] = values[index];
          });
          dispatchFormValue(dispatch, keyValues, props.fieldIndex);
        } else {
          dispatchFormValue(
            dispatch,
            {
              [props.fieldKey]: option.keyValue,
            },
            props.fieldIndex,
          );
        }
      } else {
        dispatchFormValue(
          dispatch,
          {
            [props.fieldKey]: value,
          },
          props.fieldIndex,
        );
      }
    } else {
      dispatchFormValue(
        dispatch,
        {
          [props.fieldKey]: value,
        },
        props.fieldIndex,
      );
    }
  };

  const onTextChange = (value: string): string => {
    if (props.fieldKey && props.fieldKey.indexOf(",") > -1 && props.format) {
      const formatRegex = Regex[props.format]["FormatRegex"];
      const formatOutput = Regex[props.format]["FormatOutput"];
      const filterRegex = Regex[props.format]["FilterRegex"];
      const maxLen = Regex[props.format]["MaxLength"];
      let digits = value.replace(filterRegex, "");
      if (digits.length > maxLen) {
        digits = digits.substring(0, maxLen);
      }
      const returnValue = digits.replace(formatRegex, formatOutput);

      const extractRegex = Regex[props.format]["ExtractRegex"];
      const keys = props.fieldKey.split(",");
      const matches = returnValue.match(extractRegex);
      if (matches) {
        const group1 = matches[1];
        const group2 = matches[2];
        dispatchFormValue(
          dispatch,
          {
            [keys[0]]: group1,
            [keys[1]]: group2,
          },
          props.fieldIndex,
        );
      }
      return returnValue;
    } else {
      props.fieldKey &&
        dispatchFormValue(
          dispatch,
          {
            [props.fieldKey]: value,
          },
          props.fieldIndex,
        );
      return value;
    }
  };

  const onCheckboxChange = (value: boolean) => {
    if (!props.fieldKey) return;

    if (props.fieldKey.indexOf(",") > -1) {
      const keys = props.fieldKey.split(",");
      dispatchFormValue(
        dispatch,
        {
          [keys[0]]: value,
          [keys[1]]: !value,
        },
        props.fieldIndex,
      );
      return;
    }
    dispatchFormValue(
      dispatch,
      {
        [props.fieldKey]: value,
      },
      props.fieldIndex,
    );
  };

  const onLocationChange = (...params: any[]) => {
    const locationStr = formatCityAndCountryStr(...params);
    dispatchFormValue(
      dispatch,
      {
        [props.fieldKey]: locationStr,
      },
      props.fieldIndex,
    );
  };

  const onAddItemClick = () => {
    const keyValues = createKeyValuesForAddItem(fieldValue);
    dispatchFormValue(dispatch, keyValues, props.fieldIndex);
  };

  switch (props.control) {
    case "text":
      return (
        <QTextBox
          placeholder={placeholder}
          value={fieldValue}
          fieldKey={props.fieldKey}
          onChange={onTextChange}
        />
      );
    case "textarea":
      return (
        <QTextArea
          placeholder={placeholder}
          value={fieldValue}
          fieldKey={props.fieldKey}
          onChange={onTextChange}
        />
      );
    case "radio":
      return (
        <RadioSelect
          onChange={onOptionChange}
          options={props.options || ""}
          value={fieldValue}
        />
      );
    case "checkbox":
      return (
        <CheckBox
          label={wt(props.label)}
          onChange={onCheckboxChange}
          checked={fieldValue === "true"}
        />
      );
    case "fileplus":
      return <div>Fileplus not implemented</div>;
    case "file":
      return <div>File not implemented</div>;
    case "select":
      return (
        <SelectBox
          placeholder={placeholder}
          onChange={onOptionChange}
          options={props.options || ""}
          value={fieldValue}
        />
      );
    case "divider":
      return <Divider />;
    case "tips":
      return <div>Tips not implemented</div>;
    case "datepicker":
      return (
        <QDatePicker
          placeholder={placeholder}
          value={fieldValue}
          fieldKey={props.fieldKey}
          onChange={(value: string) => {
            props.fieldKey &&
              dispatchFormValue(
                dispatch,
                {
                  [props.fieldKey]: value,
                },
                props.fieldIndex,
              );
          }}
        />
      );
    case "component_passport_uploader": {
      return (
        <PassportUploader
          documentId={fieldValue}
          fieldKey={props.fieldKey}
          fieldIndex={props.fieldIndex}
          onChange={(value: any) => {
            props.fieldKey &&
              dispatchFormValue(
                dispatch,
                {
                  [props.fieldKey]: value,
                },
                props.fieldIndex,
              );
          }}
        />
      );
    }
    case "component_textbox_na":
      return (
        <TextboxWithNA
          placeholder={placeholder}
          value={fieldValue}
          onChange={onTextChange}
        />
      );
    case "component_location_dropdown":
      return (
        <LocationDropdown
          prefillStr={fieldValue}
          onLocationChange={onLocationChange}
        />
      );
    case "component_generate_report":
      return <GenerateDocument />;
    case "component_list_reports":
      return <DocumentList />;
    case "component_mailing_same_as_residential":
      return <SameAddressCheckbox label={wt(props.label)} />;
    case "component_entry_records":
      return (
        <EntryRecords
          value={fieldValue}
          label={wt(props.label)}
          placeholder={placeholder}
          onChange={(value: EntryRecord[]) => {
            dispatchFormValue(
              dispatch,
              {
                [props.fieldKey]: value,
              },
              props.fieldIndex,
            );
          }}
        />
      );
    case "component_add_item":
      return (
        <AddItemControl
          className={props.className}
          placeholder={placeholder}
          onClick={() => onAddItemClick()}
        />
      );
    case "group":
      if (props.subFields && props.subFields.length > 0) {
        const subFieldsCss = "horizontal-" + `${props.maxChildPerRow || 1}`;
        return (
          <div className={subFieldsCss}>
            {props.subFields.map((field, index) => (
              <div
                className={
                  "sub-field" + (field.className ? ` ${field.className}` : "")
                }
                key={index}
              >
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
                  fieldIndex={props.fieldIndex}
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Group needs sub fields</div>;
    case "section":
    case "removable_section":
      if (props.subFields && props.subFields.length > 0) {
        if (props.visibility) {
          let visibilityArray;
          //| represents the "or" logic
          if (props.visibility.indexOf("|") > -1) {
            visibilityArray = props.visibility.split("|");
          } else {
            visibilityArray = [props.visibility];
          }
          let hasTrue = false;
          for (let i = 0; i < visibilityArray.length; i++) {
            const [key, value] = visibilityArray[i].split("=");
            const caseDetailValue = getCaseDetailValue(caseDetails, key);
            if (caseDetailValue === value) {
              hasTrue = true;
            }
          }
          if (!hasTrue) return <></>;
        }
        if (fieldValue && Array.isArray(fieldValue.arr)) {
          return (
            <>
              {fieldValue.arr.map((_i, arrIndex) => (
                <div key={arrIndex} className="section-container">
                  {props.control === "removable_section" && (
                    <RemovableSectionHeader
                      label={wt(props.label)}
                      fieldIndex={arrIndex}
                      onRemove={() => {
                        const keyValues = createKeyValuesForRemoveItem(
                          fieldValue,
                          arrIndex,
                        );
                        dispatchFormValue(dispatch, keyValues, arrIndex);
                      }}
                    />
                  )}
                  {props?.subFields?.map((field, index) => (
                    <div key={index}>
                      {field.label && field.hideHeader !== true && (
                        <QText level="normal bold">{wt(field.label)}</QText>
                      )}
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
                {field.label && field.hideHeader !== true && (
                  <QText level="normal bold">{wt(field.label)}</QText>
                )}
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
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Section needs sub fields</div>;
    default:
      return <div>Control not found</div>;
  }
}
