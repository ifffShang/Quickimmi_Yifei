import {
  CheckBox,
  QDatePicker,
  QTextArea,
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./Controls";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { refineApi } from "../../../api/caseAPI";
import React, { useState } from "react";
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

  const handleRefineAreaChange = (value: string) => {
    setRefineAreaValue(value);
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
      const refinedText = await refineApi(
        accessToken,
        role,
        "statement",
        props.value,
      );
      setRefineAreaValue(refinedText);
      setShowRefineArea(true);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  return (
    <div>
      <QTextArea
        placeholder={props.placeholder}
        value={textAreaValue}
        onChange={props.onChange}
        disabled={props.disabled}
        fieldKey={props.fieldKey}
        className={props.className}
      />
      {showRefineArea ? (
        <div>
          <TextArea
            rows={4}
            className={
              "text-box" + (props.className ? ` ${props.className}` : "")
            }
            placeholder={props.placeholder}
            value={refineAreaValue}
            disabled={props.disabled || false}
            onChange={e => handleRefineAreaChange(e.target.value)}
          />
          <Button
            type="default"
            onClick={replaceWithRefinedText}
            disabled={props.disabled || false}
            className="refine-button"
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
        </div>
      ) : (
        <Button
          type="default"
          onClick={refineText}
          disabled={props.disabled || false}
          className="refine-button"
        >
          {t("RefineWithAI")}
        </Button>
      )}
    </div>
  );
}
