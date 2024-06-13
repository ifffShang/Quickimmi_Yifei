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
  birthPlace: string;
  address: string;
  stripeCustomerId: string;
  stripeAccountId: string;
  stripePaymentMethodId: string;
  lastLoginAt: string;
  createdAt: number;
  updatedAt: number;
  role: string;
  asylumtype: string;
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

// export interface AsylumType {
//   AFFIRMATIVE("AFFIRMATIVE"),
//   DEFENSIVE("DEFENSIVE");
// }
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

export interface CaseSummary {
  id: number;
  applicantName: string;
  caseType: string;
  asylumType: string;
  maritalStatus: string;
  applyWithSpouse: boolean;
  numberOfChildren: number;
  numberOfApplyingChildren: number;
  currentStep: string;
  progress: string;
  desc: string;
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

export interface AsylumCaseProfileOptional {
  applyForWithholdingYesCheckbox?: string;
  applicant?: Applicant;
  family?: Family;
  background?: Background;
  applicationDetails?: ApplicationDetails;
  signature?: YourSignature;
  declaration?: Declaration;
  overwriteChildren?: boolean;
  overwriteSiblings?: boolean;
  overwriteAddressHistoriesBeforeUS?: boolean;
  overwriteUsAddressHistoriesPast5Years?: boolean;
}

export interface Applicant {
  passportDocumentId?: number;
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
  genderMaleCheckbox?: string | null;
  genderFemaleCheckbox?: string | null;
  maritalStatusSingleCheckbox?: string | null;
  maritalStatusMarriedCheckbox?: string | null;
  maritalStatusDivorcedCheckbox?: string | null;
  maritalStatusWidowedCheckbox?: string | null;
  birthDate?: string;
  cityAndCountryOfBirth?: string;
  nationality?: string;
  nationalityAtBirth?: string;
  race?: string;
  religion?: string;
  immigrationCourtProceedingACheckbox?: string | null;
  immigrationCourtProceedingBCheckbox?: string | null;
  immigrationCourtProceedingCCheckbox?: string | null;
  whenLastLeaveCountry?: string;
  i94Number?: string;
  entryRecords?: EntryRecord[];
  statusExpireDate?: string;
  passportIssueCountry?: string;
  passportNumber?: string;
  travelDocumentNumber?: string;
  nativeLanguage?: string;
  expirationDate?: string;
  fluentEnglishYesCheckbox?: string | null;
  fluentEnglishNoCheckbox?: string | null;
  otherFluentLanguages?: string;
  haveNoChildrenCheckbox?: string | null;
  haveChildrenCheckbox?: string | null;
  childrenCnt?: number;
  notMarriedCheckbox?: string | null;
}

export interface EntryRecord {
  date: string;
  place: string;
  status: string;
}

export interface Family {
  spouse?: Spouse;
  children?: Child[];
  mother?: FamilyMember;
  father?: FamilyMember;
  siblings?: FamilyMember[];
}

export interface Spouse {
  passportDocumentId?: string;
  notMarriedCheckbox?: string;
  aNumber?: string;
  passportNumber?: string;
  birthDate?: string;
  ssn?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  namesUsedBefore?: string;
  marriageDate?: string;
  marriagePlace?: string;
  cityAndCountryOfBirth?: string;
  nationality?: string;
  race?: string;
  genderMaleCheckbox?: string | null;
  genderFemaleCheckbox?: string | null;
  personInUSYesCheckbox?: string | null;
  personInUSNoCheckbox?: string | null;
  specifyLocationIfNotInUS?: string;
  placeLastEntryIntoUS?: string;
  lastEntryUSDate?: string;
  i94Number?: string;
  lastAdmittedStatus?: string;
  currentStatus?: string;
  statusExpireDate?: string;
  immigrationCourtProceedingYesCheckbox?: string | null;
  immigrationCourtProceedingNoCheckbox?: string | null;
  previousArrivalDate?: string;
  inThisApplicationYesCheckbox?: string | null;
  inThisApplicationNoCheckbox?: string | null;
}

export interface Child {
  passportDocumentId?: string;
  aNumber?: string;
  passportNumber?: string;
  martialStatus?: string;
  ssn?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: string;
  cityAndCountryOfBirth?: string;
  nationality?: string;
  race?: string;
  genderMaleCheckbox?: string | null;
  genderFemaleCheckbox?: string | null;
  personInUSYesCheckbox?: string | null;
  personInUSNoCheckbox?: string | null;
  specifyLocationIfNotInUS?: string;
  placeLastEntryIntoUS?: string;
  lastEntryUSDate?: string;
  i94Number?: string;
  lastAdmittedStatus?: string;
  currentStatus?: string;
  statusExpireDate?: string;
  immigrationCourtProceedingYesCheckbox?: string | null;
  immigrationCourtProceedingNoCheckbox?: string | null;
  inThisApplicationYesCheckbox?: string | null;
  inThisApplicationNoCheckbox?: string | null;
}

export interface FamilyMember {
  part?: string; // Fulfill by backend
  question?: string; // Fulfill by backend
  name?: string;
  cityTownAndBirth?: string;
  location?: string;
  deceasedCheckbox?: string;
}

export interface Background {
  addressHistoriesBeforeUS?: AddressHistory[];
  usAddressHistoriesPast5Years?: AddressHistory[];
  educationHistories?: EducationHistory[];
  employmentHistories?: EmploymentHistory[];
}

export interface AddressHistory {
  part?: string; // Fulfill by backend
  question?: string; // Fulfill by backend
  numberAndStreet?: string;
  city?: string;
  province?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
}

export interface EducationHistory {
  part?: string; // Fulfill by backend
  question?: string; // Fulfill by backend
  schoolName?: string;
  schoolType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
}

export interface EmploymentHistory {
  part?: string; // Fulfill by backend
  question?: string; // Fulfill by backend
  nameAndAddress?: string;
  occupation?: string;
  startDate?: string;
  endDate?: string;
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
  explainHaveBeenHarmedYesPart?: string; // Fulfill by backend
  explainHaveBeenHarmedYesQuestion?: string; // Fulfill by backend
  fearReturnYesCheckbox?: boolean | null;
  fearReturnNoCheckbox?: boolean | null;
  explainFearReturnYes?: string;
  explainFearReturnYesPart?: string; // Fulfill by backend
  explainFearReturnYesQuestion?: string; // Fulfill by backend
  familyMembersBeenChargedYesCheckbox?: boolean | null;
  familyMembersBeenChargedNoCheckbox?: boolean | null;
  explainFamilyMembersBeenChargedYes?: string;
  explainFamilyMembersBeenChargedYesPart?: string; // Fulfill by backend
  explainFamilyMembersBeenChargedYesQuestion?: string; // Fulfill by backend
  youOrFamilyBelongAnyOrganizationYesCheckbox?: boolean | null;
  youOrFamilyBelongAnyOrganizationNoCheckbox?: boolean | null;
  explainYouOrFamilyBelongAnyOrganizationYes?: string;
  explainYouOrFamilyBelongAnyOrganizationYesPart?: string; // Fulfill by backend
  explainYouOrFamilyBelongAnyOrganizationYesQuestion?: string; // Fulfill by backend
  youOrFamilyContinueBelongAnyOrganizationYesCheckbox?: boolean | null;
  youOrFamilyContinueBelongAnyOrganizationNoCheckbox?: boolean | null;
  explainYouOrFamilyContinueBelongAnyOrganizationYes?: string;
  explainYouOrFamilyContinueBelongAnyOrganizationYesPart?: string; // Fulfill by backend
  explainYouOrFamilyContinueBelongAnyOrganizationYesQuestion?: string; // Fulfill by backend
  afraidOfReturnYesCheckbox?: boolean | null;
  afraidOfReturnNoCheckbox?: boolean | null;
  explainAfraidOfReturnYes?: string;
  explainAfraidOfReturnYesPart?: string; // Fulfill by backend
  explainAfraidOfReturnYesQuestion?: string; // Fulfill by backend
  appliedBeforeYesCheckbox?: boolean | null;
  appliedBeforeNoCheckbox?: boolean | null;
  explainAppliedBeforeYes?: string;
  explainAppliedBeforeYesPart?: string; // Fulfill by backend
  explainAppliedBeforeYesQuestion?: string; // Fulfill by backend
  stayInOtherCountryYesCheckbox?: boolean | null;
  stayInOtherCountryNoCheckbox?: boolean | null;
  anyLawfulStatusAnyCountryYesCheckbox?: boolean | null;
  anyLawfulStatusAnyCountryNoCheckbox?: boolean | null;
  explainAnyLawfulStatusAnyCountryYes?: string;
  explainAnyLawfulStatusAnyCountryYesPart?: string; // Fulfill by backend
  explainAnyLawfulStatusAnyCountryYesQuestion?: string; // Fulfill by backend
  haveYouHarmOthersYesCheckbox?: boolean | null;
  haveYouHarmOthersNoCheckbox?: boolean | null;
  explainHaveYouHarmOthersYes?: string;
  explainHaveYouHarmOthersYesPart?: string; // Fulfill by backend
  explainHaveYouHarmOthersYesQuestion?: string; // Fulfill by backend
  returnCountryYesCheckbox?: boolean | null;
  returnCountryNoCheckbox?: boolean | null;
  explainReturnCountryYes?: string;
  explainReturnCountryYesPart?: string; // Fulfill by backend
  explainReturnCountryYesQuestion?: string; // Fulfill by backend
  moreThanOneYearAfterArrivalYesCheckbox?: boolean | null;
  moreThanOneYearAfterArrivalNoCheckbox?: boolean | null;
  explainMoreThanOneYearAfterArrivalYes?: string;
  explainMoreThanOneYearAfterArrivalYesPart?: string; // Fulfill by backend
  explainMoreThanOneYearAfterArrivalYesQuestion?: string; // Fulfill by backend
  haveCommittedCrimeYesCheckbox?: boolean | null;
  haveCommittedCrimeNoCheckbox?: boolean | null;
  explainHaveCommittedCrimeYes?: string;
  explainHaveCommittedCrimeYesPart?: string; // Fulfill by backend
  explainHaveCommittedCrimeYesQuestion?: string; // Fulfill by backend
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
  fieldKey: string;
  fieldIndex?: number;
  idNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string; // format is mm/dd/yyyy
  birthPlace: string;
  nationality: string;
  gender: string;
  expireDate: string;
}

export interface UploadedDocument {
  id: number;
  userId: number;
  caseId: number;
  status: string;
  type: string;
  name: string;
  presignUrl: string;
  createdAt: number;
  updatedAt: number;
}

export enum CaseType {
  Asylum = "Asylum",
  H1B = "H1b",
  NIW = "Niw",
}

export enum AsylumType {
  AFFIRMATIVE = "AFFIRMATIVE",
  DEFENSIVE = "DEFENSIVE",
}
