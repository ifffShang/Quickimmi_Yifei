import { Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Regex } from "../../consts/consts";
import { useFormTranslation } from "../../hooks/commonHooks";
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
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./fields/Controls";
import { DocumentList } from "./fields/DocumentList";
import { GenerateDocument } from "./fields/GenerateDocument";
import { LocationDropdown } from "./fields/LocationDropdown";
import { PassportUploader } from "./fields/PassportUploader";
import { TextboxWithNA } from "./fields/TextboxWithNA";
import { Identity, KeyValues } from "../../model/commonModels";
import { QText } from "../common/Fonts";
import "./FormField.css";

export interface FormFieldProps {
  parentFieldKey: string;
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
          const values = option.keyValue.split(",");
          const keyValues = {} as KeyValues;
          keys.forEach((key, index) => {
            keyValues[key] = values[index];
          });
          dispatchFormValue(dispatch, props.parentFieldKey, keyValues);
        } else {
          dispatchFormValue(dispatch, props.parentFieldKey, {
            [props.fieldKey]: option.keyValue,
          });
        }
      } else {
        dispatchFormValue(dispatch, props.parentFieldKey, {
          [props.fieldKey]: value,
        });
      }
    } else {
      dispatchFormValue(dispatch, props.parentFieldKey, {
        [props.fieldKey]: value,
      });
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
        dispatchFormValue(dispatch, props.parentFieldKey, {
          [keys[0]]: group1,
          [keys[1]]: group2,
        });
      }
      return returnValue;
    } else {
      props.parentFieldKey &&
        props.fieldKey &&
        dispatchFormValue(dispatch, props.parentFieldKey, {
          [props.fieldKey]: value,
        });
      return value;
    }
  };

  const onCheckboxChange = (value: boolean) => {
    if (!props.parentFieldKey || !props.fieldKey) return;

    if (props.fieldKey.indexOf(",") > -1) {
      const keys = props.fieldKey.split(",");
      dispatchFormValue(dispatch, props.parentFieldKey, {
        [keys[0]]: value,
        [keys[1]]: !value,
      });
      return;
    }
    dispatchFormValue(dispatch, props.parentFieldKey, {
      [props.fieldKey]: value,
    });
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
          parentFieldKey={props.parentFieldKey}
          fieldKey={props.fieldKey}
        />
      );
    case "component_passport_uploader": {
      let identity: Identity = "Applicant";
      if (props.parentFieldKey === "family.spouse") {
        identity = "Spouse";
      }
      return <PassportUploader documentId={fieldValue} identity={identity} />;
    }
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
    case "component_list_reports":
      return <DocumentList />;
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
                  maxChildPerRow={field.maxChildPerRow}
                  subFields={field.fields}
                  format={field.format}
                  visibility={field.visibility}
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Group needs sub fields</div>;
    case "section":
      if (props.subFields && props.subFields.length > 0) {
        if (props.visibility) {
          const [key, value] = props.visibility.split("=");
          if (key && key.indexOf(".") > -1) {
            const keys = key.split(".");
            if (caseDetails[keys[0]][keys[1]]?.toString() !== value) {
              return null;
            }
          }
        }
        return (
          <div className="section-container">
            {props.subFields.map((field, index) => (
              <div key={index}>
                {field.label !== "none" && (
                  <QText level="normal bold">{wt(field.label)}</QText>
                )}
                <FormField
                  parentFieldKey={props.fieldKey || props.parentFieldKey}
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
