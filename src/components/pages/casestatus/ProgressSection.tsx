import React from "react";
import {
  CheckCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
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

  const renderIconForFillingApplication = (percentage: number) => {
    if (percentage === 100) {
      return (
        <CheckCircleOutlined style={{ color: "#52C41A", fontSize: "20px" }} />
      );
    } else {
      return (
        <ExclamationCircleOutlined
          style={{ color: "#FAAD14", fontSize: "20px" }}
        />
      );
    }
  };

  const renderPercentageTag = (percentage: number) => {
    return <Tag className="custom-percentage-tag">{`${percentage}%`}</Tag>;
  };

  const renderProgressItem = (
    title: string,
    percentage: number,
    stepName: string,
  ) => (
    <div className="progress-item" key={stepName}>
      <div className="icon-container">
        {renderIconForFillingApplication(percentage)}
      </div>
      <span className="progress-title">
        {t(title)}
        {renderPercentageTag(percentage)}
      </span>
      {percentage < 100 && (
        <span className="go-complete">{t("Go Complete")}</span>
      )}
      <span
        className="expand-icon"
        onClick={() => handleToggleExpand(stepName)}
      >
        {expandedStep === stepName ? (
          <UpOutlined style={{ color: "black" }} />
        ) : (
          <DownOutlined style={{ color: "black" }} />
        )}
      </span>
    </div>
  );

  if (currentStep === "FILLING_APPLICATION") {
    const fillingDetailsSubstep = currentStepDetails?.substeps.find(
      substep => substep.name === "FILLING_DETAILS",
    );

    let metadata;
    if (fillingDetailsSubstep && fillingDetailsSubstep.metadata) {
      metadata = JSON.parse(fillingDetailsSubstep.metadata);
    }

    const metadataFields = [
      { field: "personal_information", title: "PersonalInformation" },
      { field: "family_information", title: "FamilyInformation" },
      { field: "background_information", title: "BackgroundInformation" },
      { field: "application_information", title: "ApplicationInformation" },
    ];

    return (
      <div className="placeholder-section">
        <h2>
          {t("Please provide complete and accurate application information")}:
        </h2>
        {metadata && (
          <div className="filling-details">
            {metadataFields.map(({ field, title }, index) => (
              <React.Fragment key={field}>
                {renderProgressItem(
                  title,
                  metadata.percentage[field].avg,
                  field.toUpperCase(),
                )}
                {expandedStep === field.toUpperCase() && (
                  <div className="expanded-card-container">
                    <div className="progress-line extended-line"></div>
                    <div className="expanded-card">
                      <span>Placeholder</span>
                    </div>
                  </div>
                )}
                {index < metadataFields.length - 1 && (
                  <div className="expanded-card-container">
                    <div className="progress-line"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="progress-section">
      {currentStepDetails?.substeps.map((substep, index) => (
        <React.Fragment key={substep.name}>
          <div className="progress-item">
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
