import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { FieldKey, ParentFieldKey } from "../../model/apiModels";
import { ControlType, IFormField } from "../../model/formModels";
import { updateApplicant } from "../../reducers/formSlice";
import { formatCityAndCountryStr, getFieldValue } from "../../utils/utils";
import {
  CheckBox,
  QDatePicker,
  QDropdown,
  QTextBox,
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
  options?: string;
}

export function FormField(props: FormFieldProps) {
  const { wt, wa } = useFormTranslation();
  const dispatch = useAppDispatch();
  const caseDetails = useAppSelector(
    state => state.form.applicationCase?.profile,
  );
  const fieldValue = getFieldValue(
    caseDetails,
    props.parentFieldKey,
    props.fieldKey,
  );

  console.log(
    `Field ${props.parentFieldKey}-${props.fieldKey} value: ${fieldValue}`,
  );

  switch (props.control) {
    case "text":
      return (
        <QTextBox
          placeholder={wt(props.label)}
          value={fieldValue}
          parentFieldKey={props.parentFieldKey}
          fieldKey={props.fieldKey}
        />
      );
    case "textarea":
      return <div>Textarea not implemented</div>;
    case "radio":
      return <div>Radio not implemented</div>;
    case "checkbox":
      return (
        <CheckBox
          label={wt(props.label)}
          onChange={value => {
            console.log(`Checkbox is ${value ? "checked" : "unchecked"}`);
          }}
        />
      );
    case "fileplus":
      return <div>Fileplus not implemented</div>;
    case "file":
      return <div>File not implemented</div>;
    case "dropdown":
      return <QDropdown label="test" onChange={() => {}} />;
    case "select":
      return (
        <SelectBox
          placeholder={wt(props.label)}
          onChange={value => {
            console.log("Selected:", value);
          }}
          options={wa(props.options || "")}
        />
      );
    case "divider":
      return <div>Divider not implemented</div>;
    case "tips":
      return <div>Tips not implemented</div>;
    case "datepicker":
      return (
        <QDatePicker
          placeholder={wt(props.label)}
          value={fieldValue}
          parentFieldKey={props.parentFieldKey}
          fieldKey={props.fieldKey}
        />
      );
    case "component_passport_uploader":
      return <PassportUploader documentId={fieldValue} />;
    case "component_textbox_na":
      return <TextboxWithNA placeholder={wt(props.label)} />;
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
              <div className="sub-field" key={index}>
                <FormField
                  parentFieldKey={props.parentFieldKey}
                  fieldKey={field.key}
                  control={field.control}
                  label={field.label}
                  options={field.options}
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
