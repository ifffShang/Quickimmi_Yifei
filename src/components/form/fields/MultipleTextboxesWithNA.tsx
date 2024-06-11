import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { PureCheckBox, QTextBox } from "./Controls";
import "./MultipleTextboxesWithNA.css";

export interface MultipleTextboxesWithNAProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => string;
  notApplicableText: string;
}

interface TextBoxList {
  id: number;
  value: string;
}

export function MultipleTextboxesWithNA(props: MultipleTextboxesWithNAProps) {
  const prefillTexts = props.value
    ? props.value !== "N/A"
      ? props.value.split(", ").map((value, index) => ({
          id: index,
          value,
        }))
      : []
    : [];
  const isNA = props.value === "N/A";
  const [buttonDisabled, setButtonDisabled] = useState(isNA);
  const [textboxList, setTextboxList] = useState<TextBoxList[]>(prefillTexts);
  const newId =
    textboxList.length === 0 ? 0 : textboxList[textboxList.length - 1].id + 1;

  useEffect(() => {
    if (isNA) {
      setButtonDisabled(true);
      setTextboxList([]);
    } else {
      setButtonDisabled(false);
    }
  }, [isNA]);

  return (
    <div className="textboxes-na">
      {textboxList.map(textbox => (
        <div className="textboxes-na-text" key={textbox.id}>
          <QTextBox
            placeholder={""}
            value={textbox.value}
            onChange={(value: string) => {
              const newTextboxList = [...textboxList];
              newTextboxList[textbox.id].value = value || "";
              setTextboxList(newTextboxList);
              props.onChange(newTextboxList.map(t => t.value).join(", "));
              return value || "";
            }}
          />
          <Button
            className="textboxes-na-btn"
            shape="circle"
            icon={<MinusCircleFilled />}
            onClick={() =>
              setTextboxList([...textboxList.filter(t => t.id !== textbox.id)])
            }
          />
        </div>
      ))}
      <Button
        className="textboxes-na-btn"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={() =>
          setTextboxList([...textboxList, { id: newId, value: "" }])
        }
        disabled={buttonDisabled}
      >
        {props.placeholder}
      </Button>
      <PureCheckBox
        checked={isNA}
        label={props.notApplicableText}
        onChange={(value: boolean) => {
          if (value) {
            setButtonDisabled(true);
            setTextboxList([]);
            props.onChange("N/A");
          } else {
            setButtonDisabled(false);
            setTextboxList([]);
            props.onChange("");
          }
          return value;
        }}
      />
    </div>
  );
}
