import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ApplicationCase,
  CaseProfile,
  Document,
  Task,
} from "../model/ApiModals";

export interface FormState {
  id: number;
  userId: number;
  applicantName: string;
  taskList: Task[];
  type: string;
  status: string;
  caseProfile: CaseProfile;
  submitted: number;
  updatedAt: number;
  createdAt: number;
}

const initialDocument: Document = {
  id: 0,
  userId: 0,
  caseId: 0,
  status: "",
  type: "",
  name: "",
  s3Location: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const initialState: FormState = {
  id: 0,
  userId: 0,
  applicantName: "",
  taskList: [],
  type: "",
  status: "",
  caseProfile: {
    baseInfo: {
      immigrationType: "",
      reason: "",
      married: undefined,
      includeSpouse: undefined,
      childrenNum: 0,
      includeChildrenNum: 0,
      fairTreatment: undefined,
      estimatePrice: 0,
    },
    applicantInfo: {
      passport: initialDocument,
      firstName: "",
      middleName: "",
      lastName: "",
      nationality: "",
      race: "",
      birthInDifferentCountry: undefined,
      birthCountry: "",
      birthCity: "",
      age: "",
      gender: "",
      identifyNumber: "",
      birthDate: "",
      aNumber: "",
      ssn: "",
      uscisOnlineAccountNumber: "",
      usPhoneNumber: "",
      usEmail: "",
      namesUsedBefore: [],
      streetNumberAndName: "",
      aptNumber: "",
      city: "",
      state: "",
      zipCode: "",
      telePhoneNumber: "",
      inCareOf: "",
      streetNumberAndNameOfMailingAddress: "",
      aptNumberOfMailingAddress: "",
      cityOfMailingAddress: "",
      stateOfMailingAddress: "",
      zipCodeOfMailingAddress: "",
      telePhoneNumberOfMailingAddress: "",
    },
    spouseInfo: {
      passport: initialDocument,
      firstName: "",
      middleName: "",
      lastName: "",
      nationality: "",
      race: "",
      birthInDifferentCountry: undefined,
      birthCountry: "",
      birthCity: "",
      identifyNumber: "",
      birthDate: "",
      age: "",
      gender: "",
      inUSA: undefined,
      includedInThisApplication: undefined,
      aNumber: "",
      ssn: "",
      uscisOnlineAccountNumber: "",
      usPhoneNumber: "",
      usEmail: "",
      namesUsedBefore: [],
      marriageLicense: initialDocument,
      marryAtSameCountry: undefined,
      marryAtOtherCountry: "",
      marryCity: "",
      addressSameAsApplicant: undefined,
      address: "",
      entryUsLastDate: "",
      legalEntryUS: undefined,
      entryUSPort: "",
      visaType: "",
      i94Number: "",
      stayExpiredDate: "",
      iImmiCourtProceeding: undefined,
      entryRecords: [],
      previousArrivalTime: "",
    },
    childInfo: {
      passport: initialDocument,
      firstName: "",
      middleName: "",
      lastName: "",
      nationality: "",
      race: "",
      birthInDifferentCountry: undefined,
      birthCountry: "",
      birthCity: "",
      identifyNumber: "",
      birthDate: "",
      age: "",
      gender: "",
      aNumber: "",
      ssn: "",
      inUSA: undefined,
      location: "",
      includedInThisApplication: undefined,
      addressSameAsApplicant: undefined,
      address: "",
      entryUsLastDate: "",
      legalEntryUS: undefined,
      entryUSPort: "",
      visaType: "",
      i94Number: "",
      stayExpiredDate: "",
      iImmiCourtProceeding: undefined,
      previousArrivalTime: "",
    },
  },
  submitted: Date.now(),
  updatedAt: Date.now(),
  createdAt: Date.now(),
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormState: (state, action: PayloadAction<ApplicationCase>) => {
      state = action.payload;
    },
  },
});

export const { updateFormState } = formSlice.actions;

export default formSlice.reducer;
