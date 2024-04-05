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
