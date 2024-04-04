import Link from "antd/es/typography/Link";
import "./Links.css";

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
