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

export interface ApplicationCase {
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

export interface CaseProfile {
  baseInfo: CaseBaseInfo;
  applicantInfo: ApplicantInfo;
  spouseInfo: SpouseInfo;
  childInfo: ChildInfo;
}

export interface CaseBaseInfo {
  immigrationType: string;
  reason: string;
  married: boolean | undefined;
  includeSpouse: boolean | undefined;
  childrenNum: number;
  includeChildrenNum: number;
  fairTreatment: boolean | undefined;
  estimatePrice: number;
}

export interface ApplicantInfo {
  passport: Document;
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: string;
  race: string;
  birthInDifferentCountry: boolean | undefined;
  birthCountry: string;
  birthCity: string;
  age: string;
  gender: string;
  identifyNumber: string;
  birthDate: string;
  aNumber: string;
  ssn: string;
  uscisOnlineAccountNumber: string;
  usPhoneNumber: string;
  usEmail: string;
  namesUsedBefore: string[];
  streetNumberAndName: string;
  aptNumber: string;
  city: string;
  state: string;
  zipCode: string;
  telePhoneNumber: string;
  inCareOf: string;
  streetNumberAndNameOfMailingAddress: string;
  aptNumberOfMailingAddress: string;
  cityOfMailingAddress: string;
  stateOfMailingAddress: string;
  zipCodeOfMailingAddress: string;
  telePhoneNumberOfMailingAddress: string;
}

export interface Document {
  id: number;
  userId: number;
  caseId: number;
  status: string;
  type: string;
  name: string;
  s3Location: string;
  createdAt: number;
  updatedAt: number;
}

export interface SpouseInfo {
  passport: Document;
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: string;
  race: string;
  birthInDifferentCountry: boolean | undefined;
  birthCountry: string;
  birthCity: string;
  identifyNumber: string;
  birthDate: string;
  age: string;
  gender: string;
  inUSA: boolean | undefined;
  includedInThisApplication: boolean | undefined;
  aNumber: string;
  ssn: string;
  uscisOnlineAccountNumber: string;
  usPhoneNumber: string;
  usEmail: string;
  namesUsedBefore: string[];
  marriageLicense: Document;
  marryAtSameCountry: boolean | undefined;
  marryAtOtherCountry: string;
  marryCity: string;
  addressSameAsApplicant: boolean | undefined;
  address: string;
  entryUsLastDate: string;
  legalEntryUS: boolean | undefined;
  entryUSPort: string;
  visaType: string;
  i94Number: string;
  stayExpiredDate: string;
  iImmiCourtProceeding: boolean | undefined;
  entryRecords: UsEntryRecord[];
  previousArrivalTime: string;
}

export interface UsEntryRecord {
  date: string;
  port: string;
}

export interface ChildInfo {
  passport: Document;
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: string;
  race: string;
  birthInDifferentCountry: boolean | undefined;
  birthCountry: string;
  birthCity: string;
  identifyNumber: string;
  birthDate: string;
  age: string;
  gender: string;
  aNumber: string;
  ssn: string;
  inUSA: boolean | undefined;
  location: string;
  includedInThisApplication: boolean | undefined;
  addressSameAsApplicant: boolean | undefined;
  address: string;
  entryUsLastDate: string;
  legalEntryUS: boolean | undefined;
  entryUSPort: string;
  visaType: string;
  i94Number: string;
  stayExpiredDate: string;
  iImmiCourtProceeding: boolean | undefined;
  previousArrivalTime: string;
}

export interface UsEntryRecord {
  date: string;
  port: string;
}
