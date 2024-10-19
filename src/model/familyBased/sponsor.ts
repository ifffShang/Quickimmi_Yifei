import { Address } from "./address";
import { AssetsSupplementIncome } from "./assetsSupplementIncome";
import { EmploymentAndIncome } from "./employmentAndIncome";
import { HouseholdSize } from "./householdSize";
import { SponsorContract } from "./sponsorContract";

export interface Sponsor {
  basicInfo: BasicInfo;
  sponsorDetails: SponsorDetails;
  householdSize: HouseholdSize;
  employmentAndIncome: EmploymentAndIncome;
  assetsSupplementIncome: AssetsSupplementIncome;
  sponsorContract: SponsorContract;
}

interface BasicInfo {
  isPetitionerCheckbox: string | undefined;
  filedAlienWorkerPetitionCheckbox: string | undefined;
  relationshipToImmigrant: string;
  ownershipInterest5PercentCheckbox: string | undefined;
  ownershipInterestDescription: string;
  ownershipRelationshipToImmigrant: string;
  onlyJointSponsorCheckbox: string | undefined;
  notOnlyJointSponsorCheckbox: string | undefined;
  firstJointSponsorCheckbox: string | undefined;
  secondJointSponsorCheckbox: string | undefined;
  substituteSponsorCheckbox: string | undefined;
  substituteSponsorRelationship: string;
}

interface SponsorDetails {
  lastName: string;
  firstName: string;
  middleName: string;
  inCareOfName: string;
  mailAddress: Address;
  mailingAddressSameAsPhysicalYesCheckbox: string | undefined;
  mailingAddressSameAsPhysicalNoCheckbox: string | undefined;
  physicalAddress: Address;
  countryOfDomicile: string;
  dateOfBirth: string;
  cityOfBirth: string;
  stateOrProvinceOfBirth: string;
  countryOfBirth: string;
  ssn: string;
  isUsCitizenCheckbox: string | undefined;
  isUsNationalCheckbox: string | undefined;
  isLawfulPermanentResidentCheckbox: string | undefined;
  sponsorANumber: string;
  uSCISOnlineAccountNumber: string;
  militaryServiceActiveDutyYesCheckbox: string | undefined;
  militaryServiceActiveDutyNoCheckbox: string | undefined;
}
