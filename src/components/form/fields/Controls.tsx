import { DatePicker, Input, Select, Checkbox } from "antd";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ErrorMessage, QText } from "../../common/Fonts";
import "./Controls.css";
import { useAppDispatch } from "../../../app/hooks";
import { dispatchFormValue } from "../../../utils/utils";
import { FieldKey, ParentFieldKey } from "../../../model/ApiModals";

export interface QTextBoxProps {
  placeholder: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  parentFieldKey?: ParentFieldKey;
  fieldKey?: FieldKey;
}

export function QTextBox(props: QTextBoxProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(props.value);

  const onTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    setValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
    props.parentFieldKey &&
      props.fieldKey &&
      dispatchFormValue(
        dispatch,
        props.parentFieldKey,
        props.fieldKey,
        e.target.value,
      );
  };

  return (
    <Input
      className="text-box"
      placeholder={props.placeholder}
      value={value}
      onChange={onTextBoxChange}
      disabled={props.disabled || false}
    />
  );
}

export interface QDropdownProps {
  label: string;
  value?: string;
  options?: string[];
  onChange: (value: string) => void;
  ignoreMaxWidth?: boolean;
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

export function QDatePicker() {
  return (
    <div className="datepicker-container">
      <DatePicker
        format={["MM/DD/YYYY", "MM/DD/YY", "MM-DD-YYYY", "MM-DD-YY"]}
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

export interface SelectBoxProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

export function SelectBox(props: SelectBoxProps) {
  return (
    <div className="select-box">
      <Select
        onChange={props.onChange}
        options={props.options}
        disabled={props.disabled || false}
        allowClear={props.allowClear || true}
        placeholder={props.placeholder || "Select an option"}
        value={props.value}
      />
    </div>
  );
}

export interface CheckBoxProps {
  label: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  checked?: boolean;
}

export function CheckBox({ label, disabled = false, onChange }: CheckBoxProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: any) => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };

  return (
    <div>
      <Checkbox onChange={handleChange} disabled={disabled} checked={checked}>
        {label}
      </Checkbox>
    </div>
  );
}
