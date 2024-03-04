export interface Workflow {
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  order: number;
  name: string;
  label: string;
  pages: WorkflowPage[];
}

export interface WorkflowPage {
  order: number;
  title: string;
  subtitle: string;
  fields: WorkflowField[];
}

export type ControlType = "textbox"
  | "textarea"
  | "radio"
  | "checkbox"
  | "fileplus"
  | "file"
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
