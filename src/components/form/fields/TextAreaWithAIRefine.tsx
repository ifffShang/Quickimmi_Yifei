import {
  CheckBox,
  QDatePicker,
  QTextArea,
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./Controls";
import { ErrorMessage, QText } from "../../common/Fonts";
import {
  Checkbox,
  DatePicker,
  Card,
  Button,
  InputRef,
  Radio,
  Select,
  Space,
  Input,
  Row,
  Col,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { refineApi } from "../../../api/caseAPI";
import React, { useEffect, useRef, useState } from "react";
import { set } from "lodash";
import { useTranslation } from "react-i18next";
import "./TextAreaWithAIRefine.css";

export interface TextAreaWithAIRefineProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => string;
  disabled?: boolean;
  fieldKey?: string;
  className?: string;
}

export function TextAreaWithAIRefine(props: TextAreaWithAIRefineProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const [textAreaValue, setTextAreaValue] = useState(props.value);
  const [refineAreaValue, setRefineAreaValue] = useState("");
  const [showRefineArea, setShowRefineArea] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const handleRefineAreaChange = (value: string) => {
    setRefineAreaValue(value);
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.disabled) return;
    const cursorPosition = e.target.selectionStart;
    const value = props.onChange(e.target.value);
    setTextAreaValue(value);
    if (inputRef.current) {
      const inputElement = inputRef.current as unknown as HTMLInputElement;
      setTimeout(() => {
        inputElement.selectionStart = cursorPosition;
        inputElement.selectionEnd = cursorPosition;
      }, 0);
    }
  };

  const replaceWithRefinedText = () => {
    setTextAreaValue(refineAreaValue);
    setRefineAreaValue("");
    setShowRefineArea(false);
  };

  const discardRefinedText = () => {
    setShowRefineArea(false);
    setRefineAreaValue("");
  };

  const refineText = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setRefineAreaValue("");
      setShowRefineArea(true);
      const refinedText = await refineApi(
        accessToken,
        role,
        "statement",
        props.value,
      );
      setRefineAreaValue(refinedText);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  return (
    <div>
      <div className="text-box-container">
        {textAreaValue && (
          <div className="inline-placeholder">
            <QText level="placeholder">{props.placeholder}</QText>
          </div>
        )}
      </div>
      {showRefineArea ? (
        <Row>
          <Col span={12}>
            <Card title="Original" style={{ width: "100%" }}>
              <TextArea
                rows={8}
                ref={inputRef}
                className={
                  "text-box" + (props.className ? ` ${props.className}` : "")
                }
                placeholder={props.placeholder}
                value={textAreaValue}
                onChange={onTextAreaChange}
                disabled={props.disabled || false}
              />
            </Card>
          </Col>
          <Col span={12}>
            {refineAreaValue ? (
              <Card
                title={
                  <>
                    Refined
                    <Button
                      type="default"
                      onClick={replaceWithRefinedText}
                      disabled={props.disabled || false}
                      className="refine-button"
                      icon={<EditOutlined />}
                    >
                      {t("Use")}
                    </Button>
                    <Button
                      type="default"
                      onClick={refineText}
                      disabled={props.disabled || false}
                      className="rewrite-button"
                    >
                      {t("Rewrite")}
                    </Button>
                    <Button
                      type="default"
                      onClick={discardRefinedText}
                      disabled={props.disabled || false}
                      className="discard-button"
                    >
                      {t("Discard")}
                    </Button>
                  </>
                }
                style={{ width: "100%" }}
              >
                <TextArea
                  rows={8}
                  className={
                    "text-box" + (props.className ? ` ${props.className}` : "")
                  }
                  placeholder={props.placeholder}
                  value={refineAreaValue}
                  disabled={props.disabled || false}
                  onChange={e => handleRefineAreaChange(e.target.value)}
                />
              </Card>
            ) : (
              <Card>Rewritting...</Card>
            )}
          </Col>
        </Row>
      ) : (
        <Card
          title={
            <Button
              type="default"
              onClick={refineText}
              disabled={textAreaValue ? false : true}
              className="refine-button"
              icon={<EditOutlined />}
            >
              {t("RefineWithAI")}
            </Button>
          }
          style={{ width: "100%" }}
        >
          <TextArea
            rows={8}
            ref={inputRef}
            className={
              "text-box" + (props.className ? ` ${props.className}` : "")
            }
            placeholder={props.placeholder}
            value={textAreaValue}
            onChange={onTextAreaChange}
            disabled={props.disabled || false}
          />
        </Card>
      )}
    </div>
  );
}
