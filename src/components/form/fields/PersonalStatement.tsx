import { QText } from "../../common/Fonts";
import { EditOutlined } from "@ant-design/icons";
import { Button, InputRef, Input, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { generatePersonalStatementApi, translatePersonalStatementToOriginalLanguageApi } from "../../../api/caseAPI";
import "./PersonalStatement.css";

export interface PersonalStatementProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => string;
  disabled?: boolean;
  fieldKey?: string;
  originLanguage: string;
}

export function PersonalStatement(props: PersonalStatementProps) {
  const { t } = useTranslation();
  const inputRef = useRef<InputRef>(null);
  const role = useAppSelector(state => state.auth.role);
  const caseId = useAppSelector(state => state.form.caseId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [isOriginalLoading, setIsOriginalLoading] = useState(false);
  const [isTranslatedLoading, setIsTranslatedLoading] = useState(false);
  const [showTranslatedArea, setShowTranslatedArea] = useState(false);
  const [value, setValue] = useState("");
  const [translatedValue, setTranslatedValue] = useState("");

  useEffect(() => {
    if (props.value === "N/A") {
      setValue("");
    } else {
      try {
        const { englishPS, translatedPS } = parseCombinedPersonalStatement(props.value);
        setValue(englishPS);
        setTranslatedValue(translatedPS);
        setShowTranslatedArea(true);
      } catch (error) {
        setValue(props.value);
        setTranslatedValue("");
        setShowTranslatedArea(false);
      }
    }
  }, [props.value]);

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, isOriginal: boolean) => {
    if (props.disabled) return;
    const cursorPosition = e.target.selectionStart;
    if (isOriginal) {
      const value = props.onChange(e.target.value);
      setValue(value);
      savePersonalStatement(value, translatedValue);
    } else {
      setTranslatedValue(e.target.value);
      savePersonalStatement(value, e.target.value);
    }
    if (inputRef.current) {
      const inputElement = inputRef.current as unknown as HTMLInputElement;
      setTimeout(() => {
        inputElement.selectionStart = cursorPosition;
        inputElement.selectionEnd = cursorPosition;
      }, 0);
    }
  };

  const savePersonalStatement = (englishPS, translatedPS) => {
    if (translatedPS) {
      const combinedPS = combinePersonalStatements(englishPS, translatedPS, props.originLanguage);
      // setCombinedValue(combinedPS);
      props.onChange(combinedPS);
    } else {
      props.onChange(englishPS);
    }
  };

  const generatePersonalStatement = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setIsOriginalLoading(true);
      const ps = await generatePersonalStatementApi(accessToken, role, caseId, "ENGLISH");
      setValue(ps);
      setIsOriginalLoading(false);
      savePersonalStatement(ps, translatedValue);
    } catch (error) {
      console.error("Failed to generate personal statement:", error);
    }
  };

  const translatePersonalStatement = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setIsTranslatedLoading(true);
      setShowTranslatedArea(true);
      const translatedPs = await translatePersonalStatementToOriginalLanguageApi(accessToken, role, caseId, value, props.originLanguage);
      setTranslatedValue(translatedPs);
      savePersonalStatement(value, translatedPs);
      setIsTranslatedLoading(false);
    } catch (error) {
      console.error("Failed to translate personal statement:", error);
    }
  };

  const combinePersonalStatements = (englishPS, translatedPS, originLanguage) => {
    const combinedPS = {
      personalStatement: [
        {
          language: "ENGLISH",
          content: englishPS,
        },
        {
          language: originLanguage.toUpperCase(),
          content: translatedPS,
        },
      ],
    };
    return JSON.stringify(combinedPS);
  };

  const parseCombinedPersonalStatement = (combinedPSString) => {
    const combinedPS = JSON.parse(combinedPSString);
    const englishPS = combinedPS.personalStatement.find(ps => ps.language === "ENGLISH").content;
    const translatedPS = combinedPS.personalStatement.find(ps => ps.language === props.originLanguage.toUpperCase()).content;
    return { englishPS, translatedPS };
  };

  const { TextArea } = Input;
  const spinStyle: React.CSSProperties = {
    marginTop: 50,
    padding: 50,
  };
  const content = <div style={spinStyle} />;

  return (
    <div>
      {showTranslatedArea ? (
        <div className="text-area-container">
          <div className="text-area-after">
            <div className="text-area-refined-buttons">
              <QText level="normal bold" margin="margin-5" color="gray">
                {t("EnglishVersion")}
              </QText>
              <Button
                type="default"
                onClick={generatePersonalStatement}
                className="text-area-button"
                disabled={isOriginalLoading}
                icon={<EditOutlined />}
              >
                {t("Rewrite")}
              </Button>
            </div>
            {isOriginalLoading ? (
              <Spin tip="Rewriting" style={{ height: 600 }}>
                {content}
              </Spin>
            ) : (
              <TextArea
                rows={10}
                ref={inputRef}
                className="text-area-input"
                placeholder={props.placeholder}
                value={value}
                onChange={(e) => onTextAreaChange(e, true)}
                disabled={props.disabled || false}
                variant="borderless"
              />
            )}
          </div>
          <div className="text-area-after">
            <div className="text-area-refined-buttons">
              <QText level="normal bold" margin="margin-5" color="gray">
                {t("ChineseVersion")}
              </QText>
              <Button
                type="default"
                onClick={translatePersonalStatement}
                className="text-area-button"
                disabled={isTranslatedLoading}
                icon={<EditOutlined />}
              >
                {t("ReTranslate")}
              </Button>
            </div>
            {isTranslatedLoading ? (
              <Spin tip="Rewriting" style={{ height: 600 }}>
                {content}
              </Spin>
            ) : (
              <TextArea
                rows={10}
                ref={inputRef}
                className="text-area-input"
                placeholder={props.placeholder}
                value={translatedValue}
                onChange={(e) => onTextAreaChange(e, false)}
                disabled={props.disabled || false}
                variant="borderless"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="text-area-container">
          <div className="text-area-before">
            {value ? (
              <div className="text-area-refined-buttons">
                <QText level="normal bold" margin="margin-5" color="gray">
                  {t("EnglishVersion")}
                </QText>
                <Button
                  type="default"
                  onClick={generatePersonalStatement}
                  className="text-area-button"
                  disabled={isOriginalLoading}
                  icon={<EditOutlined />}
                >
                  {t("Rewrite")}
                </Button>
                <Button
                  type="default"
                  onClick={translatePersonalStatement}
                  className="text-area-button"
                  disabled={isOriginalLoading}
                  icon={<EditOutlined />}
                >
                  {t("TranslateToOriginalLanguage")}
                </Button>
              </div>
            ) : (
              <Button
                type="default"
                onClick={generatePersonalStatement}
                className="text-area-button"
                disabled={isOriginalLoading}
                icon={<EditOutlined />}
              >
                Write your Personal Statement with AI
              </Button>
            )}
            {isOriginalLoading ? (
              <Spin tip="Rewriting" style={{ height: 600 }}>
                {content}
              </Spin>
            ) : (
              <TextArea
                rows={10}
                ref={inputRef}
                className="text-area-input"
                placeholder={props.placeholder}
                value={value}
                onChange={(e) => onTextAreaChange(e, true)}
                disabled={props.disabled || false}
                variant="borderless"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
