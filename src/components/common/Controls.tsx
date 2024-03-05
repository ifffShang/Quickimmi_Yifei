import React from "react";
import { Input } from "antd";
import { ErrorMessage } from "./Fonts";
import "./Controls.css";

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

export interface FormInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  validate?: (value: string) => boolean;
  errorMessage?: string;
  showErrorMessage?: boolean;
  isRequired?: boolean;
  isPassword?: boolean;
}
export function FormInput(props: FormInputProps) {
  return (
    <div>
      <div className="input-form">
        {props.isPassword ? (
          <Input.Password
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />
        ) : (
          <Input
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />
        )}
        {props.isRequired && <div className="input-required-mark">*</div>}
      </div>
      {props.showErrorMessage &&
        props.validate &&
        !props.validate(props.value) && (
          <ErrorMessage>{props.errorMessage}</ErrorMessage>
        )}
    </div>
  );
}
