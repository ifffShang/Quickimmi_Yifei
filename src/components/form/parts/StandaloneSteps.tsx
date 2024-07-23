import { RightOutlined } from "@ant-design/icons";
import { CollapseProps } from "antd/es/collapse";
import "./StandaloneSteps.css";

export interface StandaloneStepsProps {
  steps: CollapseProps["items"];
}

export function StandaloneSteps(props: StandaloneStepsProps) {
  return (
    <div className="standalone-steps">
      {props.steps?.map((step, index) => (
        <div className="standalone-step" key={index}>
          {step.children}
        </div>
      ))}
    </div>
  );
}
