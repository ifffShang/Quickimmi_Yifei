import { Button } from "antd";
import { QText } from "../../common/Fonts";
import { PlusCircleFilled } from "@ant-design/icons";
import "./AddItemControl.css";

export interface AddItemControlProps {
  onClick: () => void;
}
export function AddItemControl(props: AddItemControlProps) {
  return (
    <div className="add-item">
      <Button
        className="add-item-btn"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={e => props.onClick()}
      />
      <QText>{"If no item, move forward to next section"}</QText>
    </div>
  );
}
