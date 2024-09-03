import { Button } from "antd";
import { QText } from "../../common/Fonts";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./SectionHeader.css";

export interface ISectionHeaderProps {
  label: string;
  fieldIndex: number;
  onRemove: (index: number) => void;
  onEdit?: (index: number) => void;
}

export function SectionHeader(props: ISectionHeaderProps) {
  return (
    <div className="section-header">
      <QText level="large">{props.label + " " + (props.fieldIndex + 1)}</QText>
      <div className="section-header-control">
        <Button type="dashed" danger onClick={() => props.onRemove(props.fieldIndex)} icon={<DeleteOutlined />} />
        {props.onEdit && (
          <Button type="dashed" onClick={() => props.onEdit!(props.fieldIndex)} icon={<EditOutlined />} />
        )}
      </div>
    </div>
  );
}
