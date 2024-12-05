import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { QTextBox } from "./Controls";
import "./MultipleNamesWithNA.css";
import { TextboxWithNA } from "./TextboxWithNA";

export interface MultipleNamesWithNAProps {
  placeholder: string;
  value: any;
  onChange: (nameList: NameObject[]) => void;
  notApplicableText: string;
}

interface NameObject {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export function MultipleNamesWithNA(props: MultipleNamesWithNAProps) {
  const { t } = useFormTranslation();
  const [nameList, setNameList] = useState<NameObject[]>(
    props.value.map((name: any, index: number) => ({
      id: index,
      firstName: name.firstName,
      middleName: name.middleName,
      lastName: name.lastName,
    })),
  );

  const newId = Number.isInteger(nameList.length)
    ? nameList.length === 0
      ? 0
      : nameList[nameList.length - 1].id + 1
    : 0;

  return (
    <div className="textboxes-na">
      {nameList.map(nameObject => (
        <div className="textboxes-na-text" key={nameObject.id}>
          <QTextBox
            placeholder={t("FirstName")}
            value={nameObject.firstName}
            onChange={(value: string) => {
              const newNameList = nameList.map(item =>
                item.id === nameObject.id ? { ...item, firstName: value || "" } : item,
              );
              setNameList(newNameList);
              props.onChange(newNameList);
              return value || "";
            }}
          />
          <TextboxWithNA
            notApplicableText={"N/A"}
            placeholder={t("MiddleName")}
            value={nameObject.middleName}
            onChange={(value: string) => {
              const newNameList = nameList.map(item =>
                item.id === nameObject.id ? { ...item, middleName: value || "" } : item,
              );
              setNameList(newNameList);
              props.onChange(newNameList);
              return value || "";
            }}
          />
          <QTextBox
            placeholder={t("LastName")}
            value={nameObject.lastName}
            onChange={(value: string) => {
              const newNameList = nameList.map(item =>
                item.id === nameObject.id ? { ...item, lastName: value || "" } : item,
              );
              setNameList(newNameList);
              props.onChange(newNameList);
              return value || "";
            }}
          />
          <Button
            className="textboxes-na-btn"
            shape="circle"
            icon={<MinusCircleFilled />}
            onClick={() => {
              if (!Number.isInteger(nameObject.id)) {
                setNameList([]);
                props.onChange([]);
                return;
              }
              const newNameList = nameList.filter(n => n.id !== nameObject.id);
              setNameList(newNameList);
              props.onChange(newNameList);
            }}
          />
        </div>
      ))}
      <Button
        className="textboxes-na-btn"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={() => {
          const newNameList = [...nameList, { id: newId, firstName: "", middleName: "", lastName: "" }];
          setNameList(newNameList);
          props.onChange(newNameList);
        }}
      >
        {props.placeholder}
      </Button>
    </div>
  );
}
