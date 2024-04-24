export interface UserInfo {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  cognitoUsername: string;
  status: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  nationality: string;
  gender: string;
  bitrhPlace: string;
  address: string;
  stripeCustomerId: string;
  stripeAccountId: string;
  stripePaymentMethodId: string;
  lastLoginAt: string;
  createdAt: number;
  updatedAt: number;
}

export interface Case {
  applicantName: string;
  assignedLawyer: string;
  createdAt: string;
  currentStep: string;
  id: number;
  paid: boolean;
  profile: string;
  status: string;
  submittedAt: string;
  taskList: string;
  type: string;
  updatedAt: string;
  uscisReceiptNumber: string;
  userId: number;
}

export interface UpdateApplicationCaseData {
  id: number;
  userId: number;
  applicantName: string;
  type: string;
  currentStep: string;
  status: string;
  taskList: Task[];
  profile: AsylumCaseProfile;
  submittedAt: number;
  paid: boolean;
  uscisReceiptNumber: string;
  assignedLawyer: number;
  createdAt: number;
  updatedAt: number;
}

export interface ApplicationCase {
  id: number;
  userId: number;
  applicantName: string;
  type: string;
  currentStep: string;
  status: string;
  taskList: Task[];
  profile: AsylumCaseProfile;
  submittedAt: number;
  paid: boolean;
  uscisReceiptNumber: string;
  assignedLawyer: number;
  createdAt: number;
  updatedAt: number;
}

export interface Task {
  id: number;
  caseId: number;
  userId: number;
  status: string;
  description: string;
  dueAt: number;
  completedAt: number;
  createdAt: number;
  updatedAt: number;
}

export interface AsylumCaseProfile {
  applyForWithholdingYesCheckbox: string;
  applicant: Applicant;
  family: Family;
  background: Background;
  applicationDetails: ApplicationDetails;
  signature: YourSignature;
  declaration: Declaration;
}

export type ParentFieldKey =
  | "applicant"
  | "family"
  | "background"
  | "applicationDetails"
  | "signature"
  | "declaration";

export type FieldKey =
  | keyof Applicant
  | keyof Family
  | keyof Background
  | keyof ApplicationDetails
  | keyof YourSignature
  | keyof Declaration;

export interface Applicant {
  passportDocumentId?: string;
  aNumber?: string;
  ssn?: string;
  uscisOnlineAccountNumber?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  namesUsedBefore?: string;
  streetNumberAndName?: string;
  aptNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  telePhoneAreaCode?: string;
  telePhoneNumber?: string;
  inCareOf?: string;
  telePhoneAreaCodeOfMailingAddress?: string;
  telePhoneNumberOfMailingAddress?: string;
  streetNumberAndNameOfMailingAddress?: string;
  aptNumberOfMailingAddress?: string;
  cityOfMailingAddress?: string;
  stateOfMailingAddress?: string;
  zipCodeOfMailingAddress?: string;
  genderMaleCheckbox?: boolean | null;
  genderFemaleCheckbox?: boolean | null;
  maritalStatusSingleCheckbox?: boolean | null;
  maritalStatusMarriedCheckbox?: boolean | null;
  maritalStatusDivorcedCheckbox?: boolean | null;
  maritalStatusWidowedCheckbox?: boolean | null;
  birthDate?: string;
  cityAndCountryOfBirth?: string;
  nationality?: string;
  nationalityAtBirth?: string;
  race?: string;
  religion?: string;
  immigrationCourtProceedingACheckbox?: boolean | null;
  immigrationCourtProceedingBCheckbox?: boolean | null;
  immigrationCourtProceedingCCheckbox?: boolean | null;
  whenLastLeaveCountry?: string;
  i94Number?: string;
  entryRecords?: EntryRecord[];
  statusExpireDate?: string;
  passportIssueCountry?: string;
  passportNumber?: string;
  travelDocumentNumber?: string;
  nativeLanguage?: string;
  expirationDate?: string;
  fluentEnglishYesCheckbox?: boolean | null;
  fluentEnglishNoCheckbox?: boolean | null;
  otherFluentLanguages?: string;
  haveNoChildrenCheckbox?: boolean | null;
  haveChildrenCheckbox?: boolean | null;
  childrenCnt?: string;
  notMarriedCheckbox?: boolean | null;
}

export interface EntryRecord {
  date: string;
  port: string;
}

export interface Family {
  spouse?: Spouse;
  children?: Child[];
  mother?: FamilyMember;
  father?: FamilyMember;
  siblings?: FamilyMember[];
}

export interface Spouse {
  passportDocumentId: string;
  notMarriedCheckbox: string;
  aNumber: string;
  passportNumber: string;
  birthDate: string;
  ssn: string;
  lastName: string;
  firstName: string;
  middleName: string;
  namesUsedBefore: string;
  marriageDate: string;
  marriagePlace: string;
  cityAndCountryOfBirth: string;
  nationality: string;
  race: string;
  genderMaleCheckbox: boolean;
  genderFemaleCheckbox: boolean;
  personInUSYesCheckbox: boolean;
  personInUSNoCheckbox: boolean;
  specifyLocationIfNotInUS: string;
  placeLastEntryIntoUS: string;
  lastEntryUSDate: string;
  i94Number: string;
  lastAdmittedStatus: string;
  currentStatus: string;
  statusExpireDate: string;
  immigrationCourtProceedingYesCheckbox: boolean;
  immigrationCourtProceedingNoCheckbox: boolean;
  previousArrivalDate: string;
  inThisApplicationYesCheckbox: boolean;
  inThisApplicationNoCheckbox: boolean;
}

export interface Child {
  passportDocumentId: string;
  aNumber: string;
  passportNumber: string;
  martialStatus: string;
  ssn: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  cityAndCountryOfBirth: string;
  nationality: string;
  race: string;
  genderMaleCheckbox: boolean;
  genderFemaleCheckbox: boolean;
  personInUSYesCheckbox: boolean;
  personInUSNoCheckbox: boolean;
  specifyLocationIfNotInUS: string;
  placeLastEntryIntoUS: string;
  lastEntryUSDate: string;
  i94Number: string;
  lastAdmittedStatus: string;
  currentStatus: string;
  statusExpireDate: string;
  immigrationCourtProceedingYesCheckbox: boolean;
  immigrationCourtProceedingNoCheckbox: boolean;
  inThisApplicationYesCheckbox: boolean;
  inThisApplicationNoCheckbox: boolean;
}

export interface FamilyMember {
  part: string;
  question: string;
  name: string;
  cityTownAndBirth: string;
  location: string;
  deceasedCheckbox: string;
}

export interface Background {
  addressHistoriesBeforeUS?: AddressHistory[];
  usAddressHistoriesPast5Years?: AddressHistory[];
  educationHistories?: EducationHistory[];
  employmentHistories?: EmploymentHistory[];
}

export interface AddressHistory {
  part: string;
  question: string;
  numberAndStreet: string;
  city: string;
  province: string;
  country: string;
  startDate: string;
  endDate: string;
}

export interface EducationHistory {
  part: string;
  question: string;
  schoolName: string;
  schoolType: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface EmploymentHistory {
  part: string;
  question: string;
  nameAndAddress: string;
  occupation: string;
  startDate: string;
  endDate: string;
}

export interface ApplicationDetails {
  asylumBasedOnRaceCheckbox?: boolean | null;
  asylumBasedOnReligionCheckbox?: boolean | null;
  asylumBasedOnNationalityCheckbox?: boolean | null;
  asylumBasedOnPoliticalOptionCheckbox?: boolean | null;
  asylumBasedOnParticularMembershipCheckbox?: boolean | null;
  asylumBasedOnTortureConventionCheckbox?: boolean | null;
  haveBeenHarmedYesCheckbox?: boolean | null;
  haveBeenHarmedNoCheckbox?: boolean | null;
  explainHaveBeenHarmedYes?: string;
  explainHaveBeenHarmedYesPart?: string;
  explainHaveBeenHarmedYesQuestion?: string;
  fearReturnYesCheckbox?: boolean | null;
  fearReturnNoCheckbox?: boolean | null;
  explainFearReturnYes?: string;
  explainFearReturnYesPart?: string;
  explainFearReturnYesQuestion?: string;
  familyMembersBeenChargedYesCheckbox?: boolean | null;
  familyMembersBeenChargedNoCheckbox?: boolean | null;
  explainFamilyMembersBeenChargedYes?: string;
  explainFamilyMembersBeenChargedYesPart?: string;
  explainFamilyMembersBeenChargedYesQuestion?: string;
  youOrFamilyBelongAnyOrganizationYesCheckbox?: boolean | null;
  youOrFamilyBelongAnyOrganizationNoCheckbox?: boolean | null;
  explainYouOrFamilyBelongAnyOrganizationYes?: string;
  explainYouOrFamilyBelongAnyOrganizationYesPart?: string;
  explainYouOrFamilyBelongAnyOrganizationYesQuestion?: string;
  youOrFamilyContinueBelongAnyOrganizationYesCheckbox?: boolean | null;
  youOrFamilyContinueBelongAnyOrganizationNoCheckbox?: boolean | null;
  explainYouOrFamilyContinueBelongAnyOrganizationYes?: string;
  explainYouOrFamilyContinueBelongAnyOrganizationYesPart?: string;
  explainYouOrFamilyContinueBelongAnyOrganizationYesQuestion?: string;
  afraidOfReturnYesCheckbox?: boolean | null;
  afraidOfReturnNoCheckbox?: boolean | null;
  explainAfraidOfReturnYes?: string;
  explainAfraidOfReturnYesPart?: string;
  explainAfraidOfReturnYesQuestion?: string;
  appliedBeforeYesCheckbox?: boolean | null;
  appliedBeforeNoCheckbox?: boolean | null;
  explainAppliedBeforeYes?: string;
  explainAppliedBeforeYesPart?: string;
  explainAppliedBeforeYesQuestion?: string;
  stayInOtherCountryYesCheckbox?: boolean | null;
  stayInOtherCountryNoCheckbox?: boolean | null;
  anyLawfulStatusAnyCountryYesCheckbox?: boolean | null;
  anyLawfulStatusAnyCountryNoCheckbox?: boolean | null;
  explainAnyLawfulStatusAnyCountryYes?: string;
  explainAnyLawfulStatusAnyCountryYesPart?: string;
  explainAnyLawfulStatusAnyCountryYesQuestion?: string;
  haveYouHarmOthersYesCheckbox?: boolean | null;
  haveYouHarmOthersNoCheckbox?: boolean | null;
  explainHaveYouHarmOthersYes?: string;
  explainHaveYouHarmOthersYesPart?: string;
  explainHaveYouHarmOthersYesQuestion?: string;
  returnCountryYesCheckbox?: boolean | null;
  returnCountryNoCheckbox?: boolean | null;
  explainReturnCountryYes?: string;
  explainReturnCountryYesPart?: string;
  explainReturnCountryYesQuestion?: string;
  moreThanOneYearAfterArrivalYesCheckbox?: boolean | null;
  moreThanOneYearAfterArrivalNoCheckbox?: boolean | null;
  explainMoreThanOneYearAfterArrivalYes?: string;
  explainMoreThanOneYearAfterArrivalYesPart?: string;
  explainMoreThanOneYearAfterArrivalYesQuestion?: string;
  haveCommittedCrimeYesCheckbox?: boolean | null;
  haveCommittedCrimeNoCheckbox?: boolean | null;
  explainHaveCommittedCrimeYes?: string;
  explainHaveCommittedCrimeYesPart?: string;
  explainHaveCommittedCrimeYesQuestion?: string;
}

export interface YourSignature {
  name?: string;
  nameInNativeAlphabet?: string;
  familyMemberAssistYesCheckbox?: boolean | null;
  familyMemberAssistNoCheckbox?: boolean | null;
  members?: Relationship[];
  otherPeopleAssistYesCheckbox?: boolean | null;
  otherPeopleAssistNoCheckbox?: boolean | null;
  providePeopleCounselYesCheckbox?: boolean | null;
  providePeopleCounselNoCheckbox?: boolean | null;
  signature?: string;
  date?: string;
}

export interface Relationship {
  name: string;
  relationship: string;
}

export interface Declaration {
  preparerSignature?: string;
  completeName?: string;
  teleNumberAreacode?: string;
  teleNumber?: string;
  streetNumberAndName?: string;
  aptNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  g28FormAttachedYesCheckbox?: boolean | null;
  attorneyStateNarNumber?: string;
  attorneyUscisOnlineAccountNumber?: string;
}

export interface GeneratePresignedUrlResponse {
  documentId: number;
  presignedUrl: string;
}

export interface ParsePassportResponse {
  passportNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string; // format is mm/dd/yyyy
  birthPlace: string;
  nationality: string;
  gender: string;
  expireDate: string;
}
