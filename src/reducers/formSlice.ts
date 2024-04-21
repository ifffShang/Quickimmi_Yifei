import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Applicant,
  ApplicationCase,
  AsylumCaseProfile,
} from "../model/ApiModals";

const initialState: ApplicationCase = {
  id: 0,
  userId: 0,
  applicantName: "",
  taskList: [],
  type: "",
  status: "",
  submittedAt: 0,
  updatedAt: 0,
  createdAt: 0,
  currentStep: "",
  uscisReceiptNumber: "",
  paid: false,
  assignedLawyer: 0,
  profile: {
    applyForWithholdingYesCheckbox: "",
    applicant: {},
    family: {},
    background: {},
    applicationDetails: {},
    signature: {},
    declaration: {},
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormState: (state, action: PayloadAction<ApplicationCase>) => {
      for (const key in action.payload) {
        if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
          const value = action.payload[key];
          if (!value) {
            action.payload[key] = initialState[key];
          }
        }
      }
      Object.assign(state, action.payload);
    },
    updateCaseDetails: (state, action: PayloadAction<AsylumCaseProfile>) => {
      Object.assign(state.profile, action.payload);
    },
    updateApplicant: (state, action: PayloadAction<Applicant>) => {
      Object.assign(state.profile.applicant, action.payload);
    },
    resetFormState: () => initialState,
  },
});

export const {
  resetFormState,
  updateFormState,
  updateApplicant,
  updateCaseDetails,
} = formSlice.actions;

export default formSlice.reducer;
