import React, { useState, useEffect } from "react";
import { Card, Steps } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import "./CaseProgressCard.css";
import ProgressSection from "./ProgressSection";

interface CaseProgressCardProps {
  caseSummary: CaseSummary;
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

const CaseProgressCard: React.FC<CaseProgressCardProps> = ({ caseSummary }) => {
  const { t } = useTranslation();
  const { currentStep, progress } = caseSummary;

  const currentStepIndex = getCurrentStepIndex(caseSummary.currentStep, caseSummary.progress.steps);

  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedStep) {
      const inProgressStep = findFirstInProgressSubstep(progress.steps);
      setExpandedStep(inProgressStep);
    }
  }, [expandedStep, progress.steps]);

  return (
    <Card title={t("CaseProgressTitle")}>
      <Steps current={currentStepIndex}>
        {caseSummary.progress.steps.map(step => (
          <Step key={step.name} title={t(step.name)} />
        ))}
      </Steps>
      <Card style={{ border: "none", boxShadow: "none" }}>
        <ProgressSection
          currentStep={currentStep}
          progress={progress}
          expandedStep={expandedStep}
          setExpandedStep={setExpandedStep}
        />
      </Card>
    </Card>
  );
};

export default CaseProgressCard;
