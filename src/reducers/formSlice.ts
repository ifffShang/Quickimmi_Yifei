import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { CacheStore } from "../cache/cache";
import {
  InitialAddressHistoryBeforeUS,
  InitialApplicationCase,
  InitialChild,
  InitialEducationHistory,
  InitialEmploymentHistory,
  InitialEntryRecord,
  InitialFamilyMember,
  InitialMember,
  InitialUSAddressHistoryPast5Y,
} from "../consts/caseConsts";
import {
  ApplicationCase,
  AsylumCaseProfile,
  AsylumCaseProfileOptional,
  GeneratedDocument,
  MarriageCertificate,
  ParsePassportResponse,
  Percentage,
  Progress,
  UploadedDocumentWithUrl,
} from "../model/apiModels";
import { getUpdateProfileData } from "../utils/utils";
import { ParseMarriageCertificateResponse } from "../model/apiReqResModels";
import { KeyValues } from "../model/commonModels";

export interface FormState {
  caseId: number;
  asylumType: "AFFIRMATIVE" | "DEFENSIVE";
  applicationCase: ApplicationCase;
  percentage: Percentage;
  saveTimes: number;
  documentUrls: any[];
  uploadedDocuments: UploadedDocumentWithUrl[];
  generatedDocuments: GeneratedDocument[];
  highlightMissingFields: boolean;
  disabledFields: KeyValues;
}

const initialState: FormState = {
  caseId: 0,
  applicationCase: InitialApplicationCase,
  percentage: {
    overall: { avg: 0 },
  },
  saveTimes: 0,
  documentUrls: [],
  uploadedDocuments: [],
  generatedDocuments: [],
  asylumType: "AFFIRMATIVE",
  highlightMissingFields: false,
  disabledFields: {},
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
        result[key] = current?.[key] || init?.[key] || null;
      } else if (typeof value === "object" && !Array.isArray(value)) {
        result[key] = deepAssign(value, current[key], init[key]);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

export const ArrayFields = [
  {
    field: "applicant.entryRecords",
    overwriteField: "overwriteEntryRecords",
    default: InitialEntryRecord,
  },
  {
    field: "family.children",
    overwriteField: "overwriteChildren",
    default: InitialChild,
  },
  {
    field: "family.siblings",
    overwriteField: "overwriteSiblings",
    default: InitialFamilyMember,
  },
  {
    field: "background.addressHistoriesBeforeUS",
    overwriteField: "overwriteAddressHistoriesBeforeUS",
    default: InitialAddressHistoryBeforeUS,
  },
  {
    field: "background.usAddressHistoriesPast5Years",
    overwriteField: "overwriteUsAddressHistoriesPast5Years",
    default: InitialUSAddressHistoryPast5Y,
  },
  {
    field: "background.educationHistories",
    overwriteField: "overwriteEducationHistories",
    default: InitialEducationHistory,
  },
  {
    field: "background.employmentHistories",
    overwriteField: "overwriteEmploymentHistories",
    default: InitialEmploymentHistory,
  },
  {
    field: "signature.members",
    overwriteField: "overwriteMembers",
    default: InitialMember,
  },
];

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // updateApplicationCase: (state, action: PayloadAction<ApplicationCase>) => {
    //   const result = deepAssign(
    //     action.payload,
    //     state.applicationCase,
    //     InitialApplicationCase,
    //   );
    //   Object.assign(state.applicationCase, result);
    // },
    updateCaseProfileAndProgress: (
      state,
      action: PayloadAction<{
        caseId: number;
        profile: AsylumCaseProfile;
        progress: Progress;
        percentage: Percentage;
      }>,
    ) => {
      state.caseId = action.payload.caseId;
      const updatedProfile = deepAssign(
        action.payload.profile,
        state.applicationCase.profile,
        InitialApplicationCase.profile,
      );
      Object.assign(state.applicationCase.profile, updatedProfile);
      CacheStore.setProfile(updatedProfile, action.payload.caseId);

      Object.assign(state.applicationCase.progress, action.payload.progress);
      CacheStore.setProgress(action.payload.progress, action.payload.caseId);

      state.percentage = action.payload.percentage;
      CacheStore.setPercentage(state.percentage, action.payload.caseId);
    },
    updatePercentage: (state, action: PayloadAction<Percentage>) => {
      state.percentage = action.payload;

      CacheStore.setPercentage(state.percentage, state.caseId);
    },
    updateOnePercentage: (
      state,
      action: PayloadAction<{
        sectionId: string;
        referenceId: string;
        value: number;
      }>,
    ) => {
      const { sectionId, referenceId, value } = action.payload;
      if (!state.percentage[sectionId]) {
        console.log("Skip percentage update before form is loaded");
        return;
      }
      const updatedPercentage = { ...state.percentage };
      updatedPercentage[sectionId][referenceId] = value;

      // Calculate section avg percentage
      let sum = 0;
      let count = 0;
      Object.entries(state.percentage[sectionId]).forEach(([key, value]) => {
        if (key !== "avg") {
          if (value === -1) {
            return;
          }
          sum += value;
          count++;
        }
      });
      updatedPercentage[sectionId]["avg"] = Math.round(sum / count);

      // Calculate overall avg percentage
      sum = 0;
      count = 0;
      Object.entries(state.percentage).forEach(([key, value]) => {
        if (key !== "overall") {
          sum += value.avg;
          count++;
        }
      });
      updatedPercentage.overall.avg = Math.round(sum / count);

      state.percentage = updatedPercentage;

      CacheStore.setPercentage(state.percentage, state.caseId);
    },
    updateCaseFields: (state, action: PayloadAction<AsylumCaseProfileOptional>) => {
      ArrayFields.forEach(item => {
        const { field, overwriteField } = item;
        if (action.payload[overwriteField]) {
          _.set(state.applicationCase.profile, field, _.get(action.payload, field) ?? []);
          delete action.payload[overwriteField];
        }
      });

      const profile = _.merge(state.applicationCase.profile, action.payload);
      state.applicationCase.profile = profile;

      if (action.payload.supplementDocument) {
        Object.keys(action.payload.supplementDocument).forEach(key => {
          if (key.indexOf("SupportDocuments") > -1) {
            state.applicationCase.profile.supplementDocument[key] = action.payload.supplementDocument![key];
          }
        });
      }

      CacheStore.setProfile(state.applicationCase.profile, state.caseId);
    },
    updatePassportInfo: (state, action: PayloadAction<ParsePassportResponse>) => {
      const fieldKey = action.payload.fieldKey.replace(".passportDocumentId", "");
      let payload: any = {
        passportNumber: action.payload.idNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName || "N/A",
        genderMaleCheckbox: action.payload.gender === "Male" ? "true" : "false",
        genderFemaleCheckbox: action.payload.gender === "Female" ? "true" : "false",
        nationality: action.payload.nationality,
        birthDate: action.payload.birthDate,
        cityAndCountryOfBirth: action.payload.birthPlace,
        passportIssueCountry: action.payload.countryCode,
      };
      if (fieldKey.indexOf("applicant") > -1) {
        payload = {
          ...payload,
          expirationDate: action.payload.expireDate,
        };
      }
      const payloadToUpdate = getUpdateProfileData(fieldKey, payload, action.payload.fieldIndex);
      const profile = _.merge(state.applicationCase.profile, payloadToUpdate);
      Object.assign(state.applicationCase.profile, profile);
    },
    updateIdCardInfo: (state, action: PayloadAction<ParsePassportResponse>) => {
      const fieldKey = action.payload.fieldKey.replace(".passportDocumentId", "");
      const payload: any = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName || "N/A",
        genderMaleCheckbox: action.payload.gender === "Male" ? "true" : "false",
        genderFemaleCheckbox: action.payload.gender === "Female" ? "true" : "false",
        nationality: action.payload.nationality,
        birthDate: action.payload.birthDate,
        cityAndCountryOfBirth: action.payload.birthPlace,
      };
      const payloadToUpdate = getUpdateProfileData(fieldKey, payload, action.payload.fieldIndex);
      const profile = _.merge(state.applicationCase.profile, payloadToUpdate);
      Object.assign(state.applicationCase.profile, profile);
    },
    updateTravelDocumentInfo: (state, action: PayloadAction<ParsePassportResponse>) => {
      const fieldKey = action.payload.fieldKey.replace(".passportDocumentId", "");
      let payload: any = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName || "N/A",
        genderMaleCheckbox: action.payload.gender === "Male" ? "true" : "false",
        genderFemaleCheckbox: action.payload.gender === "Female" ? "true" : "false",
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
      const payloadToUpdate = getUpdateProfileData(fieldKey, payload, action.payload.fieldIndex);
      const profile = _.merge(state.applicationCase.profile, payloadToUpdate);
      Object.assign(state.applicationCase.profile, profile);
    },
    updateMarriageLicenseInfo: (state, action: PayloadAction<ParseMarriageCertificateResponse>) => {
      state.applicationCase.profile.supplementDocument.marriageCertificate = action.payload as MarriageCertificate;
    },
    syncUpMailingAndResidenceAddress: (state, action: PayloadAction<boolean>) => {
      const mailingAddressKeys = [
        "applicant.streetNumberAndNameOfMailingAddress",
        "applicant.aptNumberOfMailingAddress",
        "applicant.cityOfMailingAddress",
        "applicant.stateOfMailingAddress",
        "applicant.zipCodeOfMailingAddress",
        "applicant.telePhoneAreaCodeOfMailingAddress",
        "applicant.telePhoneAreaCodeOfMailingAddress,applicant.telePhoneNumberOfMailingAddress",
        "applicant.inCareOf",
      ];

      if (action.payload) {
        state.applicationCase.profile.applicant.streetNumberAndNameOfMailingAddress =
          state.applicationCase.profile.applicant.streetNumberAndName;
        state.applicationCase.profile.applicant.aptNumberOfMailingAddress =
          state.applicationCase.profile.applicant.aptNumber;
        state.applicationCase.profile.applicant.cityOfMailingAddress = state.applicationCase.profile.applicant.city;
        state.applicationCase.profile.applicant.stateOfMailingAddress = state.applicationCase.profile.applicant.state;
        state.applicationCase.profile.applicant.zipCodeOfMailingAddress =
          state.applicationCase.profile.applicant.zipCode;
        state.applicationCase.profile.applicant.telePhoneAreaCodeOfMailingAddress =
          state.applicationCase.profile.applicant.telePhoneAreaCode;
        state.applicationCase.profile.applicant.telePhoneNumberOfMailingAddress =
          state.applicationCase.profile.applicant.telePhoneNumber;
        state.applicationCase.profile.applicant.inCareOf = "N/A";

        mailingAddressKeys.forEach(key => {
          state.disabledFields = {
            ...state.disabledFields,
            [key]: "true",
          };
        });
      } else {
        state.applicationCase.profile.applicant.streetNumberAndNameOfMailingAddress = "";
        state.applicationCase.profile.applicant.aptNumberOfMailingAddress = "";
        state.applicationCase.profile.applicant.cityOfMailingAddress = "";
        state.applicationCase.profile.applicant.stateOfMailingAddress = "";
        state.applicationCase.profile.applicant.zipCodeOfMailingAddress = "";
        state.applicationCase.profile.applicant.telePhoneAreaCodeOfMailingAddress = "";
        state.applicationCase.profile.applicant.telePhoneNumberOfMailingAddress = "";
        state.applicationCase.profile.applicant.inCareOf = "";

        mailingAddressKeys.forEach(key => {
          state.disabledFields = {
            ...state.disabledFields,
            [key]: "false",
          };
        });
      }
    },
    replaceDocumentUrls: (state, action: PayloadAction<any[]>) => {
      state.documentUrls = action.payload;
    },
    clearDocumentUrls: state => {
      state.documentUrls = [];
    },
    updateUploadedDocuments: (state, action: PayloadAction<UploadedDocumentWithUrl[]>) => {
      state.uploadedDocuments = action.payload;
    },
    updateGeneratedDocuments: (state, action: PayloadAction<GeneratedDocument[]>) => {
      state.generatedDocuments = action.payload;
    },
    incrementSaveTimes: state => {
      state.saveTimes++;
    },
    updateAsylumType: (state, action: PayloadAction<"AFFIRMATIVE" | "DEFENSIVE">) => {
      state.asylumType = action.payload;
    },
    updateHighlightMissingFields: (state, action: PayloadAction<boolean>) => {
      state.highlightMissingFields = action.payload;
    },
    resetFormState: state => initialState,
  },
});

export const {
  resetFormState,
  updateCaseProfileAndProgress,
  updatePercentage,
  updateOnePercentage,
  updateCaseFields,
  updatePassportInfo,
  updateIdCardInfo,
  updateTravelDocumentInfo,
  updateMarriageLicenseInfo,
  syncUpMailingAndResidenceAddress,
  replaceDocumentUrls,
  clearDocumentUrls,
  updateUploadedDocuments,
  updateGeneratedDocuments,
  updateAsylumType,
  updateHighlightMissingFields,
  incrementSaveTimes,
} = formSlice.actions;

export default formSlice.reducer;
