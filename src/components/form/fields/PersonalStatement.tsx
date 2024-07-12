import { CheckBox, QDatePicker, QTextArea, QTextBox, RadioSelect, SelectBox } from "./Controls";
import { ErrorMessage, QText } from "../../common/Fonts";
import { Checkbox, DatePicker, Card, Button, InputRef, Radio, Select, Space, Input, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { refineApi } from "../../../api/caseAPI";
import React, { useEffect, useRef, useState } from "react";
import { set } from "lodash";
import { useTranslation } from "react-i18next";
import { generatePersonalStatementApi } from "../../../api/caseAPI";
import { useParams } from "react-router-dom";

export interface PersonalStatementProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => string;
  disabled?: boolean;
  fieldKey?: string;
  className?: string;
  language: string;
}

export function PersonalStatement(props: PersonalStatementProps) {
  const [value, setValue] = useState(props.value === "N/A" ? "" : props.value);
  const inputRef = useRef<InputRef>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const caseId = useAppSelector(state => state.form.caseId);
  let language = props.language;

  if (language === "SIMPLIFIED_CHINESE") {
    language = "Chinese";
  } else if (language === "ENGLISH") {
    language = "English";
  }

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

  const generatePersonalStatement = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      const ps = await generatePersonalStatementApi(accessToken, role, caseId, props.language);
      setValue(ps);
    } catch (error) {
      console.error("Failed to generate personal statement:", error);
    }
  };

  return (
    <div className="text-box-container">
      <TextArea
        rows={10}
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
      <Button type="default" onClick={generatePersonalStatement} className="refine-button" icon={<EditOutlined />}>
        {/* {t({label})} */}
        Generate Personal Statement in {language}
      </Button>
    </div>
  );
}
