import { Input, Select } from "antd";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ErrorMessage, QText } from "../../common/Fonts";
import "./Controls.css";
import { Uploader } from "./Uploader";

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

export interface QDropdownProps {
  label: string;
  value?: string;
  options?: string[];
  onChange: (value: string) => void;
}

export function QDropdown(props: QDropdownProps) {
  const container = useRef(null);

  const handleChange = (value: string) => {
    props.onChange(value);
  };
  return (
    <div className="dropdown-container" ref={container}>
      <QText level="normal bold">{props.label}</QText>
      <Select
        className="dropdown-inner"
        onChange={handleChange}
        getPopupContainer={() => container.current || document.body} // This makes the dropdown menu follow the Select component's z-index
        options={[
          { value: "idcard", label: "Identification card" },
          { value: "driverlicense", label: "Driver license" },
        ]}
      />
    </div>
  );
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
