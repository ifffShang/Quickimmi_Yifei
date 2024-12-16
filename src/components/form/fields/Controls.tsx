import { Checkbox, DatePicker, Input, InputRef, Radio, Select, Space } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { IFormOptions } from "../../../model/formFlowModels";
import { ErrorMessage, QText } from "../../common/Fonts";
import "./Controls.css";

const { TextArea } = Input;

/** Form input (sign in, passport) ***********************************************/

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
      {props.showErrorMessage && errorMessage && <ErrorMessage>{t(errorMessage)}</ErrorMessage>}
    </div>
  );
}

/** Field View control ***************************************************/

export interface QFieldViewProps {
  label: string;
  value: string | { [key: string]: { value: string } };
}

export function QFieldView(props: QFieldViewProps) {
  let fieldValue = "";
  if (props.value && typeof props.value === "object") {
    if (props.value["street"] && props.value["street"]["value"]) {
      fieldValue += props.value["street"]["value"];
    }
    if (props.value["aptSteFlr"] && props.value["aptSteFlr"]["value"]) {
      fieldValue += ", " + props.value["aptSteFlr"]["value"];
    }
    if (props.value["aptSteFlrNumber"] && props.value["aptSteFlrNumber"]["value"]) {
      fieldValue += " " + props.value["aptSteFlrNumber"]["value"];
    }
    if (props.value["cityOrTown"] && props.value["cityOrTown"]["value"]) {
      fieldValue += ", " + props.value["cityOrTown"]["value"];
    }
    if (props.value["state"] && props.value["state"]["value"]) {
      fieldValue += ", " + props.value["state"]["value"];
    }
    if (props.value["zipCode"] && props.value["zipCode"]["value"]) {
      fieldValue += ", " + props.value["zipCode"]["value"];
    }
    if (props.value["country"] && props.value["country"]["value"]) {
      fieldValue += ", " + props.value["country"]["value"];
    }
  } else {
    fieldValue = props.value;
  }
  const [value, setValue] = useState(fieldValue);

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  return (
    <div className="field-view-container">
      <QText level="normal bold" noWrap>
        {props.label + ":"}
      </QText>
      <QText level="normal" color="dark">
        {value}
      </QText>
    </div>
  );
}

/** TextBox control ***************************************************/

export interface QTextBoxProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => string;
  disabled?: boolean;
  fieldKey?: string;
  className?: string;
}

export function QTextBox(props: QTextBoxProps) {
  const [value, setValue] = useState(props.value);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    const cursorPosition = e.target.selectionStart;
    const value = props.onChange(e.target.value);
    setValue(value);
    if (inputRef.current) {
      const inputElement = inputRef.current as unknown as HTMLInputElement;
      setTimeout(() => {
        inputElement.selectionStart = cursorPosition;
        inputElement.selectionEnd = cursorPosition;
      }, 0);
    }
  };

  return (
    <div className="text-box-container">
      <Input
        ref={inputRef}
        className={"text-box" + (props.className ? ` ${props.className}` : "")}
        placeholder={props.placeholder}
        value={value}
        onChange={onTextBoxChange}
        disabled={props.disabled}
      />
      {value && (
        <div className="inline-placeholder">
          <QText level="placeholder">{props.placeholder}</QText>
        </div>
      )}
    </div>
  );
}

/** TextArea control ***************************************************/

export interface QTextAreaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => string;
  disabled?: boolean;
  fieldKey?: string;
  className?: string;
}

export function QTextArea(props: QTextAreaProps) {
  const [value, setValue] = useState(props.value === "N/A" ? "" : props.value);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (props.value === "N/A") {
      setValue("");
    } else setValue(props.value);
  }, [props.value]);

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.disabled) return;
    const cursorPosition = e.target.selectionStart;
    const value = props.onChange(e.target.value);
    setValue(value);
    if (inputRef.current) {
      const inputElement = inputRef.current as unknown as HTMLInputElement;
      setTimeout(() => {
        inputElement.selectionStart = cursorPosition;
        inputElement.selectionEnd = cursorPosition;
      }, 0);
    }
  };

  return (
    <div className="text-box-container">
      <TextArea
        rows={4}
        ref={inputRef}
        className={"text-box" + (props.className ? ` ${props.className}` : "")}
        placeholder={props.placeholder}
        value={value}
        onChange={onTextAreaChange}
        disabled={props.disabled || false}
      />
      {value && (
        <div className="inline-placeholder">
          <QText level="placeholder">{props.placeholder}</QText>
        </div>
      )}
    </div>
  );
}

/** Dropdown control ***************************************************/

export interface QDropdownOption {
  value: string;
  label: string;
}

export interface QDropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: QDropdownOption[];
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
      {props.label && <QText level="normal bold">{props.label}</QText>}
      <Select
        className="dropdown-inner"
        onChange={handleChange}
        getPopupContainer={() => container.current || document.body} // This makes the dropdown menu follow the Select component's z-index
        options={props.options}
        placeholder={props.placeholder || "Select an option"}
      />
    </div>
  );
}

/** Date picker control ***************************************************/

export interface QDatePickerProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  fieldKey?: string;
}

export function QDatePicker(props: QDatePickerProps) {
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const onDateChange = (date: dayjs.Dayjs, dateString: string | string[]) => {
    if (props.disabled) return;
    if (!date || !dateString) {
      setValue("");
      props.onChange && props.onChange("");
      return;
    }
    if (Array.isArray(dateString)) dateString = dateString[0];
    setValue(dateString);
    props.onChange && props.onChange(dateString);
  };

  return (
    <div className="datepicker-container">
      <DatePicker
        placeholder={props.placeholder}
        value={value ? dayjs(value, "MM/DD/YYYY") : null}
        format={["MM/DD/YYYY", "MM/DD/YY", "MM-DD-YYYY", "MM-DD-YY"]}
        onChange={onDateChange}
        disabled={props.disabled || false}
        popupStyle={{ zIndex: 1200 }}
      />
      {value && (
        <div className="inline-placeholder">
          <QText level="placeholder">{props.placeholder}</QText>
        </div>
      )}
    </div>
  );
}

/** Month year date picker control ***************************************************/
export interface QMonthYearPickerProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  fieldKey?: string;
}

export function QMonthYearPicker(props: QMonthYearPickerProps) {
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const onMonthYearChange = (date: dayjs.Dayjs, dateString: string | string[]) => {
    if (props.disabled) return;
    if (!date) {
      setValue("");
      props.onChange && props.onChange("");
      return;
    }
    const finalDateString = Array.isArray(dateString) ? dateString[0] : dateString;
    setValue(finalDateString);
    props.onChange && props.onChange(finalDateString);
  };

  return (
    <div className="monthyearpicker-container">
      <DatePicker
        picker="month"
        placeholder={props.placeholder}
        value={value ? dayjs(value, "MM/YYYY") : null}
        format="MM/YYYY"
        onChange={onMonthYearChange}
        disabled={props.disabled || false}
        // getPopupContainer={trigger => trigger.parentElement || document.body}
        getPopupContainer={() => document.body}
        popupStyle={{ zIndex: 1200 }}
      />
      {value && (
        <div className="inline-placeholder">
          <QText level="placeholder">{props.placeholder}</QText>
        </div>
      )}
    </div>
  );
}

/** Select control ***************************************************/

export interface SelectBoxProps {
  options: IFormOptions[] | string;
  onChange: (value: string) => void;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
}

export function SelectBox(props: SelectBoxProps) {
  const { wa, wt } = useFormTranslation();
  const options = Array.isArray(props.options)
    ? props.options.map(option => ({
        keyValue: option.keyValue,
        label: wt(option.label),
        value: option.value,
      }))
    : wa(props.options);
  const prefillValue = options.find(option => option.value === props.value);
  const [value, setValue] = useState(prefillValue?.value);

  useEffect(() => {
    setValue(prefillValue?.value);
  }, [props.value]);

  const onValueChange = (value: string) => {
    setValue(value);
    props.onChange(value);
  };
  return (
    <div className="select-box">
      <Select
        showSearch
        onChange={onValueChange}
        options={options}
        disabled={props.disabled || false}
        placeholder={props.placeholder || "Select an option"}
        value={value}
        getPopupContainer={trigger => trigger.parentElement || document.body}
      />
      {value && (
        <div className="inline-placeholder">
          <QText level="placeholder">{props.placeholder}</QText>
        </div>
      )}
    </div>
  );
}

/** Select multi-options control ***************************************************/

export interface SelectMultiOptionsProps {
  options: IFormOptions[] | string;
  onChange: (value: string[]) => void;
  placeholder?: string;
  selectedValues?: any;
  disabled?: boolean;
}

export function SelectMultiOptions(props: SelectMultiOptionsProps) {
  const { wa, wt } = useFormTranslation();
  const options = Array.isArray(props.options)
    ? props.options.map(option => ({
        label: wt(option.label),
        value: option.value,
      }))
    : wa(props.options);

  const [selectedValues, setSelectedValues] = useState(props.selectedValues || []);

  useEffect(() => {
    setSelectedValues(props.selectedValues || []);
  }, [props.selectedValues]);

  const handleChange = (selectedValues: string[]) => {
    if (!props.options || !Array.isArray(props.options) || props.options.length === 0) {
      console.error("Options are required for select multi-options control");
      return;
    }
    setSelectedValues(selectedValues);
    props.onChange(selectedValues);
  };

  if (!props.options || !Array.isArray(props.options) || props.options.length === 0) {
    return <>Options are required for checkbox multi-options control</>;
  }

  return (
    <div className="select-multi-box">
      <Select
        showSearch
        mode="multiple"
        allowClear
        placeholder={props.placeholder || "Select an option"}
        onChange={handleChange}
        disabled={props.disabled || false}
        options={options}
        value={selectedValues}
        getPopupContainer={trigger => trigger.parentElement || document.body}
      />
      {selectedValues && (
        <div className="inline-placeholder">
          <QText level="placeholder">{props.placeholder}</QText>
        </div>
      )}
    </div>

    // <Checkbox.Group
    //   className="select-multi-options-container"
    //   onChange={handleChange}
    //   disabled={props.disabled}
    //   value={checkedValues}
    // >
    //   {props.options.map(option => (
    //     <div key={option.value} className="checkbox-multi-option">
    //       <Checkbox value={option.value}>
    //         <QText level="normal">{wt(option.label)}</QText>
    //       </Checkbox>
    //     </div>
    //   ))}
    // </Checkbox.Group>
  );
}

/** Checkbox control ***************************************************/

export interface CheckBoxProps {
  label: string;
  onChange: (keyValueChecked: string) => void;
  disabled?: boolean;
  checked?: boolean;
  options?: IFormOptions[] | string;
}

export function CheckBox(props: CheckBoxProps) {
  const [checked, setChecked] = useState(props.checked || false);

  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  const handleChange = (e: any) => {
    setChecked(e.target.checked);
    if (props.options && Array.isArray(props.options)) {
      const keyValue = props.options.find(option => {
        if (typeof option.keyValue === "string") {
          // example: option.keyValue is "true,false"
          return option.keyValue.split(",")[0] === e.target.checked.toString();
        } else {
          // example: option.keyValue is true or false
          return option.keyValue === e.target.checked;
        }
      })?.keyValue;
      props.onChange(keyValue || "");
    } else {
      props.onChange(e.target.checked);
    }
  };

  return (
    <div>
      <Checkbox onChange={handleChange} disabled={props.disabled} checked={checked}>
        <QText level="normal bold">{props.label}</QText>
      </Checkbox>
    </div>
  );
}

/** Pure Checkbox control ***************************************************/

export interface PureCheckBoxProps {
  label: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  checked?: boolean;
}

export function PureCheckBox(props: PureCheckBoxProps) {
  const [checked, setChecked] = useState(props.checked || false);

  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  const handleChange = (e: any) => {
    setChecked(e.target.checked);
    props.onChange(e.target.checked);
  };

  return (
    <div>
      <Checkbox onChange={handleChange} disabled={props.disabled} checked={checked}>
        <QText level="normal bold">{props.label}</QText>
      </Checkbox>
    </div>
  );
}

/** Checkbox multi-options control ***************************************************/

export interface CheckBoxMultiOptionsProps {
  label: string;
  onChange: (keyValueChecked: string) => void;
  disabled?: boolean;
  checkedValues?: string[];
  options?: IFormOptions[] | string;
}

export function CheckBoxMultiOptions(props: CheckBoxMultiOptionsProps) {
  const [checkedValues, setCheckedValues] = useState(props.checkedValues || []);
  const { wt } = useFormTranslation();

  useEffect(() => {
    setCheckedValues(props.checkedValues || []);
  }, [props.checkedValues]);

  const handleChange = (selectedValues: string[]) => {
    if (!props.options || !Array.isArray(props.options) || props.options.length === 0) {
      console.error("Options are required for checkbox multi-options control");
      return;
    }
    setCheckedValues(selectedValues);
    let result: any;
    props.options.forEach(option => {
      if (!result) {
        result = Array(option.keyValue.split(",").length).fill("false");
      }
      if (selectedValues.includes(option.value)) {
        option.keyValue.split(",").forEach((keyValue: string, index: number) => {
          if (keyValue === "true") {
            result[index] = "true";
          }
        });
      }
    });
    props.onChange(result.join(","));
  };

  if (!props.options || !Array.isArray(props.options) || props.options.length === 0) {
    return <>Options are required for checkbox multi-options control</>;
  }

  return (
    <Checkbox.Group
      className="checkbox-multi-options-container"
      onChange={handleChange}
      disabled={props.disabled}
      value={checkedValues}
    >
      {props.options.map(option => (
        <div key={option.value} className="checkbox-multi-option">
          <Checkbox value={option.value}>
            <QText level="normal">{wt(option.label)}</QText>
          </Checkbox>
        </div>
      ))}
    </Checkbox.Group>
  );
}

/** Radio control ***************************************************/

export interface RadioSelectProps {
  options: IFormOptions[] | string;
  onChange: (value: string) => void;
  value?: any;
  disabled?: boolean;
  className?: string;
}

export function RadioSelect(props: RadioSelectProps) {
  const { wa, wt } = useFormTranslation();
  const options = Array.isArray(props.options)
    ? props.options.map(option => ({
        keyValue: option.keyValue,
        label: wt(option.label),
        value: option.value,
      }))
    : wa(props.options);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const onValueChange = (value: string) => {
    setValue(value);
    props.onChange(value);
  };

  const direction = props.className === "apt-ste-flr-checkbox" ? "horizontal" : "vertical";

  return (
    <Radio.Group
      className={props.className ?? ""}
      onChange={e => onValueChange(e.target.value)}
      value={value}
      disabled={props.disabled || false}
    >
      <Space direction={direction}>
        {options.map(option => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
}

/** DatePickerWithNA control ***************************************************/
export interface QDatePickerWithNAProps extends Omit<QDatePickerProps, "value" | "onChange"> {
  value?: string;
  onChange: (value: string) => void;
  notApplicableText: string;
}

export function QDatePickerWithNA(props: QDatePickerWithNAProps) {
  const [isNA, setIsNA] = useState(props.value === "N/A");

  useEffect(() => {
    setIsNA(props.value === "N/A");
  }, [props.value]);

  const handleDateChange = (value: string) => {
    if (!isNA) {
      props.onChange(value);
    }
  };

  const handleNAChange = (checked: boolean) => {
    if (checked) {
      setIsNA(true);
      props.onChange("N/A");
    } else {
      setIsNA(false);
      props.onChange("");
    }
  };

  return (
    <div className="datepicker-na">
      <div className="datepicker-na-picker">
        <QDatePicker
          {...props}
          value={isNA ? "" : props.value}
          onChange={handleDateChange}
          disabled={isNA || props.disabled}
        />
      </div>
      <PureCheckBox checked={isNA} label={props.notApplicableText} onChange={handleNAChange} />
    </div>
  );
}

/** MonthYearPickerWithOption control ***************************************************/
// Month and year picker with support for multiple options (e.g., present, N/A) by adding corresponding controls in FormField.tsx
export interface MonthYearPickerWithOptionProps extends Omit<QMonthYearPickerProps, "value" | "onChange"> {
  value?: string;
  onChange: (value: string) => void;
  notApplicableText: string;
  optionValue: string;
}

export function MonthYearPickerWithOption(props: MonthYearPickerWithOptionProps) {
  const { optionValue } = props;
  const [isOptionSelected, setIsOptionSelected] = useState(props.value === optionValue);

  useEffect(() => {
    setIsOptionSelected(props.value === optionValue);
  }, [props.value, optionValue]);

  const handleDateChange = (value: string) => {
    if (!isOptionSelected) {
      props.onChange(value);
    }
  };

  const handleOptionChange = (checked: boolean) => {
    if (checked) {
      setIsOptionSelected(true);
      props.onChange(optionValue);
    } else {
      setIsOptionSelected(false);
      props.onChange("");
    }
  };

  return (
    <div className="monthyearpicker-with-option">
      <div className="monthyearpicker-with-option-picker">
        <QMonthYearPicker
          {...props}
          value={isOptionSelected ? "" : props.value}
          onChange={handleDateChange}
          disabled={isOptionSelected || props.disabled}
        />
      </div>
      <PureCheckBox checked={isOptionSelected} label={props.notApplicableText} onChange={handleOptionChange} />
    </div>
  );
}
