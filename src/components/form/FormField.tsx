import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Regex } from "../../consts/consts";
import { useFormTranslation } from "../../hooks/commonHooks";
import { FieldKey, ParentFieldKey } from "../../model/apiModels";
import {
  ControlType,
  IFormField,
  IFormOptions,
} from "../../model/formFlowModels";
import { updateApplicant } from "../../reducers/formSlice";
import {
  dispatchFormValue,
  formatCityAndCountryStr,
  getFieldValue,
} from "../../utils/utils";
import {
  CheckBox,
  QDatePicker,
  QDropdown,
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./fields/Controls";
import { GenerateDocument } from "./fields/GenerateDocument";
import { LocationDropdown } from "./fields/LocationDropdown";
import { PassportUploader } from "./fields/PassportUploader";
import { TextboxWithNA } from "./fields/TextboxWithNA";

export interface FormFieldProps {
  parentFieldKey: ParentFieldKey;
  fieldKey: FieldKey;
  control: ControlType;
  label: string;
  maxChildPerRow?: number;
  subFields?: IFormField[];
  options?: IFormOptions[] | string;
  placeholder?: string;
  format?: string;
  className?: string;
}

export function FormField(props: FormFieldProps) {
  const { wt, wa } = useFormTranslation();
  const dispatch = useAppDispatch();
  const caseDetails = useAppSelector(
    state => state.form.applicationCase?.profile,
  );

  const placeholder = props.placeholder ? wt(props.placeholder) : "";

  const fieldValue = getFieldValue(
    caseDetails,
    props.parentFieldKey,
    props.fieldKey,
    props.options,
    props.format,
  );

  console.log(
    `Field ${props.parentFieldKey}-${props.fieldKey} value: ${fieldValue}`,
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
          const keyValues = option.keyValue.split(",");
          keys.forEach((key, index) => {
            dispatch(
              updateApplicant({
                [key]: keyValues[index],
              }),
            );
          });
        } else {
          dispatch(
            updateApplicant({
              [props.fieldKey]: option.keyValue,
            }),
          );
        }
      } else {
        dispatch(
          updateApplicant({
            [props.fieldKey]: value,
          }),
        );
      }
    } else {
      dispatch(
        updateApplicant({
          [props.fieldKey]: value,
        }),
      );
    }
  };

  const onTextChange = (value: string): string => {
    if (
      props.parentFieldKey &&
      props.fieldKey &&
      props.fieldKey.indexOf(",") > -1 &&
      props.format
    ) {
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
        dispatch(
          updateApplicant({
            [keys[0]]: group1,
            [keys[1]]: group2,
          }),
        );
      }
      return returnValue;
    } else {
      props.parentFieldKey &&
        props.fieldKey &&
        dispatchFormValue(
          dispatch,
          props.parentFieldKey,
          props.fieldKey,
          value,
        );
      return value;
    }
  };

  const onCheckboxChange = (value: boolean) => {
    if (!props.parentFieldKey || !props.fieldKey) return;

    if (props.fieldKey.indexOf(",") > -1) {
      const keys = props.fieldKey.split(",");
      dispatch(
        updateApplicant({
          [keys[0]]: value,
          [keys[1]]: !value,
        }),
      );
      return;
    }

    dispatch(
      updateApplicant({
        [props.fieldKey]: value,
      }),
    );
  };

  switch (props.control) {
    case "text":
      return (
        <QTextBox
          placeholder={placeholder}
          value={fieldValue}
          parentFieldKey={props.parentFieldKey}
          fieldKey={props.fieldKey}
          onChange={onTextChange}
        />
      );
    case "textarea":
      return <div>Textarea not implemented</div>;
    case "radio":
      return (
        <RadioSelect
          onChange={onOptionChange}
          options={props.options || ""}
          value={fieldValue}
        />
      );
    case "checkbox":
      return <CheckBox label={wt(props.label)} onChange={onCheckboxChange} />;
    case "fileplus":
      return <div>Fileplus not implemented</div>;
    case "file":
      return <div>File not implemented</div>;
    case "dropdown":
      return <QDropdown label="test" onChange={() => {}} />;
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
      return <div>Divider not implemented</div>;
    case "tips":
      return <div>Tips not implemented</div>;
    case "datepicker":
      return (
        <QDatePicker
          placeholder={placeholder}
          value={fieldValue}
          parentFieldKey={props.parentFieldKey}
          fieldKey={props.fieldKey}
        />
      );
    case "component_passport_uploader":
      return <PassportUploader documentId={fieldValue} />;
    case "component_textbox_na":
      return (
        <TextboxWithNA
          placeholder={placeholder}
          value={fieldValue}
          onChange={(value: string) => {
            return onTextChange(value);
          }}
        />
      );
    case "component_location_dropdown":
      return (
        <LocationDropdown
          prefillStr={fieldValue}
          onLocationChange={(...params) => {
            const locationStr = formatCityAndCountryStr(...params);
            dispatch(
              updateApplicant({
                [props.fieldKey]: locationStr,
              }),
            );
          }}
        />
      );
    case "component_generate_report":
      return <GenerateDocument />;
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
                  parentFieldKey={props.parentFieldKey}
                  fieldKey={field.key}
                  control={field.control}
                  label={field.label}
                  options={field.options}
                  placeholder={field.placeholder}
                  className={field.className}
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Group not implemented</div>;
    default:
      return <div>Control not found</div>;
  }
}
