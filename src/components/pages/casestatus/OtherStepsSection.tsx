import React from "react";
import { CheckCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import CaseProgressExpandedCard from "./CaseProgressExpandedCard";

interface OtherStepsSectionProps {
  currentStepDetails: any;
  expandedStep: string | null;
  handleToggleExpand: (stepName: string) => void;
  isLawyer: boolean;
  t: any;
  progress: any;
}

const OtherStepsSection: React.FC<OtherStepsSectionProps> = ({
  currentStepDetails,
  expandedStep,
  handleToggleExpand,
  isLawyer,
  t,
  progress,
}) => {
  return (
    <div className="progress-section">
      {currentStepDetails?.substeps.map((substep, index) => (
        <React.Fragment key={substep.name}>
          <div className="progress-item" onClick={() => handleToggleExpand(substep.name)}>
            <div className="icon-container">
              {substep.status === "COMPLETED" && <CheckCircleOutlined style={{ color: "#52C41A", fontSize: "20px" }} />}
              {substep.status === "IN_PROGRESS" && (
                <ExclamationCircleOutlined style={{ color: "#F2994A", fontSize: "20px" }} />
              )}
              {substep.status === "NOT_START" && <MinusCircleOutlined style={{ color: "#d9d9d9", fontSize: "20px" }} />}
            </div>
            <span className="progress-title">{t(substep.name)}</span>
          </div>
          {expandedStep === substep.name && (
            <div className="expanded-card-container">
              <div className="progress-line extended-line"></div>
              <div className="expanded-card">
                <CaseProgressExpandedCard
                  isLawyer={isLawyer}
                  substepName={substep.name}
                  substepMetadata={substep.metadata ? JSON.parse(substep.metadata) : null}
                  substepStatus={substep.status}
                  progressSteps={progress.steps}
                />
              </div>
            </div>
          )}
          {index < currentStepDetails.substeps.length - 1 && <div className="progress-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OtherStepsSection;
