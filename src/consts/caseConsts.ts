import { AddressHistory, ApplicationCase, Child, EntryRecord, FamilyMember, Spouse } from "../model/apiModels";

export const InitialApplicant = {
  passportDocumentId: 0,
  alienNumber: "",
  ssn: "",
  uscisOnlineAccountNumber: "",
  lastName: "",
  firstName: "",
  middleName: "",
  namesUsedBefore: "",
  streetNumberAndName: "",
  aptNumber: "",
  city: "",
  state: "",
  zipCode: "",
  telePhoneAreaCode: "",
  telePhoneNumber: "",
  inCareOf: "",
  telePhoneAreaCodeOfMailingAddress: "",
  telePhoneNumberOfMailingAddress: "",
  streetNumberAndNameOfMailingAddress: "",
  aptNumberOfMailingAddress: "",
  cityOfMailingAddress: "",
  stateOfMailingAddress: "",
  zipCodeOfMailingAddress: "",
  genderMaleCheckbox: null,
  genderFemaleCheckbox: null,
  maritalStatusSingleCheckbox: null,
  maritalStatusMarriedCheckbox: null,
  maritalStatusDivorcedCheckbox: null,
  maritalStatusWidowedCheckbox: null,
  birthDate: "",
  cityAndCountryOfBirth: "",
  nationality: "",
  nationalityAtBirth: "",
  race: "",
  religion: "",
  immigrationCourtProceedingACheckbox: null,
  immigrationCourtProceedingBCheckbox: null,
  immigrationCourtProceedingCCheckbox: null,
  whenLastLeaveCountry: "",
  i94Number: "",
  entryRecords: [],
  statusExpireDate: "",
  passportIssueCountry: "",
  passportNumber: "",
  travelDocumentNumber: "",
  nativeLanguage: "",
  expirationDate: "",
  fluentEnglishYesCheckbox: null,
  fluentEnglishNoCheckbox: null,
  otherFluentLanguages: "",
  haveNoChildrenCheckbox: null,
  haveChildrenCheckbox: null,
  childrenCnt: 0,
  notMarriedCheckbox: null,
};

export const InitialFamily = {
  mother: {
    part: "",
    question: "",
    name: "",
    cityTownAndBirth: "",
    location: "",
    deceasedCheckbox: "",
  },
  father: {
    part: "",
    question: "",
    name: "",
    cityTownAndBirth: "",
    location: "",
    deceasedCheckbox: "",
  },
  children: [],
  siblings: [],
  spouse: {},
};

export const InitialBackground = {
  addressHistoriesBeforeUS: [],
  usAddressHistoriesPast5Years: [],
  educationHistories: [],
  employmentHistories: [],
};

export const InitialApplicationDetails = {
  asylumBasedOnRaceCheckbox: null,
  asylumBasedOnReligionCheckbox: null,
  asylumBasedOnNationalityCheckbox: null,
  asylumBasedOnPoliticalOptionCheckbox: null,
  asylumBasedOnParticularMembershipCheckbox: null,
  asylumBasedOnTortureConventionCheckbox: null,
  haveBeenHarmedYesCheckbox: null,
  haveBeenHarmedNoCheckbox: null,
  explainHaveBeenHarmedYes: "",
  explainHaveBeenHarmedYesPart: "",
  explainHaveBeenHarmedYesQuestion: "",
  fearReturnYesCheckbox: null,
  fearReturnNoCheckbox: null,
  explainFearReturnYes: "",
  explainFearReturnYesPart: "",
  explainFearReturnYesQuestion: "",
  familyMembersBeenChargedYesCheckbox: null,
  familyMembersBeenChargedNoCheckbox: null,
  explainFamilyMembersBeenChargedYes: "",
  explainFamilyMembersBeenChargedYesPart: "",
  explainFamilyMembersBeenChargedYesQuestion: "",
  youOrFamilyBelongAnyOrganizationYesCheckbox: null,
  youOrFamilyBelongAnyOrganizationNoCheckbox: null,
  explainYouOrFamilyBelongAnyOrganizationYes: "",
  explainYouOrFamilyBelongAnyOrganizationYesPart: "",
  explainYouOrFamilyBelongAnyOrganizationYesQuestion: "",
  youOrFamilyContinueBelongAnyOrganizationYesCheckbox: null,
  youOrFamilyContinueBelongAnyOrganizationNoCheckbox: null,
  explainYouOrFamilyContinueBelongAnyOrganizationYes: "",
  explainYouOrFamilyContinueBelongAnyOrganizationYesPart: "",
  explainYouOrFamilyContinueBelongAnyOrganizationYesQuestion: "",
  afraidOfReturnYesCheckbox: null,
  afraidOfReturnNoCheckbox: null,
  explainAfraidOfReturnYes: "",
  explainAfraidOfReturnYesPart: "",
  explainAfraidOfReturnYesQuestion: "",
  appliedBeforeYesCheckbox: null,
  appliedBeforeNoCheckbox: null,
  explainAppliedBeforeYes: "",
  explainAppliedBeforeYesPart: "",
  explainAppliedBeforeYesQuestion: "",
  stayInOtherCountryYesCheckbox: null,
  stayInOtherCountryNoCheckbox: null,
  anyLawfulStatusAnyCountryYesCheckbox: null,
  anyLawfulStatusAnyCountryNoCheckbox: null,
  explainAnyLawfulStatusAnyCountryYes: "",
  explainAnyLawfulStatusAnyCountryYesPart: "",
  explainAnyLawfulStatusAnyCountryYesQuestion: "",
  haveYouHarmOthersYesCheckbox: null,
  haveYouHarmOthersNoCheckbox: null,
  explainHaveYouHarmOthersYes: "",
  explainHaveYouHarmOthersYesPart: "",
  explainHaveYouHarmOthersYesQuestion: "",
  returnCountryYesCheckbox: null,
  returnCountryNoCheckbox: null,
  explainReturnCountryYes: "",
  explainReturnCountryYesPart: "",
  explainReturnCountryYesQuestion: "",
  moreThanOneYearAfterArrivalYesCheckbox: null,
  moreThanOneYearAfterArrivalNoCheckbox: null,
  explainMoreThanOneYearAfterArrivalYes: "",
  explainMoreThanOneYearAfterArrivalYesPart: "",
  explainMoreThanOneYearAfterArrivalYesQuestion: "",
  haveCommittedCrimeYesCheckbox: null,
  haveCommittedCrimeNoCheckbox: null,
  explainHaveCommittedCrimeYes: "",
  explainHaveCommittedCrimeYesPart: "",
  explainHaveCommittedCrimeYesQuestion: "",
};

export const InitialSignature = {
  name: "",
  nameInNativeAlphabet: "",
  familyMemberAssistYesCheckbox: null,
  familyMemberAssistNoCheckbox: null,
  members: [],
  otherPeopleAssistYesCheckbox: null,
  otherPeopleAssistNoCheckbox: null,
  providePeopleCounselYesCheckbox: null,
  providePeopleCounselNoCheckbox: null,
  signature: "",
  date: "",
};

export const InitialDeclaration = {
  preparerSignature: "",
  completeName: "",
  teleNumberAreacode: "",
  teleNumber: "",
  streetNumberAndName: "",
  aptNumber: "",
  city: "",
  state: "",
  zipCode: "",
  g28FormAttachedYesCheckbox: null,
  attorneyStateNarNumber: "",
  attorneyUscisOnlineAccountNumber: "",
};

export const InitialApplicationCase: ApplicationCase = {
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
  progress: { steps: [] },
  profile: {
    applyForWithholdingYesCheckbox: "",
    applicant: InitialApplicant,
    family: InitialFamily,
    background: InitialBackground,
    applicationDetails: InitialApplicationDetails,
    signature: InitialSignature,
    declaration: InitialDeclaration,
  },
};

export const InitialSpouse: Spouse = {
  passportDocumentId: "",
  notMarriedCheckbox: "",
  alienNumber: "",
  passportNumber: "",
  birthDate: "",
  ssn: "",
  lastName: "",
  firstName: "",
  middleName: "",
  namesUsedBefore: "",
  marriageDate: "",
  marriagePlace: "",
  cityAndCountryOfBirth: "",
  nationality: "",
  race: "",
  genderMaleCheckbox: null,
  genderFemaleCheckbox: null,
  personInUSYesCheckbox: null,
  personInUSNoCheckbox: null,
  specifyLocationIfNotInUS: "",
  placeLastEntryIntoUS: "",
  lastEntryUSDate: "",
  i94Number: "",
  lastAdmittedStatus: "",
  currentStatus: "",
  statusExpireDate: "",
  immigrationCourtProceedingYesCheckbox: null,
  immigrationCourtProceedingNoCheckbox: null,
  previousArrivalDate: "",
  inThisApplicationYesCheckbox: null,
  inThisApplicationNoCheckbox: null,
};

export const InitialEntryRecord: EntryRecord = {
  date: "",
  place: "",
  status: "",
};

export const InitialChild: Child = {
  passportDocumentId: "",
  alienNumber: "",
  passportNumber: "",
  martialStatus: "",
  ssn: "",
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: "",
  cityAndCountryOfBirth: "",
  nationality: "",
  race: "",
  genderMaleCheckbox: null,
  genderFemaleCheckbox: null,
  personInUSYesCheckbox: null,
  personInUSNoCheckbox: null,
  specifyLocationIfNotInUS: "",
  placeLastEntryIntoUS: "",
  lastEntryUSDate: "",
  i94Number: "",
  lastAdmittedStatus: "",
  currentStatus: "",
  statusExpireDate: "",
  immigrationCourtProceedingYesCheckbox: null,
  immigrationCourtProceedingNoCheckbox: null,
  inThisApplicationYesCheckbox: null,
  inThisApplicationNoCheckbox: null,
};

export const InitialFamilyMember: FamilyMember = {
  name: "",
  cityTownAndBirth: "",
  location: "",
  deceasedCheckbox: "",
};

export const InitialAddressHistoryBeforeUS: AddressHistory = {
  numberAndStreet: "",
  city: "",
  province: "",
  country: "",
  startDate: "",
  endDate: "",
};

export const InitialUSAddressHistoryPast5Y: AddressHistory = {
  numberAndStreet: "",
  city: "",
  province: "",
  country: "",
  startDate: "",
  endDate: "",
};

export const InitialEducationHistory = {
  schoolName: "",
  schoolType: "",
  location: "",
  startDate: "",
  endDate: "",
};

export const InitialEmploymentHistory = {
  nameAndAddress: "",
  occupation: "",
  startDate: "",
  endDate: "",
};

export const InitialMember = {
  name: "",
  relationship: "",
};
