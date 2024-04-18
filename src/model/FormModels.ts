export interface IForm {
  id: string;
  version: string;
  type: string;
  steps: IFormStep[];
}

export interface IFormStep {
  id: string;
  label: string;
  order: number;
  type: string;
  steps: IFormStep[];
  referenceId?: string;
}

export interface IFormFields {
  id: string;
  version: string;
  type: string;
  fields: IFormField[];
}

export interface IFormField {
  options?: string;
  id: string;
  label: string;
  order: number;
  control: ControlType;
  maxChildPerRow: number;
  fields?: IFormField[];
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
  | "component_location_dropdown";
