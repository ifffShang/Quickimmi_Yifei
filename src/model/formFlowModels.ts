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
  keyObject?: IFormKeyObject;
  label: string;
  control: ControlType;
  maxChildPerRow: number;
  placeholder?: string;
  fields?: IFormField[];
  options?: IFormOptions[] | string;
  linkage?: string;
  format?: string;
  className?: string;
  visibility?: string;
  hideHeader?: boolean;
  fieldIndex?: number;
  documentType?: DocumentType;
  identity?: string;
  syncFields?: ISyncFields;
}

export interface IFormKeyObject {
  [key: string]: IFormKeyValueObject;
}

export interface IFormKeyValueObject {
  key: string;
  [key: string]: any;
}

export interface IFormOptions {
  value: string;
  label: string;
  keyValue: string;
}

export interface ISyncMapping {
  source: string;
  destination: string;
}

export interface ISyncFields {
  condition: string;
  mappings: ISyncMapping[];
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
  | "select_multioptions"
  | "divider"
  | "tips"
  | "datepicker"
  | "datepickerWithNA"
  | "datepickerWithDS"
  | "datepickerWithNotMarried"
  | "monthyearpicker"
  | "group"
  | "section"
  | "removable_section"
  | "sortable_section"
  | "collapse_section"
  | "component_passport_uploader"
  | "component_i94_uploader"
  | "component_passport_uploader_with_na"
  | "component_multi_textboxes_na"
  | "component_multi_names_na"
  | "component_textbox_na"
  | "component_location_dropdown"
  | "component_location_dropdown_splitted"
  | "component_telephone_text"
  | "component_list_documents"
  | "component_list_merged_documents"
  | "component_mailing_same_as_residential"
  | "component_same_address_checkbox"
  | "component_never_lived_together_checkbox"
  | "component_entry_records"
  | "component_add_item"
  | "component_textarea_ai_refine"
  | "component_personal_statement"
  | "component_personal_statement_in_original_language"
  | "component_cover_letter"
  | "component_view_application_form"
  | "component_address"
  | "component_address_outside_us"
  | "component_address_us"
  | "percentage" // used only for percentage calculation
  | "multi_file_uploader_new" // WIP!!! DON'T USE!!!;
  | "component_monthyearpicker_present";

export interface RefineResponse {
  result: string;
  tips: string[];
}

export interface RefinePSResponse {
  englishPS: string;
  originalLanguagePS: string;
}

export interface IFormStepAndFieldsRecord {
  step: IFormStep;
  subStep: IFormStep;
  fields: IFormFields;
}

export interface IFormStructure {
  formStepsAndFormFieldsList: IFormStepAndFieldsRecord[];
  form: IForm;
}
