import React from "react";
import FORM589 from "../../forms/I-589Form.json";
import { Workflow, WorkflowStep } from "../../model/CaseModels";
import { CaseStepNavigation } from "./CaseStepNavigation";
import { useAppSelector } from "../../app/hooks";


export function CaseWorkflow() {
  const steps = parseWorkflow();
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
            <h2>{page.title}</h2>
            {page.fields.map((field, index) => (<div key={index}>{field.label}</div>))}
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