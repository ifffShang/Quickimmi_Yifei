import { ChildrenOnlyProps } from "../../model/Models";
import "./Fonts.css";

export function ErrorMessage({ children }: ChildrenOnlyProps) {
  return <div className="error-message">{children}</div>;
}

export interface TextProps {
  children: string | JSX.Element;
  level?: "large" | "normal" | "small";
  color?: "primary" | "secondary" | "gray";
}

export function Text(props: TextProps) {
  const textClass = `text ${props.level || "normal"} ${props.color || "primary"}`;
  return <div className={textClass}>{props.children}</div>;
}
