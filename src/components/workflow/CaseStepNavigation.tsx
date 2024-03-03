import React from "react";
import {WorkflowStep} from "../../model/CaseModels";
import {v4 as uuidv4} from "uuid";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import "./CaseStepNavigation.css";
import {setStepOrder} from "../../reducers/caseSlice";

interface CaseStepNavigationProps {
  steps: WorkflowStep[];
  currentStep: number;
}

export function CaseStepNavigation(props: CaseStepNavigationProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="case-step-container">
      {props.steps.map((step, index) => (
        <div
          className="case-step-item"
          key={uuidv4()}
          onClick={() => {
            dispatch(setStepOrder(step.order));
          }}>
          <div className={props.currentStep === step.order ? "font-bold" : ""}>
            {step.order} {t(step.label)}
          </div>
          <div className="case-step-arrow">
            {index < props.steps.length - 1 && <>{"-->"}</>}
          </div>
        </div>
      ))}
    </div>
  );
}
