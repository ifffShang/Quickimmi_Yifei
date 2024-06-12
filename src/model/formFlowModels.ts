export interface IForm {
  id: string;
  version: string;
  type: string;
  steps: IFormStep[];
}

export interface IFormStep {
  id: string;
  label: string;
  type: string;
  steps: IFormStep[];
  standalone?: boolean;
  referenceId?: string;
}

export interface IFormFields {
  id: string;
  version: string;
  type: string;
  fields: IFormField[];
}

export interface IFormField {
  id: string;
  key: string;
  label: string;
  control: ControlType;
  maxChildPerRow: number;
  placeholder?: string;
  fields?: IFormField[];
  options?: IFormOptions[] | string;
  format?: string;
  className?: string;
  visibility?: string;
  hideHeader?: boolean;
  fieldIndex?: number;
}

export interface IFormOptions {
  value: string;
  label: string;
  keyValue: string;
}

export type ControlType =
  | "label"
  | "text"
  | "textarea"
  | "radio"
  | "checkbox"
  | "fileplus" // file upload icon style
  | "file" // file upload link style
  | "dropdown"
  | "select"
  | "divider"
  | "tips"
  | "datepicker"
  | "group"
  | "section"
  | "removable_section"
  | "component_passport_uploader"
  | "component_multi_textboxes_na"
  | "component_textbox_na"
  | "component_location_dropdown"
  | "component_generate_report"
  | "component_telephone_text"
  | "component_list_reports"
  | "component_mailing_same_as_residential"
  | "component_entry_records"
  | "component_add_item";
