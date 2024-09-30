import { PayloadAction, createSlice, original } from "@reduxjs/toolkit";
import _ from "lodash";
import { CacheStore } from "../cache/cache";
import {
  InitialAddressHistoryBeforeUS,
  InitialAsylumProfile,
  InitialChild,
  InitialEducationHistory,
  InitialEmploymentHistory,
  InitialEntryRecord,
  InitialFamilyMember,
  InitialMember,
  InitialUSAddressHistoryPast5Y,
} from "../consts/caseConsts";
import { ExcludedSectionsFromPercentage, InitialApplicationCase } from "../consts/consts";
import {
  ApplicationCase,
  GeneratedDocument,
  MarriageCertificate,
  ParsePassportResponse,
  Percentage,
  Progress,
  UploadedDocumentWithUrl,
} from "../model/apiModels";
import { ParseMarriageCertificateResponse } from "../model/apiReqResModels";
import { CaseProfile, CaseProfileOptional } from "../model/commonApiModels";
import { KeyValues } from "../model/commonModels";
import { CaseType } from "../model/immigrationTypes";
import { getUpdateProfileData } from "../utils/utils";
import { InitialFamilyBasedProfile } from "../consts/familyBasedConsts";
import { deepAssign } from "../utils/caseUtils";

export interface FormState {
  caseId: number;
  applicationCase: ApplicationCase;
  percentage: Percentage;
  saveTimes: number;
  documentUrls: any[];
  uploadedDocuments: UploadedDocumentWithUrl[];
  generatedDocuments: GeneratedDocument[];
  mergedDocuments: GeneratedDocument[];
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
  mergedDocuments: [],
  highlightMissingFields: false,
  disabledFields: {},
};

/**
 * Deeply overwrite the target object with the update object, like array fields in the application case
 * @param update
 * @param target
 * @returns
 */
function deepOverwrite(update: any, target: any) {
  for (const key in update) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const value = update[key];
      if (Array.isArray(value)) {
        if (value.length === 0) {
          target[key] = [];
        } else {
          for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === "object") {
              target[key][i] = deepOverwrite(value[i], target[key][i]);
            } else {
              target[key] = value;
              break;
            }
          }
        }
      } else if (typeof value === "object") {
        target[key] = deepOverwrite(value, target[key]);
      } else {
        target[key] = value;
      }
    }
  }
  return target;
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
    updateCaseProfileAndProgress: (
      state,
      action: PayloadAction<{
        caseId: number;
        caseType: string;
        profile: CaseProfile;
        progress: Progress;
        percentage: Percentage;
      }>,
    ) => {
      state.caseId = action.payload.caseId;

      if (action.payload.caseType === CaseType.Asylum) {
        const updatedProfile = deepAssign(
          action.payload.profile,
          state.applicationCase.asylumProfile,
          InitialAsylumProfile,
        );
        if (!state.applicationCase.asylumProfile) {
          state.applicationCase.asylumProfile = updatedProfile;
        } else {
          Object.assign(state.applicationCase.asylumProfile, updatedProfile);
        }
        CacheStore.setProfile(updatedProfile, action.payload.caseId);
      }

      if (action.payload.caseType === CaseType.FamilyBased) {
        const updatedProfile = deepAssign(
          action.payload.profile,
          state.applicationCase.familyBasedProfile,
          InitialFamilyBasedProfile,
        );
        if (!state.applicationCase.familyBasedProfile) {
          state.applicationCase.familyBasedProfile = updatedProfile;
        } else {
          Object.assign(state.applicationCase.familyBasedProfile, updatedProfile);
        }
        CacheStore.setProfile(updatedProfile, action.payload.caseId);
      }

      console.log("FamilyBasedProfile:", JSON.stringify(state.applicationCase.familyBasedProfile, null, 2));

      Object.assign(state.applicationCase.progress, action.payload.progress);
      CacheStore.setProgress(action.payload.progress, action.payload.caseId);

      state.percentage = action.payload.percentage;
      CacheStore.setPercentage(state.percentage, action.payload.caseId);
    },
    updatePercentage: (state, action: PayloadAction<Percentage>) => {
      state.percentage = action.payload;
      const fillingApplicationStep = state.applicationCase.progress?.steps.find(
        step => step.name === "FILLING_APPLICATION",
      );
      const fillingDetailsSubStep = fillingApplicationStep?.substeps.find(
        subStep => subStep.name === "FILLING_DETAILS",
      );
      if (fillingDetailsSubStep) {
        fillingDetailsSubStep.metadata = JSON.stringify({ percentage: action.payload });
      }
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

      ExcludedSectionsFromPercentage.forEach(referenceId => {
        delete updatedPercentage[sectionId][referenceId];
      });

      state.percentage = updatedPercentage;
      const fillingApplicationStep = state.applicationCase.progress?.steps.find(
        step => step.name === "FILLING_APPLICATION",
      );
      const fillingDetailsSubStep = fillingApplicationStep?.substeps.find(
        subStep => subStep.name === "FILLING_DETAILS",
      );
      if (fillingDetailsSubStep) {
        fillingDetailsSubStep.metadata = JSON.stringify({ percentage: updatedPercentage });
      }
      CacheStore.setPercentage(state.percentage, state.caseId);
    },

    updateCaseFields: (state, action: PayloadAction<{ update: CaseProfileOptional; caseType: CaseType }>) => {
      /** Asylum */
      if (action.payload.caseType === CaseType.Asylum) {
        ArrayFields.forEach(item => {
          const { field, overwriteField } = item;
          if (action.payload.update[overwriteField]) {
            _.set(state.applicationCase.asylumProfile, field, _.get(action.payload.update, field) ?? []);
            delete action.payload.update[overwriteField];
          }
        });

        let profile: any;
        if (action.payload.update.overwrite) {
          profile = deepOverwrite(action.payload.update, state.applicationCase.asylumProfile);
        } else {
          profile = _.merge(state.applicationCase.asylumProfile, action.payload.update);
        }

        state.applicationCase.asylumProfile = profile;

        if (action.payload.update.supplementDocument) {
          Object.keys(action.payload.update.supplementDocument).forEach(key => {
            if (key.indexOf("SupportDocuments") > -1) {
              state.applicationCase.asylumProfile.supplementDocument[key] =
                action.payload.update.supplementDocument![key];
            }
          });
        }

        CacheStore.setProfile(state.applicationCase.asylumProfile, state.caseId);
        /** Family based */
      } else if (action.payload.caseType === CaseType.FamilyBased) {
        let profile: any;
        if (action.payload.update.overwrite) {
          profile = deepOverwrite(action.payload.update, state.applicationCase.familyBasedProfile);
        } else {
          profile = _.merge(state.applicationCase.familyBasedProfile, action.payload.update);
        }
        console.log("FamilyBasedProfile22:", JSON.stringify(state.applicationCase.familyBasedProfile, null, 2));

        state.applicationCase.familyBasedProfile = profile;
        CacheStore.setProfile(state.applicationCase.familyBasedProfile, state.caseId);
      }
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
      const profile = _.merge(state.applicationCase.asylumProfile, payloadToUpdate);
      Object.assign(state.applicationCase.asylumProfile, profile);
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
      const profile = _.merge(state.applicationCase.asylumProfile, payloadToUpdate);
      Object.assign(state.applicationCase.asylumProfile, profile);
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
      const profile = _.merge(state.applicationCase.asylumProfile, payloadToUpdate);
      Object.assign(state.applicationCase.asylumProfile, profile);
    },
    updateMarriageLicenseInfo: (state, action: PayloadAction<ParseMarriageCertificateResponse>) => {
      state.applicationCase.asylumProfile.supplementDocument.marriageCertificate =
        action.payload as MarriageCertificate;
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
        state.applicationCase.asylumProfile.applicant.streetNumberAndNameOfMailingAddress =
          state.applicationCase.asylumProfile.applicant.streetNumberAndName;
        state.applicationCase.asylumProfile.applicant.aptNumberOfMailingAddress =
          state.applicationCase.asylumProfile.applicant.aptNumber;
        state.applicationCase.asylumProfile.applicant.cityOfMailingAddress =
          state.applicationCase.asylumProfile.applicant.city;
        state.applicationCase.asylumProfile.applicant.stateOfMailingAddress =
          state.applicationCase.asylumProfile.applicant.state;
        state.applicationCase.asylumProfile.applicant.zipCodeOfMailingAddress =
          state.applicationCase.asylumProfile.applicant.zipCode;
        state.applicationCase.asylumProfile.applicant.telePhoneAreaCodeOfMailingAddress =
          state.applicationCase.asylumProfile.applicant.telePhoneAreaCode;
        state.applicationCase.asylumProfile.applicant.telePhoneNumberOfMailingAddress =
          state.applicationCase.asylumProfile.applicant.telePhoneNumber;
        state.applicationCase.asylumProfile.applicant.inCareOf = "N/A";

        mailingAddressKeys.forEach(key => {
          state.disabledFields = {
            ...state.disabledFields,
            [key]: "true",
          };
        });
      } else {
        state.applicationCase.asylumProfile.applicant.streetNumberAndNameOfMailingAddress = "";
        state.applicationCase.asylumProfile.applicant.aptNumberOfMailingAddress = "";
        state.applicationCase.asylumProfile.applicant.cityOfMailingAddress = "";
        state.applicationCase.asylumProfile.applicant.stateOfMailingAddress = "";
        state.applicationCase.asylumProfile.applicant.zipCodeOfMailingAddress = "";
        state.applicationCase.asylumProfile.applicant.telePhoneAreaCodeOfMailingAddress = "";
        state.applicationCase.asylumProfile.applicant.telePhoneNumberOfMailingAddress = "";
        state.applicationCase.asylumProfile.applicant.inCareOf = "";

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
    updateMergedDocuments: (state, action: PayloadAction<GeneratedDocument[]>) => {
      state.mergedDocuments = action.payload;
    },
    incrementSaveTimes: state => {
      state.saveTimes++;
    },
    updateHighlightMissingFields: (state, action: PayloadAction<boolean>) => {
      state.highlightMissingFields = action.payload;
    },
    resetFormState: state => {
      CacheStore.clear();
      return initialState;
    },
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
  updateMergedDocuments,
  updateHighlightMissingFields,
  incrementSaveTimes,
} = formSlice.actions;

export default formSlice.reducer;
