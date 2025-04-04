import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { Case } from "../model/apiModels";
import { IForm, IFormFields, IFormStep, IFormStepAndFieldsRecord, IFormStructure } from "../model/formFlowModels";
import { CaseSubType, CaseType } from "../model/immigrationTypes";
import { getCorrectedIndexes } from "../utils/caseUtils";

export interface FormFieldsMap {
  [key: string]: IFormFields;
}

export interface CaseState {
  form: IForm;
  isFirstStep: boolean;
  isLastStep: boolean;
  isStandAlone: boolean;
  indexLevel1: number;
  indexLevel2: number;
  totalLevel1s: number;
  currentStep: IFormStep;
  formFieldsMap: FormFieldsMap;
  currentCaseId: string;
  currentCaseType: CaseType | null;
  currentCaseSubType: CaseSubType | null;
  cases: Case[];
}

const initialState: CaseState = {
  isFirstStep: true,
  isLastStep: false,
  isStandAlone: false,
  form: {} as IForm,
  indexLevel1: 0,
  indexLevel2: 0,
  totalLevel1s: 0,
  currentStep: {} as IFormStep,
  formFieldsMap: {},
  currentCaseId: "",
  currentCaseType: null,
  currentCaseSubType: null,
  cases: [],
};

function checkFirstAndLastStep(indexLevel1: number, indexLevel2: number, steps: IFormStep[]) {
  const totalLevel1s = steps.filter(step => !step.standalone).length;
  const totalLevel2s = steps[totalLevel1s - 1].steps.length;
  const isLastStep = indexLevel1 === totalLevel1s - 1 && indexLevel2 === totalLevel2s - 1;
  const isFirstStep = indexLevel1 === 0 && indexLevel2 === 0;
  const isStandAlone = steps[indexLevel1].standalone;
  return { isFirstStep, isLastStep, isStandAlone };
}

export const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<IFormStructure>) => {
      if (!_.isEqual(state.form, action.payload.form)) {
        state.isFirstStep = true;
        state.isLastStep = false;
        state.isStandAlone = false;
        state.form = {} as IForm;
        state.indexLevel1 = 0;
        state.indexLevel2 = 0;
        state.totalLevel1s = 0;
        state.currentStep = {} as IFormStep;
        state.formFieldsMap = {};
      }

      state.form = action.payload.form;
      state.totalLevel1s = action.payload.form.steps.length;
      state.currentStep = action.payload.form.steps[state.indexLevel1].steps[state.indexLevel2];

      state.formFieldsMap = action.payload.formStepsAndFormFieldsList.reduce(
        (acc: FormFieldsMap, { subStep, fields }: IFormStepAndFieldsRecord) => {
          return {
            ...acc,
            [subStep.referenceId!]: fields,
          };
        },
        {},
      );
    },
    incrementIndexLevel1: state => {
      if (state.indexLevel1 < state.totalLevel1s - 1) state.indexLevel1++;
      state.currentStep = state.form.steps[state.indexLevel1].steps[0];
      const { isFirstStep, isLastStep } = checkFirstAndLastStep(state.indexLevel1, state.indexLevel2, state.form.steps);
      state.isFirstStep = isFirstStep;
      state.isLastStep = isLastStep;
    },
    decrementIndexLevel1: state => {
      if (state.indexLevel1 > 0) state.indexLevel1--;
      state.currentStep = state.form.steps[state.indexLevel1].steps[0];
      const { isFirstStep, isLastStep } = checkFirstAndLastStep(state.indexLevel1, state.indexLevel2, state.form.steps);
      state.isFirstStep = isFirstStep;
      state.isLastStep = isLastStep;
    },
    incrementIndexLevel2: state => {
      if (state.indexLevel2 < state.form.steps[state.indexLevel1].steps.length - 1) {
        state.indexLevel2++;
        state.currentStep = state.form.steps[state.indexLevel1].steps[state.indexLevel2];
      } else if (state.indexLevel1 < state.totalLevel1s - 1) {
        state.indexLevel1++;
        state.indexLevel2 = 0;
        state.currentStep = state.form.steps[state.indexLevel1].steps[0];
      } else {
        console.error("Invalid step order");
      }
      const { isFirstStep, isLastStep } = checkFirstAndLastStep(state.indexLevel1, state.indexLevel2, state.form.steps);
      state.isFirstStep = isFirstStep;
      state.isLastStep = isLastStep;
    },
    decrementIndexLevel2: state => {
      if (state.indexLevel2 > 0) {
        state.indexLevel2--;
        state.currentStep = state.form.steps[state.indexLevel1].steps[state.indexLevel2];
      } else if (state.indexLevel1 > 0) {
        state.indexLevel1--;
        state.indexLevel2 = state.form.steps[state.indexLevel1].steps.length - 1;
        state.currentStep = state.form.steps[state.indexLevel1].steps[state.indexLevel2];
      } else {
        console.error("Invalid step order");
      }
      const { isFirstStep, isLastStep } = checkFirstAndLastStep(state.indexLevel1, state.indexLevel2, state.form.steps);
      state.isFirstStep = isFirstStep;
      state.isLastStep = isLastStep;
    },
    setIndexLevel1: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.totalLevel1s && state.indexLevel1 !== action.payload) {
        state.indexLevel1 = action.payload;
        state.indexLevel2 = 0;
        state.currentStep = state.form.steps[action.payload].steps[0];
      } else {
        console.error("Invalid step order");
      }
      const { isFirstStep, isLastStep } = checkFirstAndLastStep(state.indexLevel1, state.indexLevel2, state.form.steps);
      state.isFirstStep = isFirstStep;
      state.isLastStep = isLastStep;
    },
    setIndexLevel2: (state, action: PayloadAction<{ indexLevel1: number; indexLevel2: number }>) => {
      const { correctedIndexLevel1, correctedIndexLevel2 } = getCorrectedIndexes(
        state.form,
        action.payload.indexLevel1,
        action.payload.indexLevel2,
      );
      state.indexLevel1 = correctedIndexLevel1;
      state.indexLevel2 = correctedIndexLevel2;
      state.currentStep = state.form.steps[correctedIndexLevel1].steps[correctedIndexLevel2];
      const { isFirstStep, isLastStep } = checkFirstAndLastStep(state.indexLevel1, state.indexLevel2, state.form.steps);
      state.isFirstStep = isFirstStep;
      state.isLastStep = isLastStep;
    },
    updateFormFieldsMap: (state, action: PayloadAction<{ referenceId: string; formFields: IFormFields }>) => {
      delete state.formFieldsMap[action.payload.referenceId];

      state.formFieldsMap = {
        ...state.formFieldsMap,
        [action.payload.referenceId]: action.payload.formFields,
      };
    },
    updateCurrentCaseInfo: (
      state,
      action: PayloadAction<{ caseId: string; caseType: CaseType; caseSubType: CaseSubType }>,
    ) => {
      state.currentCaseId = action.payload.caseId;
      state.currentCaseType = action.payload.caseType;
      state.currentCaseSubType = action.payload.caseSubType;
    },
    updateCases: (state, action: PayloadAction<Case[]>) => {
      state.cases = action.payload;
    },
    resetForm: state => {
      state.isFirstStep = true;
      state.isLastStep = false;
      state.isStandAlone = false;
      state.form = {} as IForm;
      state.indexLevel1 = 0;
      state.indexLevel2 = 0;
      state.totalLevel1s = 0;
      state.currentStep = {} as IFormStep;
      state.formFieldsMap = {};
      state.currentCaseId = "";
      state.currentCaseType = null;
      state.currentCaseSubType = null;
    },
    resetCaseState: state => {
      return initialState;
    },
  },
});

export const {
  incrementIndexLevel1,
  decrementIndexLevel1,
  incrementIndexLevel2,
  decrementIndexLevel2,
  setIndexLevel1,
  setIndexLevel2,
  updateForm,
  updateFormFieldsMap,
  updateCurrentCaseInfo,
  updateCases,
  resetForm,
  resetCaseState,
} = caseSlice.actions;

export default caseSlice.reducer;
