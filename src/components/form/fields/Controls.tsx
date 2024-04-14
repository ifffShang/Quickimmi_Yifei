import { Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "../../common/Fonts";
import "./Controls.css";

export interface TextBoxProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TextBox(props: TextBoxProps) {
  return (
    <Input
      className="text-box"
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      disabled={props.disabled || false}
    />
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
  validate?: (value: string) => string;
  showErrorMessage?: boolean;
  isRequired?: boolean;
  isPassword?: boolean;
  autoComplete?: string;
  icon?: React.ReactNode;
}
export function FormInput(props: FormInputProps) {
  const { t } = useTranslation();
  const errorMessage = props.validate ? props.validate(props.value) : "";

  return (
    <div className="form-input-container">
      <div className="input-form">
        {props.isPassword ? (
          <Input.Password
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            autoComplete={props.autoComplete}
            prefix={props.icon}
            status={props.showErrorMessage && errorMessage ? "error" : ""}
          />
        ) : (
          <Input
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            autoComplete={props.autoComplete}
            prefix={props.icon}
            status={props.showErrorMessage && errorMessage ? "error" : ""}
          />
        )}
        {props.isRequired && <div className="input-required-mark">*</div>}
      </div>
      {props.showErrorMessage && errorMessage && (
        <ErrorMessage>{t(errorMessage)}</ErrorMessage>
      )}
    </div>
  );
}
