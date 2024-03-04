import React from "react";
import FORM589 from "../../forms/I-589Form.json";
import { Workflow, WorkflowStep } from "../../model/CaseModels";
import { CaseStepNavigation } from "./CaseStepNavigation";
import { useAppSelector } from "../../app/hooks";
import { useWorkflowTranslation } from "../../hooks/commonHooks";
import { CaseField } from "./CaseField";

export function CaseWorkflow() {
  const steps = parseWorkflow();
  const { wt } = useWorkflowTranslation();

  const currentStepOrder = useAppSelector(state => state.case.currentStepOrder);
  const currentStep = steps.find(step => step.order === currentStepOrder);

  if (!currentStep) {
    return <div>Step not found</div>;
  }

  return (
    <div>
      <h1>Workflow</h1>
      <CaseStepNavigation steps={steps} currentStep={currentStepOrder} />
      <div>
        {currentStep.pages.map((page, index) => (
          <div key={index}>
            <h2>{wt(page.title)}</h2>
            {page.fields.map((field, index) => (
              <div key={index}>
                {wt(field.label ?? "")}
                <CaseField control={field.control} label={field.label ?? ""} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function parseWorkflow(): WorkflowStep[] {
  const workflow = FORM589 as unknown as Workflow;
  return workflow.steps;
}
