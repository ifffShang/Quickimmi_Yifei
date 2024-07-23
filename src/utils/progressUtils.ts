import { message } from "antd";
import { updateCaseProgressApi } from "../api/caseAPI";
import { Role } from "../consts/consts";

interface ProgressSubstep {
  name: string;
  status: string;
  metadata: string;
  startedAt: number;
  updatedAt: number;
}

interface ProgressStep {
  name: string;
  status: string;
  substeps: ProgressSubstep[];
  startedAt: number;
  updatedAt: number;
}

interface AsylumCaseProgress {
  steps: ProgressStep[];
}

export async function updateCaseProgress(
  caseId: string,
  progressSteps: any[],
  accessToken: string,
  role: Role,
  currentStep: string,
  currentSubStep: string,
  currentSubStepMetadata: string,
): Promise<boolean> {
  const oldProgress = {
    steps: progressSteps,
  };
  const newProgress = constructProgressData(currentStep, currentSubStep, currentSubStepMetadata, oldProgress);
  const newCurrentStep = [...newProgress.steps].reverse().find(step => step.status === "IN_PROGRESS");
  const progressData = {
    caseId: caseId,
    currentStep: newCurrentStep ? newCurrentStep.name : "FILLING_APPLICATION",
    asylumCaseProgress: newProgress,
  };

  try {
    const result = await updateCaseProgressApi(progressData, accessToken, role);
    if (result) {
      message.success("Case progress updated successfully");
      return true;
    } else {
      message.error("Failed to update case progress.");
      return false;
    }
  } catch (error) {
    message.error("Failed to update case progress.");
    return false;
  }
}

export function constructProgressData(
  currentStep: string,
  currentSubstep: string,
  metadata: string,
  oldProgress: AsylumCaseProgress,
): AsylumCaseProgress {
  const newProgress: AsylumCaseProgress = JSON.parse(JSON.stringify(oldProgress));
  const currentTime = Date.now();

  for (let i = 0; i < newProgress.steps.length; i++) {
    const step = newProgress.steps[i];
    if (step.name === currentStep) {
      for (let j = 0; j < step.substeps.length; j++) {
        const substep = step.substeps[j];
        if (substep.name === currentSubstep) {
          // Mark the current substep as COMPLETED
          substep.status = "COMPLETED";
          substep.metadata = metadata;
          substep.updatedAt = currentTime;
          step.updatedAt = currentTime;

          if (j < step.substeps.length - 1) {
            // If the parent step has steps after the current step, mark the next substep as IN_PROGRESS
            const nextSubstep = step.substeps[j + 1];
            nextSubstep.status = "IN_PROGRESS";
            nextSubstep.startedAt = currentTime;
            nextSubstep.updatedAt = currentTime;
            step.updatedAt = currentTime;
          } else {
            // If the current substep is the last step in the parent step, mark the parent step as COMPLETED
            step.status = "COMPLETED";
            step.updatedAt = currentTime;

            if (i < newProgress.steps.length - 1) {
              // If the parent step has steps after the current step, mark the next parent step as IN_PROGRESS
              const nextStep = newProgress.steps[i + 1];
              nextStep.status = "IN_PROGRESS";
              nextStep.startedAt = currentTime;
              nextStep.updatedAt = currentTime;

              // Mark the first substep of the next step as IN_PROGRESS
              if (nextStep.substeps.length > 0) {
                const nextStepFirstSubstep = nextStep.substeps[0];
                nextStepFirstSubstep.status = "IN_PROGRESS";
                nextStepFirstSubstep.startedAt = currentTime;
                nextStepFirstSubstep.updatedAt = currentTime;
              }
            }
          }
        }
      }
    }
  }

  return newProgress;
}
