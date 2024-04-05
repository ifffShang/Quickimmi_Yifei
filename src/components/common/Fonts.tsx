import { ChildrenOnlyProps } from "../../model/Models";
import "./Fonts.css";

export function ErrorMessage({ children }: ChildrenOnlyProps) {
  return <div className="error-message">{children}</div>;
}

export interface TextProps {
  children: string | JSX.Element | React.ReactNode;
  level?: "large" | "normal" | "normal bold" | "small";
  color?: "primary" | "secondary" | "gray";
  margin?: "margin-bottom-10";
}

/**
 * Quickimmi style text component
 * @param props
 * @returns
 */
export function QText(props: TextProps) {
  const textClass = `text ${props.level || "normal"} ${props.color || "primary"} ${props.margin || ""}`;
  return <div className={textClass}>{props.children}</div>;
}
