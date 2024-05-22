import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { InitialApplicationCase } from "../consts/caseConsts";
import {
  ApplicationCase,
  AsylumCaseProfile,
  AsylumCaseProfileOptional,
  ParsePassportResponse,
} from "../model/apiModels";
import { getUpdateProfileData } from "../utils/utils";

export interface FormState {
  applicationCase: ApplicationCase;
  documentUrls: any[];
}

const initialState: FormState = {
  applicationCase: InitialApplicationCase,
  documentUrls: [],
};

function deepAssign(update: any, current: any, init: any) {
  const result: any = {};
  if (typeof update !== "object") {
    return result;
  }
  for (const key in update) {
    if (Object.prototype.hasOwnProperty.call(update, key)) {
      const value = update[key];
      if (value === false || value === "false") {
        result[key] = "false";
      } else if (value === true || value === "true") {
        result[key] = "true";
      } else if (value === null || value === undefined) {
        result[key] = current[key] || init[key];
      } else if (typeof value === "object" && !Array.isArray(value)) {
        result[key] = deepAssign(value, current[key], init[key]);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateApplicationCase: (state, action: PayloadAction<ApplicationCase>) => {
      const result = deepAssign(
        action.payload,
        state.applicationCase,
        InitialApplicationCase,
      );
      Object.assign(state.applicationCase, result);
    },
    updateCaseFields: (
      state,
      action: PayloadAction<AsylumCaseProfileOptional>,
    ) => {
      if (action.payload.overwriteChildren) {
        state.applicationCase.profile.family.children =
          action.payload?.family?.children ?? [];
      }
      const profile = _.merge(state.applicationCase.profile, action.payload);
      state.applicationCase.profile = profile;
    },
    updatePassportInfo: (
      state,
      action: PayloadAction<ParsePassportResponse>,
    ) => {
      const fieldKey = action.payload.fieldKey.replace(
        ".passportDocumentId",
        "",
      );
      let payload: any = {
        passportNumber: action.payload.idNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        genderMaleCheckbox: action.payload.gender === "Male" ? "true" : "false",
        genderFemaleCheckbox:
          action.payload.gender === "Female" ? "true" : "false",
        nationality: action.payload.nationality,
        birthDate: action.payload.birthDate,
        cityAndCountryOfBirth: action.payload.birthPlace,
      };
      if (fieldKey.indexOf("applicant") > -1) {
        payload = {
          ...payload,
          expirationDate: action.payload.expireDate,
        };
      }
      const payloadToUpdate = getUpdateProfileData(
        fieldKey,
        payload,
        action.payload.fieldIndex,
      );
      const profile = _.merge(state.applicationCase.profile, payloadToUpdate);
      Object.assign(state.applicationCase.profile, profile);
    },
    updateIdCardInfo: (state, action: PayloadAction<ParsePassportResponse>) => {
      const fieldKey = action.payload.fieldKey.replace(
        ".passportDocumentId",
        "",
      );
      const payload: any = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        genderMaleCheckbox: action.payload.gender === "Male" ? "true" : "false",
        genderFemaleCheckbox:
          action.payload.gender === "Female" ? "true" : "false",
        nationality: action.payload.nationality,
        birthDate: action.payload.birthDate,
        cityAndCountryOfBirth: action.payload.birthPlace,
      };
      const payloadToUpdate = getUpdateProfileData(
        fieldKey,
        payload,
        action.payload.fieldIndex,
      );
      const profile = _.merge(state.applicationCase.profile, payloadToUpdate);
      Object.assign(state.applicationCase.profile, profile);
    },
    updateTravelDocumentInfo: (
      state,
      action: PayloadAction<ParsePassportResponse>,
    ) => {
      const fieldKey = action.payload.fieldKey.replace(
        ".passportDocumentId",
        "",
      );
      let payload: any = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        genderMaleCheckbox: action.payload.gender === "Male" ? "true" : "false",
        genderFemaleCheckbox:
          action.payload.gender === "Female" ? "true" : "false",
        nationality: action.payload.nationality,
        birthDate: action.payload.birthDate,
        cityAndCountryOfBirth: action.payload.birthPlace,
      };
      if (fieldKey.indexOf("applicant") > -1) {
        payload = {
          ...payload,
          travelDocumentNumber: action.payload.idNumber,
          expirationDate: action.payload.expireDate,
        };
      }
      const payloadToUpdate = getUpdateProfileData(
        fieldKey,
        payload,
        action.payload.fieldIndex,
      );
      const profile = _.merge(state.applicationCase.profile, payloadToUpdate);
      Object.assign(state.applicationCase.profile, profile);
    },
    syncUpMailingAndResidenceAddress: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      if (action.payload) {
        state.applicationCase.profile.applicant.streetNumberAndNameOfMailingAddress =
          state.applicationCase.profile.applicant.streetNumberAndName;
        state.applicationCase.profile.applicant.aptNumberOfMailingAddress =
          state.applicationCase.profile.applicant.aptNumber;
        state.applicationCase.profile.applicant.cityOfMailingAddress =
          state.applicationCase.profile.applicant.city;
        state.applicationCase.profile.applicant.stateOfMailingAddress =
          state.applicationCase.profile.applicant.state;
        state.applicationCase.profile.applicant.zipCodeOfMailingAddress =
          state.applicationCase.profile.applicant.zipCode;
        state.applicationCase.profile.applicant.telePhoneAreaCodeOfMailingAddress =
          state.applicationCase.profile.applicant.telePhoneAreaCode;
        state.applicationCase.profile.applicant.telePhoneNumberOfMailingAddress =
          state.applicationCase.profile.applicant.telePhoneNumber;
      } else {
        state.applicationCase.profile.applicant.streetNumberAndNameOfMailingAddress =
          "";
        state.applicationCase.profile.applicant.aptNumberOfMailingAddress = "";
        state.applicationCase.profile.applicant.cityOfMailingAddress = "";
        state.applicationCase.profile.applicant.stateOfMailingAddress = "";
        state.applicationCase.profile.applicant.zipCodeOfMailingAddress = "";
        state.applicationCase.profile.applicant.telePhoneAreaCodeOfMailingAddress =
          "";
        state.applicationCase.profile.applicant.telePhoneNumberOfMailingAddress =
          "";
      }
    },
    replaceDocumentUrls: (state, action: PayloadAction<any[]>) => {
      state.documentUrls = action.payload;
    },
    clearDocumentUrls: state => {
      state.documentUrls = [];
    },
    resetFormState: state => {
      state.applicationCase = InitialApplicationCase;
      state.documentUrls = [];
    },
  },
});

export const {
  resetFormState,
  updateApplicationCase,
  updateCaseFields,
  updatePassportInfo,
  updateIdCardInfo,
  updateTravelDocumentInfo,
  syncUpMailingAndResidenceAddress,
  replaceDocumentUrls,
  clearDocumentUrls,
} = formSlice.actions;

export default formSlice.reducer;
