import { QText } from "../../common/Fonts";
import type { GetProps, MenuProps } from "antd";
import Icon, { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Spin, Menu, Card } from "antd";
import { refineApi, refineWithPromptApi } from "../../../api/utilsAPI";
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
import "./TextAreaWithAIRefine.css";

export interface TextAreaWithAIRefineProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => string;
  fieldKey?: string;
  caseId?: number;
}

export function TextAreaWithAIRefine(props: TextAreaWithAIRefineProps) {
  const { t } = useTranslation();
  const role = useAppSelector(state => state.auth.role);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [textAreaValue, setTextAreaValue] = useState(props.value);
  const [refineAreaValue, setRefineAreaValue] = useState("");
  const [showRefineArea, setShowRefineArea] = useState(false);
  const [isTextAreaEmpty, setIsTextAreaEmpty] = useState(!props.value);
  const [currentText, setCurrentText] = useState(props.value);
  const [tips, setTips] = useState<string[]>([]);
  const inputRef = useRef<InputRef>(null);
  const promptInputRef = useRef<any>(null);
  const fieldkey = props.fieldKey;
  const label = props.label.split("_")[1];

  useEffect(() => {
    setIsTextAreaEmpty(!props.value);
  }, [props.value]);

  const handleRefineAreaChange = (value: string) => {
    if (value === "") {
      discardRefinedText();
    } else {
      setRefineAreaValue(value);
    }
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const cursorPosition = e.target.selectionStart;
    const value = props.onChange(e.target.value);
    setTextAreaValue(value);
    setIsTextAreaEmpty(!value);
    console.log("Is text area empty: ", isTextAreaEmpty);
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
    setIsTextAreaEmpty(!refineAreaValue);
  };

  const discardRefinedText = () => {
    setShowRefineArea(false);
    setRefineAreaValue("");
  };

  const refineText = async (prompt: string) => {
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }
    try {
      setRefineAreaValue("");
      setShowRefineArea(true);
      const refinedText = await refineWithPromptApi(accessToken, role, "statement", label, props.value, prompt);
      setRefineAreaValue(refinedText.result);
      setCurrentText(refinedText.result);
      setTips(refinedText.tips);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  const handleOriginalClick = () => {
    setCurrentText(textAreaValue);
  };
  const handleImprovedClick = () => {
    setCurrentText(refineAreaValue);
  };
  const handleInputPrompt = () => {
    if (promptInputRef.current?.resizableTextArea?.textArea) {
      const inputValue = promptInputRef.current.resizableTextArea.textArea.value.trim();
      console.log("Input Value:", inputValue);
      if (inputValue) {
        refineText(inputValue);
        promptInputRef.current.resizableTextArea.textArea.value = "";
        setMenuState({ openKeys: [], selectedKeys: [] });
        setTipHidden(false);
      } else {
        console.log("Input is empty");
      }
    } else {
      console.log("Input ref not correctly set");
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

  const [menuState, setMenuState] = useState<{ openKeys: string[]; selectedKeys: string[] }>({
    openKeys: [],
    selectedKeys: [],
  });
  const [tipHidden, setTipHidden] = useState(false);

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
                ref={promptInputRef}
                className="text-area-prompt-input"
                placeholder="Ask AI to..."
                autoSize={{ minRows: 1, maxRows: 10 }}
                // onPressEnter={(e) => {
                //   e.stopPropagation();
                //   console.log("Enter pressed");
                //   handleInputPrompt();
                // }}
              />
              <span
                className="suffix-icon"
                onClick={() => {
                  console.log("Send icon clicked");
                  handleInputPrompt();
                }}
                style={{ cursor: "pointer" }}
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
            { key: "Translate into English", label: "Translate into English", icon: <AiTranslate /> },
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
      setTipHidden(false);
      const prompt = e.key;
      await refineText(prompt);
    } catch (error) {
      console.error("Failed to refine text:", error);
    }
  };

  const onOpenChange = (keys: string[]) => {
    setMenuState(prev => ({ ...prev, openKeys: keys }));
  };

  return (
    <div>
      {showRefineArea ? (
        <div className="text-area-container">
          <div className="text-area-after">
            <div className="text-area-switch-group">
              <Button
                onClick={handleOriginalClick}
                className={`text-area-switch ${currentText === textAreaValue ? "selected" : ""}`}
                type="link"
              >
                Original
              </Button>
              <Button
                onClick={handleImprovedClick}
                className={`text-area-switch border ${currentText === refineAreaValue ? "selected" : ""}`}
                type="link"
              >
                Improved
              </Button>
              <Button
                type="primary"
                onClick={replaceWithRefinedText}
                className="text-area-btn"
                icon={<CheckOutlined />}
              >
                {t("Use")}
              </Button>
              <Menu
                className="text-area-AiMenu"
                openKeys={menuState.openKeys}
                selectedKeys={menuState.selectedKeys}
                onOpenChange={onOpenChange}
                onClick={onPromptClick}
                mode="inline"
                items={items}
              />
            </div>
            {refineAreaValue ? (
              <div className="text-area-refined">
                <TextArea
                  ref={inputRef}
                  className={"text-area-input"}
                  placeholder={props.placeholder}
                  value={currentText}
                  onChange={onTextAreaChange}
                  variant="borderless"
                />
                <Card
                  title={
                    <>
                      <TipsIcon /> Tips
                    </>
                  }
                  className={`text-area-tips ${tipHidden ? "hidden" : ""}`}
                  extra={<CloseOutlined onClick={() => setTipHidden(true)} />}
                >
                  {tips.map((tip, index) => (
                    <>
                      <QText level="xsmall" key={index}>
                        {tip}
                      </QText>
                      <br />
                    </>
                  ))}
                </Card>
              </div>
            ) : (
              <Spin tip="Rewriting">{content}</Spin>
            )}
          </div>
        </div>
      ) : (
        <div className="text-area-container">
          <div className="text-area-before">
            <Menu
              className="text-area-AiMenu"
              openKeys={menuState.openKeys}
              selectedKeys={menuState.selectedKeys}
              onOpenChange={onOpenChange}
              onClick={onPromptClick}
              mode="inline"
              items={items}
            />
            <TextArea
              ref={inputRef}
              className="text-area-input"
              placeholder={props.placeholder}
              value={textAreaValue}
              onChange={onTextAreaChange}
              variant="borderless"
            />
          </div>
        </div>
      )}
    </div>
  );
}
