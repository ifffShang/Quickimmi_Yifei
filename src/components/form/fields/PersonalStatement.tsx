import { QText } from "../../common/Fonts";
import type { GetProps, MenuProps } from "antd";
import { Button, Input, InputRef, message, Spin, Tooltip, Card, Menu } from "antd";
import Icon, { TranslationOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  AskAi,
  SendIcon,
  AiImprove,
  AiMakeLonger,
  AiMakeShorter,
  AiFixGrammar,
  AiTranslate,
  TipsIcon,
} from "../../icons/AiPrompt";
import { useAppSelector } from "../../../app/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  generatePersonalStatementApi,
  generatePSWithAIForCaseApi,
  translatePersonalStatementToOriginalLanguageApi,
  translatePersonalStatementToEnglishAndOriginalLanguageApi,
  refinePSWithPromptApi,
} from "../../../api/caseAPI";
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
  const [isEnglishLoading, setIsEnglishLoading] = useState(false);
  const [isTranslatedLoading, setIsTranslatedLoading] = useState(false);
  const [showTranslatedArea, setShowTranslatedArea] = useState(false);
  const [value, setValue] = useState("");
  const [translatedValue, setTranslatedValue] = useState("");
  const [userOwnPS, setUserOwnPS] = useState("");
  const [showUserOwnPSInput, setShowUserOwnPSInput] = useState(false);
  const [promptInputValue, setPromptInputValue] = useState("");
  const [isAllPreviousSectionComplete, setIsAllPreviousSectionComplete] = useState(false);

  // Check if all sections before personal statement are 100% complete
  const checkIfPreviousSectionsComplete = () => {
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
        setShowTranslatedArea(true);
        const { englishPS, originalLanguagePS } = parseCombinedPersonalStatements(props.value);
        if (englishPS !== "" && originalLanguagePS !== "") {
          setValue(englishPS);
          setTranslatedValue(originalLanguagePS);
        } else {
          setShowTranslatedArea(false);
        }
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
    console.log("$$$$$$$$$$$$$$$$$$$$$$$CombinedPS:", combinedPS);
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

  const parseCombinedPersonalStatements = combinedPSString => {
    const combinedPS = JSON.parse(combinedPSString);
    const englishPS = combinedPS.personalStatements.find(
      ps => ps.language === LanguageEnum.ENGLISH.toUpperCase(),
    ).content;
    const originalLanguagePS = combinedPS.personalStatements.find(
      ps => ps.language === props.originLanguage.toUpperCase(),
    ).content;
    return { englishPS, originalLanguagePS };
  };

  const generatePersonalStatement = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setIsEnglishLoading(true);
      setIsTranslatedLoading(true);
      setShowTranslatedArea(true);
      console.log("ShowTranslatedArea:", showTranslatedArea);
      const refinedPS = await generatePSWithAIForCaseApi(accessToken, role, caseId, LanguageEnum.CHINESE.toUpperCase());
      console.log("RefinedPS:", refinedPS);
      setValue(refinedPS.englishPS);
      setTranslatedValue(refinedPS.originalLanguagePS);
      console.log("TranslatedValue:", translatedValue);
      setIsEnglishLoading(false);
      setIsTranslatedLoading(false);
      savePersonalStatement(refinedPS.englishPS, refinedPS.originalLanguagePS);
    } catch (error) {
      setIsEnglishLoading(false);
      message.error("Failed to generate personal statement. Please try again.");
    }
  };

  const refinePersonalStatement = async (prompt: string) => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setIsEnglishLoading(true);
      setIsTranslatedLoading(true);
      setShowTranslatedArea(true);
      const refinedPS = await refinePSWithPromptApi(
        accessToken,
        role,
        LanguageEnum.CHINESE.toUpperCase(),
        value,
        translatedValue,
        prompt,
      );
      setValue(refinedPS.englishPS);
      setTranslatedValue(refinedPS.originalLanguagePS);
      setIsEnglishLoading(false);
      setIsTranslatedLoading(false);
      savePersonalStatement(refinedPS.englishPS, refinedPS.originalLanguagePS);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  const translatePersonalStatement = async () => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setIsEnglishLoading(true);
      setIsTranslatedLoading(true);
      setShowTranslatedArea(true);
      const translatedPS = await translatePersonalStatementToEnglishAndOriginalLanguageApi(
        accessToken,
        role,
        caseId,
        userOwnPS,
        LanguageEnum.CHINESE.toUpperCase(),
      );
      setValue(translatedPS.englishPS);
      setTranslatedValue(translatedPS.originalLanguagePS);
      setIsEnglishLoading(false);
      setIsTranslatedLoading(false);
      savePersonalStatement(translatedPS.englishPS, translatedPS.originalLanguagePS);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  const handlePSInputPrompt = () => {
    if (promptInputValue.trim()) {
      refinePersonalStatement(promptInputValue);
      setPromptInputValue("");
      setMenuState({ openKeys: [], selectedKeys: [] });
    } else {
      console.log("Input is empty");
    }
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

  const psPromptInputRef = useRef<any>(null);
  const [menuState, setMenuState] = useState<{ openKeys: string[]; selectedKeys: string[] }>({
    openKeys: [],
    selectedKeys: [],
  });
  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = [
    {
      key: "sub1",
      icon: <AiIcon />,
      label: "",
      children: [
        {
          key: "sub1",
          disabled: true,
          label: (
            <div className="text-area-prompt-input-container">
              <span className="prefix-icon">
                <AskAi />
              </span>
              <TextArea
                ref={psPromptInputRef}
                className="text-area-prompt-input"
                placeholder="Ask AI to..."
                value={promptInputValue}
                onChange={e => setPromptInputValue(e.target.value)}
                autoSize={{ minRows: 1, maxRows: 10 }}
              />
              <span
                className="suffix-icon"
                onClick={() => {
                  handlePSInputPrompt();
                }}
              >
                <SendIcon />
              </span>
            </div>
          ),
        },
        {
          key: "sub2",
          label: "Refine with AI",
          type: "group",
          children: [
            { key: "AI Improve", label: "AI Improve", icon: <AiImprove /> },
            { key: "Make it shorter", label: "Make it shorter", icon: <AiMakeShorter /> },
            { key: "Make it longer", label: "Make it longer", icon: <AiMakeLonger /> },
            { key: "Fix spelling and grammar", label: "Fix spelling and grammar", icon: <AiFixGrammar /> },
          ],
        },
      ],
    },
  ];

  const onPromptClick: MenuProps["onClick"] = async e => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setMenuState({ openKeys: [], selectedKeys: [] });
      const prompt = e.key;
      await refinePersonalStatement(prompt);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  const onOpenChange = (keys: string[]) => {
    setMenuState(prev => ({ ...prev, openKeys: keys }));
  };

  return (
    <div>
      {showTranslatedArea ? (
        <div className="ps-text-area-container">
          <Menu
            className="text-area-AiMenu"
            openKeys={menuState.openKeys}
            selectedKeys={menuState.selectedKeys}
            onOpenChange={onOpenChange}
            onClick={onPromptClick}
            mode="inline"
            items={items}
          />
          <div className="ps-text-area">
            <div className="ps-text-area-after">
              <QText level="normal bold" margin="margin-5" color="gray">
                {t("EnglishVersion")}
              </QText>
              {isEnglishLoading ? (
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
              <QText level="normal bold" margin="margin-5" color="gray">
                {t("OriginalLanguageVersion")}
              </QText>
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
                  value={translatedValue}
                  onChange={e => onTextAreaChange(e, false)}
                  disabled={props.disabled || false}
                  variant="borderless"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="ps-text-area-container">
          {showUserOwnPSInput ? (
            <div className="ps-text-area-subtitle">
              <QText level="normal bold" margin="margin-5" color="gray">
                Add the personal statement you would like to use
              </QText>
              <TextArea
                className="ps-user-own-input"
                placeholder={props.placeholder}
                value={userOwnPS}
                onChange={e => setUserOwnPS(e.target.value)}
                variant="borderless"
              />
              <Button className="ps-user-own-button" type="text" onClick={translatePersonalStatement}>
                Continue
                <ArrowRightOutlined />
              </Button>
            </div>
          ) : (
            <div className="ps-select-cards">
              <Card className="ps-select-card" title="Generate with AI">
                Let our AI create a personalized statement based on your information.
                <Button className="ps-select-card-button" type="text" onClick={generatePersonalStatement}>
                  Continue
                  <ArrowRightOutlined />
                </Button>
              </Card>
              <Card className="ps-select-card" title="Use Your Own PS">
                Paste your own personal statement for editing and refinement.
                <Button className="ps-select-card-button" type="text" onClick={() => setShowUserOwnPSInput(true)}>
                  Continue
                  <ArrowRightOutlined />
                </Button>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
