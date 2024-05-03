import { FieldKey, ParentFieldKey } from "./apiModels";

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
  referenceId?: string;
}

export interface IFormFields {
  id: string;
  key: ParentFieldKey;
  version: string;
  type: string;
  fields: IFormField[];
}

export interface IFormField {
  id: string;
  key: FieldKey;
  label: string;
  control: ControlType;
  maxChildPerRow: number;
  placeholder?: string;
  fields?: IFormField[];
  options?: IFormOptions[] | string;
  format?: string;
  className?: string;
}

export interface IFormOptions {
  value: string;
  label: string;
  keyValue: string;
}

export type ControlType =
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
  | "group"
  | "datepicker"
  | "component_passport_uploader"
  | "component_textbox_na"
  | "component_location_dropdown"
  | "component_generate_report"
  | "component_telephone_text"
  | "component_list_reports";
