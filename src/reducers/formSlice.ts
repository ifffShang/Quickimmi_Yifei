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
  documentUrls: string[];
}

const initialState: FormState = {
  applicationCase: InitialApplicationCase,
  passportOrIdImageUrl: "",
  documentUrls: [],
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
        passportNumber: action.payload.idNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        birthDate: action.payload.birthDate,
      };
      Object.assign(state.applicationCase.profile.applicant, payload);
    },
    updateIdCardInfo: (state, action: PayloadAction<ParsePassportResponse>) => {
      const payload = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        birthDate: action.payload.birthDate,
        genderMaleCheckbox: action.payload.gender === "Male",
        genderFemaleCheckbox: action.payload.gender === "Female",
        nationality: action.payload.nationality,
        cityAndCountryOfBirth: action.payload.birthPlace,
      };
      Object.assign(state.applicationCase.profile.applicant, payload);
    },
    updateTravelDocumentInfo: (
      state,
      action: PayloadAction<ParsePassportResponse>,
    ) => {
      const payload = {
        travelDocumentNumber: action.payload.idNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        birthDate: action.payload.birthDate,
        cityAndCountryOfBirth: action.payload.birthPlace,
      };
      Object.assign(state.applicationCase.profile.applicant, payload);
    },
    updatePassportOrIdImageUrl: (state, action: PayloadAction<string>) => {
      state.passportOrIdImageUrl = action.payload;
    },
    addDocumentUrls: (state, action: PayloadAction<string>) => {
      state.documentUrls = [...state.documentUrls, action.payload];
    },
    clearDocumentUrls: state => {
      state.documentUrls = [];
    },
    resetFormState: state => {
      state.applicationCase = InitialApplicationCase;
      state.passportOrIdImageUrl = "";
      state.documentUrls = [];
    },
  },
});

export const {
  resetFormState,
  updateApplicationCase,
  updateCaseDetails,
  updateApplicant,
  updatePassportInfo,
  updateIdCardInfo,
  updatePassportOrIdImageUrl,
  addDocumentUrls,
  clearDocumentUrls,
} = formSlice.actions;

export default formSlice.reducer;
