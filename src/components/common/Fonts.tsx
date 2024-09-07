import { ChildrenOnlyProps } from "../../model/commonModels";
import "./Fonts.css";

export function ErrorMessage({ children }: ChildrenOnlyProps) {
  return <div className="error-message">{children}</div>;
}

export interface TextProps {
  children: string | JSX.Element | React.ReactNode;
  level?:
    | "xlarge"
    | "large"
    | "medium"
    | "normal"
    | "normal bold"
    | "small"
    | "xsmall"
    | "upload"
    | "field-label"
    | "placeholder";
  color?: "primary" | "secondary" | "gray" | "dark" | "danger" | "warning" | "inherit";
  margin?: "margin-bottom-20" | "margin-bottom-10" | "margin-5";
  noWrap?: boolean;
}

/**
 * Quickimmi style text component
 * @param props
 * @returns
 */
export function QText(props: TextProps) {
  const textClass = `text ${props.level || "normal"} ${props.color || "inherit"} ${props.margin || ""} ${props.noWrap ? "no-wrap" : ""}`;
  return <div className={textClass}>{props.children}</div>;
}

export interface SingleLineProps {
  title: string;
  value: string;
}

export function SingleLine(props: SingleLineProps) {
  return (
    <div className="single-line-text">
      <QText level="normal bold">{props.title}</QText>
      <QText level="normal" color="gray">
        {props.value}
      </QText>
    </div>
  );
}

export function QTag({ children }: ChildrenOnlyProps) {
  return <div className="qtag">{children}</div>;
}
