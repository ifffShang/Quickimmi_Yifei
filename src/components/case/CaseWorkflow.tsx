import React, { useEffect } from "react";
import { Workflow } from "../../model/CaseModels";
import { CaseStepNavigation } from "./CaseStepNavigation";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CaseStepContent } from "./CaseStepContent";
import { setTotalSteps } from "../../reducers/caseSlice";

export function CaseWorkflow() {
  const dispatch = useAppDispatch();
  const [workflow, setWorkflow] = React.useState<Workflow>();

  const currentStepOrder = useAppSelector(state => state.case.currentStepOrder);

  useEffect(() => {
    getWorkflow().then(workflow => {
      setWorkflow(workflow);
      dispatch(setTotalSteps(workflow.steps.length));
    });
  }, []);

  if (!workflow || !workflow.steps || workflow.steps.length === 0) {
    return <div>Loading...</div>;
  }

  const currentStepForm = workflow.steps[currentStepOrder];

  return (
    <div>
      <h1>Workflow</h1>
      <CaseStepNavigation
        steps={workflow.steps}
        currentStepOrder={currentStepOrder}
      />
      <CaseStepContent step={currentStepForm} />
    </div>
  );
}

export async function getWorkflow(): Promise<Workflow> {
  return Promise.resolve({} as Workflow);
}
