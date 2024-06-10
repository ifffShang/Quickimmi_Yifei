import { Button } from "antd";
import { QText } from "../../common/Fonts";
import { DeleteOutlined } from "@ant-design/icons";
import "./RemovableSectionHeader.css";

export interface IRemovableSectionHeaderProps {
  label: string;
  fieldIndex: number;
  onRemove: (index: number) => void;
}

export function RemovableSectionHeader(props: IRemovableSectionHeaderProps) {
  return (
    <div className="removable-section-header">
      <QText level="large">{props.label + " " + (props.fieldIndex + 1)}</QText>
      <Button
        type="dashed"
        danger
        onClick={() => props.onRemove(props.fieldIndex)}
        icon={<DeleteOutlined />}
      ></Button>
    </div>
  );
}
