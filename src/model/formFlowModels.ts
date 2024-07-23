import { DocumentType } from "./commonModels";
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
  documentType?: DocumentType;
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
  | "checkbox_multioptions"
  | "multi_file_uploader"
  | "single_file_uploader"
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
  | "component_telephone_text"
  | "component_list_documents"
  | "component_list_merged_documents"
  | "component_mailing_same_as_residential"
  | "component_entry_records"
  | "component_add_item"
  | "component_textarea_ai_refine"
  | "component_personal_statement"
  | "component_personal_statement_in_original_language"
  | "percentage" // used only for percentage calculation
  | "multi_file_uploader_new"; // WIP!!! DON'T USE!!!;
