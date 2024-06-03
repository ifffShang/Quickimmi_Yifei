import { Button } from "antd";
import { QText } from "../../common/Fonts";
import { PlusCircleFilled } from "@ant-design/icons";
import "./AddItemControl.css";

export interface AddItemControlProps {
  placeholder: string;
  onClick: () => void;
  className?: string;
}
export function AddItemControl(props: AddItemControlProps) {
  return (
    <div
      className={"add-item" + (props.className ? " " + props.className : "")}
    >
      <Button
        className="add-item-btn"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={e => props.onClick()}
      >
        <QText>{props.placeholder}</QText>
      </Button>
    </div>
  );
}
