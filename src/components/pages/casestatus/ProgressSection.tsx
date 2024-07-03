import React from "react";
import { useTranslation } from "react-i18next";
import { CaseSummary } from "../../../model/apiModels";
import { useAppSelector } from "../../../app/hooks";
import FillingApplicationSection from "./FillingApplicationSection";
import OtherStepsSection from "./OtherStepsSection";
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
      <FillingApplicationSection
        currentStepDetails={currentStepDetails}
        expandedStep={expandedStep}
        handleToggleExpand={handleToggleExpand}
        isLawyer={isLawyer}
        t={t}
      />
    );
  }

  return (
    <OtherStepsSection
      currentStepDetails={currentStepDetails}
      expandedStep={expandedStep}
      handleToggleExpand={handleToggleExpand}
      isLawyer={isLawyer}
      t={t}
      progress={progress}
    />
  );
};

export default ProgressSection;
