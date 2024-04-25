import { Checkbox, CheckboxProps } from "antd";
import { QTextBox } from "./Controls";
import { useState } from "react";
import "./TextboxWithNA.css";

export interface TextBoxWithNAProps {
  placeholder: string;
}
export function TextboxWithNA(props: TextBoxWithNAProps) {
  const [disabled, setDisabled] = useState(false);

  const onChange: CheckboxProps["onChange"] = e => {
    setDisabled(e.target.checked);
  };
  return (
    <div className="textbox-na">
      <QTextBox
        placeholder={props.placeholder}
        value={""}
        onChange={() => {}}
        disabled={disabled}
      />
      <Checkbox onChange={onChange}>N/A</Checkbox>
    </div>
  );
}
