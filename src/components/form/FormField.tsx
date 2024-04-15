import { useFormTranslation } from "../../hooks/commonHooks";
import { ControlType, IFormField } from "../../model/FormModels";
import { QDropdown, TextBox } from "./fields/Controls";
import { NationalityDropdown } from "./fields/NationalityDropdown";
import { PassportUploader } from "./fields/PassportUploader";
import { TextboxWithNA } from "./fields/TextboxWithNA";
import "./FormField.css";

export interface FormFieldProps {
  control: ControlType;
  label: string;
  maxChildPerRow?: number;
  subFields?: IFormField[];
}

export function FormField(props: FormFieldProps) {
  const { wt } = useFormTranslation();
  switch (props.control) {
    case "text":
      return (
        <TextBox placeholder={wt(props.label)} value={""} onChange={() => {}} />
      );
    case "textarea":
      return <div>Textarea not implemented</div>;
    case "radio":
      return <div>Radio not implemented</div>;
    case "checkbox":
      return <div>Checkbox not implemented</div>;
    case "fileplus":
      return <div>Fileplus not implemented</div>;
    case "file":
      return <div>File not implemented</div>;
    case "dropdown":
      return <QDropdown label="test" onChange={() => {}} />;
    case "divider":
      return <div>Divider not implemented</div>;
    case "tips":
      return <div>Tips not implemented</div>;
    case "component_passport_uploader":
      return <PassportUploader />;
    case "component_textbox_na":
      return <TextboxWithNA placeholder={wt(props.label)} />;
    case "component_nationality_dropdown":
      return <NationalityDropdown />;
    case "group":
      if (props.subFields && props.subFields.length > 0) {
        const subFieldsCss = "horizontal-" + `${props.maxChildPerRow || 1}`;
        return (
          <div className={subFieldsCss}>
            {props.subFields.map((field, index) => (
              <div className="sub-field" key={index}>
                <FormField control={field.control} label={field.label} />
              </div>
            ))}
          </div>
        );
      } else return <div>Group not implemented</div>;
    default:
      return <div>Control not found</div>;
  }
}
