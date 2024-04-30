import { Checkbox, CheckboxProps } from "antd";
import { QTextBox } from "./Controls";
import { useState } from "react";
import "./TextboxWithNA.css";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { IFormOptions } from "../../../model/formFlowModels";

export interface TextBoxWithNAProps {
  placeholder: string;
  options?: IFormOptions[] | string;
}
export function TextboxWithNA(props: TextBoxWithNAProps) {
  const { wt } = useFormTranslation();
  const [disabled, setDisabled] = useState(false);
  const options = Array.isArray(props.options)
    ? props.options.toString()
    : props.options;

  const onChange: CheckboxProps["onChange"] = e => {
    setDisabled(e.target.checked);
  };
  return (
    <div className="textbox-na">
      <QTextBox
        placeholder={props.placeholder}
        value={""}
        onChange={() => ""}
        disabled={disabled}
      />
      <Checkbox onChange={onChange}>{options ? wt(options) : "N/A"}</Checkbox>
    </div>
  );
}
