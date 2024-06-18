import React, { useState } from "react";
import { Card, Steps, Button } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { CaseSummary } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import "./CaseProgressCard.css";

interface CaseProgressCardProps {
  caseSummary: CaseSummary;
}

const { Step } = Steps;

function getCurrentStepIndex(currentStep: string, steps: { name: string }[]) {
  return steps.findIndex(step => step.name === currentStep);
}

const CaseProgressCard: React.FC<CaseProgressCardProps> = ({ caseSummary }) => {
  const { t } = useTranslation();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const { currentStep, progress } = caseSummary;

  const currentStepIndex = getCurrentStepIndex(
    caseSummary.currentStep,
    caseSummary.progress.steps,
  );

  const currentStepDetails = progress.steps.find(
    step => step.name === currentStep,
  );

  const handleToggleExpand = (stepName: string) => {
    setExpandedStep(expandedStep === stepName ? null : stepName);
  };

  return (
    <Card title={t("CaseProgressTitle")}>
      <Steps current={currentStepIndex}>
        {caseSummary.progress.steps.map(step => (
          <Step key={step.name} title={t(step.name)} />
        ))}
      </Steps>
      <Card style={{ marginTop: "16px", border: "none", boxShadow: "none" }}>
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
                    <Card>
                      <p>TODO: This is sub step information card</p>
                      <Button type="default">{t("Review")}</Button>
                    </Card>
                  </div>
                </div>
              )}
              {index < currentStepDetails.substeps.length - 1 && (
                <div className="progress-line"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </Card>
    // TODO: this page is not scrollable
  );
};

export default CaseProgressCard;
