import React from "react";
import { TextBox } from "../common/Controls";
import { ControlType } from "../../model/CaseModels";

export interface CaseFieldProps {
  control: ControlType;
  label: string;
}

export function CaseField(props: CaseFieldProps) {
  switch (props.control) {
    case "textbox":
      return <TextBox label={props.label} value={""} onChange={() => {}} />;
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
      return <div>Dropdown not implemented</div>;
    case "divider":
      return <div>Divider not implemented</div>;
    case "tips":
      return <div>Tips not implemented</div>;
    default:
      return <div>Control not found</div>;
  }
}
