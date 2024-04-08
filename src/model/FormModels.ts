export interface Form {
  id: string;
  version: string;
  type: string;
  steps: FormStep[];
}

export interface FormStep {
  id: string;
  label: string;
  order: number;
  type: string;
  steps: FormStep[];
  referenceId?: string;
}

export interface FormFields {
  id: string;
  version: string;
  type: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  order: number;
  control: ControlType;
  fields?: FormField[];
}

export type ControlType =
  | "textbox"
  | "textarea"
  | "radio"
  | "checkbox"
  | "fileplus" // file upload icon style
  | "file" // file upload link style
  | "dropdown"
  | "divider"
  | "tips";

export interface WorkflowField {
  order: number;
  control: ControlType;
  name?: string;
  label?: string;
  options?: WorkflowFieldOptions[];
  components?: WorkflowFieldComponent[];
  dependsOn?: string;
}

export interface WorkflowFieldOptions {
  label: string;
  value: string;
  dependsOnValue?: string;
  options?: WorkflowFieldOptions[];
}

export interface WorkflowFieldComponent {
  dependsOnValue: string;
  component: string;
}

export interface Workflow {
  id: string;
  version: string;
  type: string;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  label: string;
  order: number;
  type: string;
  referenceId: string;
}

export interface WorkflowForm {
  id: string;
  version: string;
  type: string;
  pages: WorkflowPage[];
}

export interface WorkflowPage {
  order: number;
  title: string;
  subtitle: string;
  fields: WorkflowField[];
}
