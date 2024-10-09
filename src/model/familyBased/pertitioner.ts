import { Address } from "./address";
import { Biographic } from "./biographic";
import { EmploymentHistory } from "./employmentHistory";
import { Parent } from "./parent";
import { PetitionerOtherName } from "./pertitionerOtherName";
import { Spouses } from "./spouses";

export interface Petitioner {
  alienNumber: string;
  uSCISOnlineAccountNumber: string;
  ssn: string;
  lastName: string;
  firstName: string;
  middleName: string;
  petitionerOtherNames: PetitionerOtherName[];

  cityOfBirth: string;
  countryOfBirth: string;
  dateOfBirth: string;

  sexMaleCheckbox: string | undefined;
  sexFemaleCheckbox: string | undefined;
  inCareOf: string;
  streetNumberAndName: string;
  aptCheckbox: string | undefined;
  steCheckbox: string | undefined;
  flrCheckbox: string | undefined;
  aptSteFlrNumber: string;
  cityOrTown: string;
  state: string;
  zipCode: string;
  province: string;
  postalCode: string;
  country: string;
  mailingAddressSameAsPhysicalAddressYesCheckbox: string | undefined;
  mailingAddressSameAsPhysicalAddressNoCheckbox: string | undefined;

  addressHistory: Address[];

  timesMarried: string;
  currentMartialStatusSingleCheckbox: string | undefined;
  currentMartialStatusMarriedCheckbox: string | undefined;
  currentMartialStatusDivorcedCheckbox: string | undefined;
  currentMartialStatusWidowedCheckbox: string | undefined;
  currentMartialStatusSeparatedCheckbox: string | undefined;
  currentMartialStatusAnnulledCheckbox: string | undefined;
  dateOfCurrentMarriage: string;
  cityOfCurrentMarriage: string;
  stateOfCurrentMarriage: string;
  provinceOfCurrentMarriage: string;
  countryOfCurrentMarriage: string;

  spouses: Spouses[];
  mother: Parent;
  father: Parent;

  iAmUsCitizenCheckbox: string | undefined;
  iAmLawfulPermanentResidentCheckbox: string | undefined;

  citizenshipAcquiredByBirthCheckbox: string | undefined;
  citizenshipAcquiredByNaturalizationCheckbox: string | undefined;
  citizenshipAcquiredThroughParentsCheckbox: string | undefined;

  obtainedNaturalizationCertificateYesCheckbox: string | undefined;
  obtainedNaturalizationCertificateNoCheckbox: string | undefined;

  certificateNumber: string;
  placeOfIssuance: string;
  dateOfIssuance: string;

  classOfAdmission: string;
  dateOfAdmission: string;
  placeOfAdmissionCity: string;
  placeOfAdmissionState: string;
  gainedStatusThroughMarriageYesCheckbox: string | undefined;
  gainedStatusThroughMarriageNoCheckbox: string | undefined;

  employmentHistory: EmploymentHistory[];

  biographic: Biographic;
}
