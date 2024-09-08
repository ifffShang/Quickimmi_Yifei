import React, { useState, useEffect } from "react";
import { Card, Steps } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import { CollectInfoIcon, ReviewIcon, SubmitIcon, FingerPrintIcon, ResultIcon } from "../../icons/CaseProgressCard";
import { getProgressColor } from "../../../utils/caseStatusUtils";
import "./CaseProgressCard.css";
import ProgressSection from "./ProgressSection";
import { QText } from "../../common/Fonts";

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

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(caseSummary.currentStep);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedStep) {
      const inProgressStep = findFirstInProgressSubstep(progress.steps);
      setExpandedStep(inProgressStep);
    }
    const stepIndex = getCurrentStepIndex(caseSummary.currentStep, progress.steps);
    setCurrentStepIndex(stepIndex);
  }, [progress.steps, caseSummary.currentStep]);

  const onStepChange = (value: number) => {
    setCurrentStepIndex(value);
    setCurrentStep(progress.steps[value].name);
    console.log(`***********Current value is ${value}`);
    console.log(`***********Step changed to ${progress.steps[value].name}`);
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

  return (
    <Card
      title={
        <div className="progress-card-header">
          <QText level="large">{t("CaseProgressTitle")}</QText>
        </div>
      }
    >
      <Steps
        className="progress-card-steps"
        current={currentStepIndex}
        onChange={onStepChange}
        labelPlacement="vertical"
      >
        {progress.steps.map((step, index) => (
          <Step key={step.name} title={<QText level="normal">{t(step.name)}</QText>} icon={icons[index]} />
        ))}
      </Steps>
      <ProgressSection
        currentStep={currentStep}
        progress={progress}
        expandedStep={expandedStep}
        setExpandedStep={setExpandedStep}
        onCaseSummaryUpdate={onCaseSummaryUpdate}
      />
    </Card>
  );
};

export default CaseProgressCard;
