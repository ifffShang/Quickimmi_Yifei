import { QText } from "../../common/Fonts";
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, message, Spin } from "antd";
import { useAppSelector } from "../../../app/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { generatePersonalStatementApi, translatePersonalStatementToOriginalLanguageApi } from "../../../api/caseAPI";
import "./PersonalStatement.css";
import { LanguageEnum } from "../../../model/commonModels";

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
    if (props.value === "") {
      setValue("");
    } else {
      try {
        const { englishPS, translatedPS } = parseCombinedPersonalStatements(props.value);
        setValue(englishPS);
        setTranslatedValue(translatedPS);
        setShowTranslatedArea(translatedPS !== "");
      } catch (error) {
        setValue("");
        setTranslatedValue("");
        setShowTranslatedArea(false);
        message.error("Failed to display the stored personal statement.");
      }
    }
  }, [props.value]);

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, isEnglishPs: boolean) => {
    if (props.disabled) return;
    const cursorPosition = e.target.selectionStart;
    const newValue = e.target.value;
    if (isEnglishPs) {
      setValue(newValue);
      savePersonalStatement(newValue, translatedValue);
    } else {
      setTranslatedValue(newValue);
      savePersonalStatement(value, newValue);
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
    const combinedPS = combinePersonalStatements(englishPS, translatedPS, props.originLanguage);
    props.onChange(combinedPS);
  };

  const combinePersonalStatements = (englishPS: string, translatedPS: string, originLanguage: string) => {
    const combinedPS = {
      personalStatements: [
        {
          language: LanguageEnum.ENGLISH.toUpperCase(),
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

  const generatePersonalStatement = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setIsOriginalLoading(true);
      const ps = await generatePersonalStatementApi(
        accessToken, 
        role, 
        caseId, 
        LanguageEnum.ENGLISH.toUpperCase()
      );
      
      setValue(ps);
      setIsOriginalLoading(false);
      savePersonalStatement(ps, translatedValue);
    } catch (error) {
      setIsOriginalLoading(false);
      message.error("Failed to generate personal statement. Please try again.");
    }
  };

  const translatePersonalStatement = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setShowTranslatedArea(true);
      setIsTranslatedLoading(true);
      const translatedPs = await translatePersonalStatementToOriginalLanguageApi(
        accessToken,
        role,
        caseId,
        value,
        props.originLanguage.toUpperCase(),
      );

      setTranslatedValue(translatedPs);
      savePersonalStatement(value, translatedPs);
      setIsTranslatedLoading(false);
    } catch (error) {
      setIsTranslatedLoading(false);
      message.error("Failed to translate personal statement. Please try again.");
    }
  };

  const parseCombinedPersonalStatements = combinedPSString => {
    console.log("----------------getting combinedPSString value", combinedPSString);
    const combinedPS = JSON.parse(combinedPSString);
    console.log("----------------parsed json", combinedPS);
    const englishPS = combinedPS.personalStatements.find(ps => ps.language === LanguageEnum.ENGLISH.toUpperCase()).content;
    console.log("----------------english ps", englishPS);
    const translatedPS = combinedPS.personalStatements.find(ps => ps.language === props.originLanguage.toUpperCase()).content;
    console.log("----------------translated ps", translatedPS);
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
        <div className="ps-text-area-container">
          <div className="ps-text-area-after">
            <div className="ps-text-area-refined-buttons">
              <QText level="normal bold" margin="margin-5" color="gray">
                {t("EnglishVersion")}
              </QText>
              <Button
                type="default"
                onClick={generatePersonalStatement}
                className="ps-text-area-button"
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
                className="ps-text-area-input"
                placeholder={props.placeholder}
                value={value}
                onChange={e => onTextAreaChange(e, true)}
                disabled={props.disabled || false}
                variant="borderless"
              />
            )}
          </div>
          <div className="ps-text-area-after">
            <div className="ps-text-area-refined-buttons">
              <QText level="normal bold" margin="margin-5" color="gray">
                {t("ChineseVersion")}
              </QText>
              <Button
                type="default"
                onClick={translatePersonalStatement}
                className="ps-text-area-button"
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
                className="ps-text-area-input"
                placeholder={props.placeholder}
                value={translatedValue}
                onChange={e => onTextAreaChange(e, false)}
                disabled={props.disabled || false}
                variant="borderless"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="ps-text-area-container">
          <div className="ps-text-area-before">
            {value ? (
              <div className="ps-text-area-refined-buttons">
                <QText level="normal bold" margin="margin-5" color="gray">
                  {t("EnglishVersion")}
                </QText>
                <Button
                  type="default"
                  onClick={generatePersonalStatement}
                  className="ps-text-area-button"
                  disabled={isOriginalLoading}
                  icon={<EditOutlined />}
                >
                  {t("Rewrite")}
                </Button>
                <Button
                  type="default"
                  onClick={translatePersonalStatement}
                  className="ps-text-area-button"
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
                className="ps-text-area-button"
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
                className="ps-text-area-input"
                placeholder={props.placeholder}
                value={value}
                onChange={e => onTextAreaChange(e, true)}
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
