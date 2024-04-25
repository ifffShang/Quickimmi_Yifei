import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm, IFormFields, IFormStep } from "../model/formModels";
import { Case } from "../model/apiModels";

export interface FormFieldsMap {
  [key: string]: IFormFields;
}

export interface CaseState {
  form: IForm;
  indexLevel1: number;
  indexLevel2: number;
  totalLevel1s: number;
  currentStep: IFormStep;
  formFieldsMap: FormFieldsMap;
  currentCaseId: string;
  cases: Case[];
}

const initialState: CaseState = {
  form: {} as IForm,
  indexLevel1: -1,
  indexLevel2: -1,
  totalLevel1s: 0,
  currentStep: {} as IFormStep,
  formFieldsMap: {},
  currentCaseId: "",
  cases: [],
};

export const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<IForm>) => {
      state.form = action.payload;
      state.totalLevel1s = action.payload.steps.length;
      state.indexLevel1 = 0;
      state.indexLevel2 = 0;
      state.currentStep = action.payload.steps[0].steps[0];
    },
    incrementIndexLevel1: state => {
      if (state.indexLevel1 < state.totalLevel1s - 1) state.indexLevel1++;
      state.currentStep = state.form.steps[state.indexLevel1].steps[0];
    },
    decrementIndexLevel1: state => {
      if (state.indexLevel1 > 0) state.indexLevel1--;
      state.currentStep = state.form.steps[state.indexLevel1].steps[0];
    },
    setIndexLevel1: (state, action: PayloadAction<number>) => {
      if (
        action.payload >= 0 &&
        action.payload < state.totalLevel1s &&
        state.indexLevel1 !== action.payload
      ) {
        state.indexLevel1 = action.payload;
        state.indexLevel2 = 0;
        state.currentStep = state.form.steps[action.payload].steps[0];
      } else {
        console.error("Invalid step order");
      }
    },
    setIndexLevel2: (
      state,
      action: PayloadAction<{ indexLevel1: number; indexLevel2: number }>,
    ) => {
      state.indexLevel1 = action.payload.indexLevel1;
      state.indexLevel2 = action.payload.indexLevel2;
      state.currentStep =
        state.form.steps[action.payload.indexLevel1].steps[
          action.payload.indexLevel2
        ];
    },
    updateFormFieldsMap: (
      state,
      action: PayloadAction<{ referenceId: string; formFields: IFormFields }>,
    ) => {
      state.formFieldsMap = {
        ...state.formFieldsMap,
        [action.payload.referenceId]: action.payload.formFields,
      };
    },
    updateCurrentCaseId: (state, action: PayloadAction<string>) => {
      state.currentCaseId = action.payload;
    },
    updateCases: (state, action: PayloadAction<Case[]>) => {
      state.cases = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  incrementIndexLevel1,
  decrementIndexLevel1,
  setIndexLevel1,
  setIndexLevel2,
  updateForm,
  updateFormFieldsMap,
  updateCurrentCaseId,
  updateCases,
  resetForm,
} = caseSlice.actions;

export default caseSlice.reducer;
