import { Button } from "antd";
import { QText } from "../../common/Fonts";
import { PlusCircleFilled } from "@ant-design/icons";
import "./AddChildControl.css";

export interface AddChildControlProps {
  onClick: () => void;
}
export function AddChildControl(props: AddChildControlProps) {
  return (
    <div className="add-child">
      <Button
        className="add-child-btn"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={e => props.onClick()}
      />
      <QText>{"If no child, move forward to next section"}</QText>
    </div>
  );
}
