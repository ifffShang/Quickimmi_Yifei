import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CaseState {
  currentStepOrder: number;
  totalSteps: number;
}

const initialState: CaseState = {
  currentStepOrder: 0,
  totalSteps: 0,
};

export const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    incrementStepOrder: state => {
      if (state.currentStepOrder < state.totalSteps - 1)
        state.currentStepOrder++;
    },
    decrementStepOrder: state => {
      if (state.currentStepOrder > 0) state.currentStepOrder--;
    },
    setStepOrder: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.totalSteps) {
        state.currentStepOrder = action.payload;
      } else {
        console.error("Invalid step order");
      }
    },
    setTotalSteps: (state, action: PayloadAction<number>) => {
      state.totalSteps = action.payload;
    },
  },
});

export const {
  incrementStepOrder,
  decrementStepOrder,
  setStepOrder,
  setTotalSteps,
} = caseSlice.actions;

export default caseSlice.reducer;
