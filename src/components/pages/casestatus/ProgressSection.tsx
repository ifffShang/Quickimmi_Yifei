import React from "react";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import CaseProgressExpandedCard from "./CaseProgressExpandedCard";
import { useAppSelector } from "../../../app/hooks";
import { CaseSummary } from "../../../model/apiModels";
import "./ProgressSection.css";

interface ProgressSectionProps {
  currentStep: string;
  progress: CaseSummary["progress"];
  expandedStep: string | null;
  setExpandedStep: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  currentStep,
  progress,
  expandedStep,
  setExpandedStep,
}) => {
  const { t } = useTranslation();
  const isLawyer = useAppSelector(state => state.auth.isLawyer);

  const handleToggleExpand = (stepName: string) => {
    setExpandedStep(prevStep => (prevStep === stepName ? null : stepName));
  };

  const currentStepDetails = progress.steps.find(
    step => step.name === currentStep,
  );

  if (currentStep === "FILLING_APPLICATION") {
    return (
      <div className="placeholder-section">
        <h2>{t("Filling Application Placeholder")}</h2>
        <p>{t("Content for FILLING_APPLICATION will be here.")}</p>
      </div>
    );
  }

  return (
    <div className="progress-section">
      {currentStepDetails?.substeps.map((substep, index) => (
        <React.Fragment key={substep.name}>
          <div
            className="progress-item"
            onClick={() => handleToggleExpand(substep.name)}
          >
            <div className="icon-container">
              {substep.status === "COMPLETED" && (
                <CheckCircleOutlined
                  style={{ color: "#52C41A", fontSize: "20px" }}
                />
              )}
              {substep.status === "IN_PROGRESS" && (
                <ExclamationCircleOutlined
                  style={{ color: "#FAAD14", fontSize: "20px" }}
                />
              )}
              {substep.status === "NOT_START" && (
                <MinusCircleOutlined
                  style={{ color: "#d9d9d9", fontSize: "20px" }}
                />
              )}
            </div>
            <span className="progress-title">{t(substep.name)}</span>
          </div>
          {expandedStep === substep.name && (
            <div className="expanded-card-container">
              <div className="progress-line extended-line"></div>
              <div className="expanded-card">
                <CaseProgressExpandedCard
                  isLawyer={isLawyer}
                  currentStep={currentStep}
                  substepName={substep.name}
                  substepMetadata={substep.metadata}
                  substepStatus={substep.status}
                  progressSteps={progress.steps}
                />
              </div>
            </div>
          )}
          {index < currentStepDetails.substeps.length - 1 && (
            <div className="progress-line"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSection;
