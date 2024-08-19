import { Spin } from "antd";
import "./Loading.css";

export interface LoadingProps {
  text?: string;
  size?: "small" | "default" | "large";
}

/**
 * Quickimmi Loading component
 * @param props
 * @returns
 */
export function Loading(props: LoadingProps) {
  return (
    <div className="loading">
      <Spin size={props.size || "default"} />
      <p>{props.text || ""}</p>
    </div>
  );
}

export function CentralizedLoading(props: LoadingProps) {
  return (
    <div className="loading centralized-loading">
      <Spin />
      <p>{props.text || ""}</p>
    </div>
  );
}
