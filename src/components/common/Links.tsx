import Link from "antd/es/typography/Link";
import { LeftOutlined } from "@ant-design/icons";
import "./Links.css";
import { QText } from "./Fonts";

export interface QLinkProps {
  onClick?: () => void;
  children: React.ReactNode;
  color?: "white";
}

/**
 * Quickimmi styled link
 * @returns
 */
export function QLink(props: QLinkProps) {
  return (
    <Link className={`qlink ${props.color || ""}`} onClick={props.onClick}>
      {props.children}
    </Link>
  );
}

export interface QReturnLinkProps {
  text: React.ReactNode | string;
  onClick?: () => void;
  margin?: string;
}

export function QReturnLink(props: QReturnLinkProps) {
  return (
    <div
      className="qlink-return-container"
      style={{ margin: props.margin || "" }}
    >
      <QLink onClick={props.onClick}>
        <div className="qlink-return">
          <LeftOutlined />
          {props.text}
        </div>
      </QLink>
    </div>
  );
}
