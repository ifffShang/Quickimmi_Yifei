import { QText } from "../../common/Fonts";
import { Button, InputRef, Input, Spin } from "antd";
import Icon, { CheckOutlined, RetweetOutlined, CloseSquareOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { refineApi } from "../../../api/caseAPI";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./TextAreaWithAIRefine.css";

export interface TextAreaWithAIRefineProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => string;
  fieldKey?: string;
}

export function TextAreaWithAIRefine(props: TextAreaWithAIRefineProps) {
  const { t } = useTranslation();
  const role = useAppSelector(state => state.auth.role);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [textAreaValue, setTextAreaValue] = useState(props.value);
  const [refineAreaValue, setRefineAreaValue] = useState("");
  const [showRefineArea, setShowRefineArea] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const fieldkey = props.fieldKey;
  const label = props.label.split("_")[1];

  const handleRefineAreaChange = (value: string) => {
    setRefineAreaValue(value);
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    props.onChange(refineAreaValue);
  };

  const discardRefinedText = () => {
    setShowRefineArea(false);
    setRefineAreaValue("");
    console.log("field key is: ", fieldkey);
    console.log("label is: ", label);
    console.log(t(label));
  };

  const refineText = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setRefineAreaValue("");
      setShowRefineArea(true);
      const refinedText = await refineApi(accessToken, role, "statement", t(label), props.value);
      setRefineAreaValue(refinedText);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  const { TextArea } = Input;
  const spinStyle: React.CSSProperties = {
    marginTop: 50,
    padding: 50,
  };
  const content = <div style={spinStyle} />;

  return (
    <div>
      {showRefineArea ? (
        <div className="text-area-container">
          <div className="text-area-after">
            <QText level="normal bold" margin="margin-5" color="gray">
              {t("Original")}
            </QText>
            <TextArea
              rows={8}
              ref={inputRef}
              className={"text-area-input"}
              placeholder={props.placeholder}
              value={textAreaValue}
              onChange={onTextAreaChange}
              // disabled={props.disabled || false}
              variant="borderless"
            />
          </div>
          <div className="text-area-after">
            {refineAreaValue ? (
              <div className="text-area-container-refined">
                <div className="text-area-refined-buttons">
                  <QText level="normal bold" margin="margin-5" color="gray">
                    {t("Improved")}
                  </QText>
                  <Button
                    type="primary"
                    onClick={replaceWithRefinedText}
                    // disabled={props.disabled || false}
                    className="text-area-button"
                    icon={<CheckOutlined />}
                  >
                    {t("Use")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={refineText}
                    // disabled={props.disabled || false}
                    className="text-area-button"
                    icon={<RetweetOutlined />}
                  >
                    {t("Rewrite")}
                  </Button>
                  <CloseCircleOutlined
                    onClick={discardRefinedText}
                    // disabled={props.disabled || false}
                    className="text-area-button-discard"
                  />
                </div>
                <TextArea
                  rows={8}
                  className={"text-area-input"}
                  placeholder={props.placeholder}
                  value={refineAreaValue}
                  // disabled={props.disabled || false}
                  onChange={e => handleRefineAreaChange(e.target.value)}
                  variant="borderless"
                />
              </div>
            ) : (
              <Spin tip="Rewriting">{content}</Spin>
            )}
          </div>
        </div>
      ) : (
        <div className="text-area-container">
          <div className="text-area-before">
            <Button
              type="primary"
              onClick={refineText}
              disabled={textAreaValue ? false : true}
              className="text-area-button"
              icon={<RetweetOutlined />}
            >
              {t("RefineWithAI")}
            </Button>
            <TextArea
              rows={8}
              ref={inputRef}
              className="text-area-input"
              placeholder={props.placeholder}
              value={textAreaValue}
              onChange={onTextAreaChange}
              // disabled={props.disabled || false}
              variant="borderless"
            />
          </div>
        </div>
      )}
    </div>
  );
}
