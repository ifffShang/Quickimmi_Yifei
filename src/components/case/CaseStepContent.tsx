import React, { useEffect } from "react";
import { WorkflowForm, WorkflowStep } from "../../model/CaseModels";
import "./CaseStepNavigation.css";
import {
  decrementStepOrder,
  incrementStepOrder,
} from "../../reducers/caseSlice";
import { useWorkflowTranslation } from "../../hooks/commonHooks";
import { useAppDispatch } from "../../app/hooks";

interface CaseStepContentProps {
  step: WorkflowStep;
}

export function CaseStepContent({ step }: CaseStepContentProps) {
  const { wt } = useWorkflowTranslation();
  const dispatch = useAppDispatch();
  const [subForm, setSubForm] = React.useState<WorkflowForm>();

  useEffect(() => {
    if (!step || !step.referenceId) return;
    const subFormId = step.referenceId;
    fetch(`http://localhost:3000/forms/${subFormId}`).then(response => {
      console.log(response);
      if (response.ok) {
        setSubForm(response.json() as unknown as WorkflowForm);
      }
    });
  }, [step?.referenceId]);

  return (
    <div>
      <h1>{wt(subForm?.pages?.[0]?.title ?? "")}</h1>
      <div>
        <button onClick={() => dispatch(decrementStepOrder())}>
          {wt("Previous")}
        </button>
        <button onClick={() => dispatch(incrementStepOrder())}>
          {wt("Next")}
        </button>
      </div>
    </div>
  );
}
