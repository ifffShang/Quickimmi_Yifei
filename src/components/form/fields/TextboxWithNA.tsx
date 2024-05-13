import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { QTextBox } from "./Controls";
import "./TextboxWithNA.css";

export interface TextBoxWithNAProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => string;
}

interface TextBoxList {
  id: number;
  value: string;
}

export function TextboxWithNA(props: TextBoxWithNAProps) {
  const prefillTexts = props.value
    ? props.value.split(", ").map((value, index) => ({
        id: index,
        value,
      }))
    : [];
  const [textboxList, setTextboxList] = useState<TextBoxList[]>(prefillTexts);
  const newId =
    textboxList.length === 0 ? 0 : textboxList[textboxList.length - 1].id + 1;

  return (
    <div className="textbox-na">
      {textboxList.map(textbox => (
        <div className="textbox-na-text" key={textbox.id}>
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
            className="textbox-na-btn"
            shape="circle"
            icon={<MinusCircleFilled />}
            onClick={() =>
              setTextboxList([...textboxList.filter(t => t.id !== textbox.id)])
            }
          />
        </div>
      ))}
      <Button
        className="textbox-na-btn"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={() =>
          setTextboxList([...textboxList, { id: newId, value: "" }])
        }
      >
        {props.placeholder}
      </Button>
    </div>
  );
}
