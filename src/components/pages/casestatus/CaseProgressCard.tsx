import React, { useState, useEffect } from "react";
import { Card, Steps } from "antd";
import { CaseSummary, QStep } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import { CollectInfoIcon, ReviewIcon, SubmitIcon, FingerPrintIcon, ResultIcon } from "../../icons/CaseProgressCard";
import { getProgressColor } from "../../../utils/caseStatusUtils";
import "./CaseProgressCard.css";
import ProgressSection from "./ProgressSection";
import { QText } from "../../common/Fonts";
import { CaretUpOutlined } from "@ant-design/icons";

interface CaseProgressCardProps {
  caseSummary: CaseSummary;
  onCaseSummaryUpdate: () => void;
}

const { Step } = Steps;

function getCurrentStepIndex(currentStep: string, steps: { name: string }[]) {
  return steps.findIndex(step => step.name === currentStep);
}

function findFirstInProgressSubstep(steps: { substeps: { name: string; status: string }[] }[]) {
  for (const step of steps) {
    for (const substep of step.substeps) {
      if (substep.status === "NOT_START" || substep.status === "IN_PROGRESS") {
        return substep.name;
      }
    }
  }
  return null;
}

const CaseProgressCard: React.FC<CaseProgressCardProps> = ({ caseSummary, onCaseSummaryUpdate }) => {
  const { t } = useTranslation();
  const { progress } = caseSummary;
  const currentStep = caseSummary.currentStep;
  const currentStepIndex = getCurrentStepIndex(caseSummary.currentStep, progress.steps);

  const [activeStep, setActiveStep] = useState(currentStep);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  useEffect(() => {
    if (!progress || !progress.steps) {
      console.error("Progress is missing.");
      return;
    }
    if (!expandedStep) {
      const inProgressStep = findFirstInProgressSubstep(progress.steps);
      setExpandedStep(inProgressStep);
    }
  }, [progress?.steps, caseSummary.currentStep]);

  if (!progress || !progress.steps) {
    return null;
  }

  const onStepClick = (step: QStep) => {
    setActiveStep(step.name);
  };

  const icons = progress.steps.map((step, index) => {
    const color = getProgressColor(step.status);
    switch (index) {
      case 0:
        return <CollectInfoIcon key="collect" color={color} />;
      case 1:
        return <ReviewIcon key="review" color={color} />;
      case 2:
        return <SubmitIcon key="submit" color={color} />;
      case 3:
        return <FingerPrintIcon key="fingerprint" color={color} />;
      case 4:
        return <ResultIcon key="result" color={color} />;
      default:
        return null;
    }
  });

  const getStepText = (step: QStep) => {
    const isBold = step.name === currentStep;
    const color = getProgressColor(step.status);
    return (
      <QText colorHex={color} level={isBold ? "normal bold" : "normal"}>
        {t(step.name)}
      </QText>
    );
  };

  return (
    <Card
      title={
        <div className="progress-card-header">
          <QText level="large">{t("CaseProgressTitle")}</QText>
        </div>
      }
    >
      <Steps className="progress-card-steps" current={currentStepIndex} labelPlacement="vertical">
        {progress.steps.map((step, index) => (
          <Step
            className="progress-card-step"
            key={step.name}
            title={getStepText(step)}
            description={
              step.name === activeStep ? (
                <div className="active-step-indicator">
                  <CaretUpOutlined />
                </div>
              ) : null
            }
            icon={icons[index]}
            onClick={() => onStepClick(step)}
          />
        ))}
      </Steps>
      <ProgressSection
        currentStep={activeStep}
        progress={progress}
        expandedStep={expandedStep}
        setExpandedStep={setExpandedStep}
        onCaseSummaryUpdate={onCaseSummaryUpdate}
      />
    </Card>
  );
};

export default CaseProgressCard;
