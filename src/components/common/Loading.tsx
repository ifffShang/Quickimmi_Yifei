import { Spin } from "antd";
import "./Loading.css";

export interface LoadingProps {
  text?: string;
}

/**
 * Quickimmi Loading component
 * @param props
 * @returns
 */
export function Loading(props: LoadingProps) {
  return (
    <div className="loading">
      <Spin />
      <p>{props.text || ""}</p>
    </div>
  );
}
