import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialApplicationCase } from "../consts/caseConsts";
import {
  Applicant,
  ApplicationCase,
  AsylumCaseProfile,
  ParsePassportResponse,
} from "../model/apiModels";

export interface FormState {
  applicationCase: ApplicationCase;
  passportOrIdImageUrl: string;
}

const initialState: FormState = {
  applicationCase: InitialApplicationCase,
  passportOrIdImageUrl: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateApplicationCase: (state, action: PayloadAction<ApplicationCase>) => {
      for (const key in action.payload) {
        if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
          const value = action.payload[key];
          if (!value) {
            action.payload[key] = InitialApplicationCase[key];
          }
        }
      }
      Object.assign(state.applicationCase, action.payload);
    },
    updateCaseDetails: (state, action: PayloadAction<AsylumCaseProfile>) => {
      Object.assign(state.applicationCase.profile, action.payload);
    },
    updateApplicant: (state, action: PayloadAction<Applicant>) => {
      Object.assign(state.applicationCase.profile.applicant, action.payload);
    },
    updatePassportInfo: (
      state,
      action: PayloadAction<ParsePassportResponse>,
    ) => {
      const payload = {
        passportNumber: action.payload.passportNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        birthDate: action.payload.birthDate,
      };
      Object.assign(state.applicationCase.profile.applicant, payload);
    },
    updatePassportOrIdImageUrl: (state, action: PayloadAction<string>) => {
      state.passportOrIdImageUrl = action.payload;
    },
    resetFormState: () => initialState,
  },
});

export const {
  resetFormState,
  updateApplicationCase,
  updateCaseDetails,
  updateApplicant,
  updatePassportInfo,
  updatePassportOrIdImageUrl,
} = formSlice.actions;

export default formSlice.reducer;
