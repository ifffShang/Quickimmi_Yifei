import { QText } from "../../common/Fonts";
import { LoadingOutlined } from "@ant-design/icons";

export interface StatusProps {
  status: string;
}

export function Status({ status }: StatusProps) {
  if (status === "Success" || status === "uploaded") {
    return <QText level="xsmall">Success</QText>;
  } else if (status === "In Progress" || status === "uploading" || status == "in_progress") {
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
  } else if (status === "Skipped") {
    return (
      <QText level="xsmall" color="gray">
        Skipped
      </QText>
    );
  } else if (status === "Timeout") {
    return (
      <QText level="xsmall" color="gray">
        Timeout
      </QText>
    );
  } else if (status === "Replaced") {
    return (
      <QText level="xsmall" color="warning">
        Replaced
      </QText>
    );
  } else {
    return <QText level="xsmall">Unknown</QText>;
  }
}
