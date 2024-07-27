import React, { useState, useEffect } from "react";
import { Card, Steps } from "antd";
import Icon from "@ant-design/icons";
import type { GetProps } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import { CollectInfoIcon, ReviewIcon, SubmitIcon, FingerPrintIcon, ResultIcon } from "../../icons/CaseProgressCard";
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
  }, [expandedStep, progress.steps, caseSummary.currentStep]);

  const onStepChange = (value: number) => {
    setCurrentStepIndex(value);
    setCurrentStep(progress.steps[value].name);
  };

  type CustomIconComponentProps = GetProps<typeof Icon>;
  const CollectIcon = (props: Partial<CustomIconComponentProps> & { color?: string }) => (
    <Icon component={() => <CollectInfoIcon color={props.color} />} {...props} />
  );

  const icons = [
    <CollectIcon key="collect" color={"#27AE60"} />,
    <ReviewIcon key="review" color={"#27AE60"} />,
    <SubmitIcon key="submit" color={"#27AE60"} />,
    <FingerPrintIcon key="fingerprint" color={"#27AE60"} />,
    <ResultIcon key="result" color={"#27AE60"} />,
  ];

  // const getIconColor = (step: { name: string }) => {
  //   // Determine the color based on some condition, e.g., status of the step
  //   return  === "COMPLETED" ? "#4CAF50" : "#F2994A";
  // };

  return (
    <Card title={t("CaseProgressTitle")}>
      <Steps current={currentStepIndex} onChange={onStepChange} labelPlacement="vertical">
        {progress.steps.map((step, index) => (
          <Step key={step.name} title={t(step.name)} icon={icons[index]} />
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
