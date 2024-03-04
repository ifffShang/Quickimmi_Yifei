import React from "react";
import Input from "antd/es/input/Input";

export interface TextBoxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextBox(props: TextBoxProps) {
  return (
    <div>
      <label>{props.label}</label>
      <Input
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}

export interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function Dropdown() {
  return <div>Dropdown not implemented</div>;
}
