import { Address } from "./address";
import { HouseholdSize } from "./householdSize";

export interface Sponsor {
  basicInfo: BasicInfo;
  sponsorDetails: SponsorDetails;
  householdSize: HouseholdSize;
}

interface BasicInfo {
  isPetitionerCheckbox: boolean;
  filedAlienWorkerPetitionCheckbox: boolean;
  relationshipToImmigrant: string;
  ownershipInterest5PercentCheckbox: boolean;
  ownershipInterestDescription: string;
  ownershipRelationshipToImmigrant: string;
  onlyJointSponsorCheckbox: boolean;
  notOnlyJointSponsorCheckbox: boolean;
  firstJointSponsorCheckbox: boolean;
  secondJointSponsorCheckbox: boolean;
  substituteSponsorCheckbox: boolean;
  substituteSponsorRelationship: string;
}

interface SponsorDetails {
  lastName: string;
  firstName: string;
  middleName: string;
  inCareOfName: string;
  mailAddress: Address;
  mailingAddressSameAsPhysicalYesCheckbox: boolean;
  mailingAddressSameAsPhysicalNoCheckbox: boolean;
  physicalAddress: Address;
  countryOfDomicile: string;
  dateOfBirth: string;
  cityOfBirth: string;
  stateOrProvinceOfBirth: string;
  countryOfBirth: string;
  ssn: string;
  isUsCitizenCheckbox: boolean;
  isUsNationalCheckbox: boolean;
  isLawfulPermanentResidentCheckbox: boolean;
  sponsorANumber: string;
  uSCISOnlineAccountNumber: string;
  militaryServiceActiveDutyYesCheckbox: boolean;
  militaryServiceActiveDutyNoCheckbox: boolean;
}
