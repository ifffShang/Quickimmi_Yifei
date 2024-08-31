import { QText } from "../../common/Fonts";
import type { GetProps } from "antd";
import { Button, Input, InputRef, message, Spin, Tooltip } from "antd";
import Icon, { TranslationOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../app/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { generatePersonalStatementApi, translatePersonalStatementToOriginalLanguageApi } from "../../../api/caseAPI";
import { LanguageEnum } from "../../../model/commonModels";
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
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [isOriginalLoading, setIsOriginalLoading] = useState(false);
  const [isTranslatedLoading, setIsTranslatedLoading] = useState(false);
  const [showTranslatedArea, setShowTranslatedArea] = useState(false);
  const [value, setValue] = useState("");
  const [translatedValue, setTranslatedValue] = useState("");
  const [isAllPreviousSectionComplete, setIsAllPreviousSectionComplete] = useState(false);

  // Check if all sections before personal statement are 100% complete
  const checkIfPreviousSectionsComplete = () => {
    // console.log("-------percentage", JSON.stringify({"percentage": percentage}));
    // console.log("-------progress", progress.steps.find(step => step.name == 'FILLING_APPLICATION')?.substeps.find(subStep => subStep.name == 'FILLING_DETAILS')?.metadata);
    for (const key in percentage) {
      if (key !== "personal_statement" && key !== "cover_letter" && key !== "overall") {
        if (percentage[key]?.avg !== 100) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    setIsAllPreviousSectionComplete(checkIfPreviousSectionsComplete());
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
      const ps = await generatePersonalStatementApi(accessToken, role, caseId, LanguageEnum.ENGLISH.toUpperCase());

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
    const combinedPS = JSON.parse(combinedPSString);
    const englishPS = combinedPS.personalStatements.find(
      ps => ps.language === LanguageEnum.ENGLISH.toUpperCase(),
    ).content;
    const translatedPS = combinedPS.personalStatements.find(
      ps => ps.language === props.originLanguage.toUpperCase(),
    ).content;
    return { englishPS, translatedPS };
  };

  const { TextArea } = Input;
  const spinStyle: React.CSSProperties = {
    marginTop: 50,
    padding: 50,
  };
  const content = <div style={spinStyle} />;
  type CustomIconComponentProps = GetProps<typeof Icon>;
  const AiSvg = () => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.3)">
        <path d="M7.4967 4.08141C7.79742 3.17638 9.07758 3.17638 9.3783 4.08141L10.1359 6.36135C10.2316 6.64947 10.4541 6.87784 10.7396 6.98106L13.0462 7.81499C13.9186 8.1304 13.9186 9.36422 13.0462 9.67963L10.7396 10.5136C10.4541 10.6168 10.2316 10.8451 10.1359 11.1333L9.3783 13.4132C9.07758 14.3182 7.79742 14.3182 7.4967 13.4132L6.73913 11.1333C6.6434 10.8451 6.42092 10.6168 6.1354 10.5136L3.82877 9.67963C2.95636 9.36421 2.95636 8.1304 3.82877 7.81499L6.1354 6.98106C6.42092 6.87784 6.6434 6.64947 6.73913 6.36135L7.4967 4.08141Z" />
        <path d="M13.5095 12.2197C13.6984 11.6871 14.4516 11.6871 14.6405 12.2197L14.9147 12.9928C14.9732 13.1578 15.1008 13.2889 15.264 13.352L16.0754 13.6653C16.5872 13.8629 16.5872 14.5871 16.0754 14.7847L15.264 15.098C15.1008 15.1611 14.9732 15.2922 14.9147 15.4572L14.6405 16.2303C14.4516 16.7629 13.6984 16.7629 13.5095 16.2303L13.2353 15.4572C13.1768 15.2922 13.0492 15.1611 12.886 15.098L12.0746 14.7847C11.5628 14.5871 11.5628 13.8629 12.0746 13.6653L12.886 13.352C13.0492 13.2889 13.1768 13.1578 13.2353 12.9928L13.5095 12.2197Z" />
      </g>
    </svg>
  );

  const AiIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={AiSvg} {...props} />;
  return (
    <div>
      {showTranslatedArea ? (
        <div className="ps-text-area-container">
          <div className="ps-text-area-after">
            <div className="ps-text-area-refined-buttons">
              <QText level="normal bold" margin="margin-5" color="gray">
                {t("EnglishVersion")}
              </QText>
              <Tooltip
                title={
                  !isAllPreviousSectionComplete
                    ? t("Please complete the previous sections before using this feature")
                    : t(
                        "AI will generate the Personal Statement based on the information provided in the previous sections.",
                      )
                }
              >
                <Button
                  type="primary"
                  onClick={generatePersonalStatement}
                  className="ps-text-area-button"
                  disabled={!isAllPreviousSectionComplete || isOriginalLoading}
                  icon={<AiIcon />}
                >
                  {t("Rewrite")}
                </Button>
              </Tooltip>
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
                {t("OriginalLanguageVersion")}
              </QText>
              <Tooltip title={t("Translate the PS on the left panel into Original Language.")}>
                <Button
                  type="primary"
                  onClick={translatePersonalStatement}
                  className="ps-text-area-button"
                  disabled={isTranslatedLoading}
                  icon={<TranslationOutlined />}
                >
                  {t("ReTranslate")}
                </Button>
              </Tooltip>
            </div>
            {isTranslatedLoading ? (
              <Spin tip="Translating" style={{ height: 600 }}>
                {content}
              </Spin>
            ) : (
              <TextArea
                rows={10}
                ref={inputRef}
                className="ps-text-area-input"
                placeholder={props.placeholder}
                value={translatedValue.replace(/\\n/g, "\n")}
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
                <Tooltip
                  title={
                    !isAllPreviousSectionComplete
                      ? t("Please complete the previous sections before using this feature")
                      : t(
                          "AI will generate the Personal Statement based on the information provided in the previous sections.",
                        )
                  }
                >
                  <Button
                    type="primary"
                    onClick={generatePersonalStatement}
                    className="ps-text-area-button"
                    disabled={!isAllPreviousSectionComplete || isOriginalLoading}
                    icon={<AiIcon />}
                  >
                    {t("Rewrite")}
                  </Button>
                </Tooltip>
                <Tooltip title={t("Translate the PS on the left panel into Original Language.")}>
                  <Button
                    type="primary"
                    onClick={translatePersonalStatement}
                    className="ps-text-area-button"
                    disabled={isOriginalLoading}
                    icon={<TranslationOutlined style={{ fontSize: 20 }} />}
                  >
                    {t("TranslateToOriginalLanguage")}
                  </Button>
                </Tooltip>
              </div>
            ) : (
              <Tooltip
                title={
                  !isAllPreviousSectionComplete
                    ? t("Please complete the previous sections before using this feature")
                    : t(
                        "AI will generate the Personal Statement based on the information provided in the previous sections.",
                      )
                }
              >
                <Button
                  type="primary"
                  onClick={generatePersonalStatement}
                  className="ps-text-area-button"
                  disabled={!isAllPreviousSectionComplete || isOriginalLoading}
                  icon={<AiIcon />}
                >
                  {t("Write your Personal Statement with AI")}
                </Button>
              </Tooltip>
            )}
            {isOriginalLoading ? (
              <Spin tip="AI Writing" style={{ height: 600 }}>
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
