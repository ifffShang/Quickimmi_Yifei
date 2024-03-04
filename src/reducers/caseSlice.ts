import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CaseState {
  currentStepOrder: number;
}

const initialState: CaseState = {
  currentStepOrder: 1,
};

export const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    incrementStepOrder: state => {
      state.currentStepOrder++;
    },
    decrementStepOrder: state => {
      state.currentStepOrder--;
    },
    setStepOrder: (state, action: PayloadAction<number>) => {
      state.currentStepOrder = action.payload;
    },
  },
});

export const { incrementStepOrder, decrementStepOrder, setStepOrder } =
  caseSlice.actions;

export default caseSlice.reducer;
