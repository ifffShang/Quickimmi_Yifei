import { QText } from "../../common/Fonts";
import { LoadingOutlined } from "@ant-design/icons";

export interface StatusProps {
  status: string;
}
export function Status({ status }: StatusProps) {
  if (status === "Success" || status === "uploaded") {
    return <QText level="xsmall">Success</QText>;
  } else if (status === "In Progress" || status === "uploading") {
    return (
      <QText level="xsmall" color="primary">
        In Progress <LoadingOutlined />
      </QText>
    );
  } else if (status === "Failed") {
    return (
      <QText level="xsmall" color="danger">
        Failed
      </QText>
    );
  } else {
    return <div>Unknown</div>;
  }
}
