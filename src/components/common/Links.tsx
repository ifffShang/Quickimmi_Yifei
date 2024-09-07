import Link from "antd/es/typography/Link";
import { LeftOutlined } from "@ant-design/icons";
import "./Links.css";

export interface QLinkProps {
  onClick?: () => void;
  children: React.ReactNode;
  color?: "white";
  disabled?: boolean;
}

/**
 * Quickimmi styled link
 * @returns
 */
export function QLink(props: QLinkProps) {
  return (
    <Link className={`qlink ${props.color || ""}`} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </Link>
  );
}

export interface QReturnLinkProps {
  text: React.ReactNode | string;
  onClick?: () => void;
  margin?: string;
  padding?: string;
}

export function QReturnLink(props: QReturnLinkProps) {
  return (
    <div className="qlink-return-container" style={{ margin: props.margin || "", padding: props.padding || "" }}>
      <QLink onClick={props.onClick}>
        <div className="qlink-return">
          <LeftOutlined />
          {props.text}
        </div>
      </QLink>
    </div>
  );
}
