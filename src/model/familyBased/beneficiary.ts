import { Address } from "./address";
import { Biographic } from "./biographic";
import { DisabilityAccommodation } from "./disabilityAccommodation";
import { EmploymentHistory } from "./employmentHistory";
import { Family } from "./family";
import { LastArrivalInformation } from "./lastArrivalInformation";
import { MaritalInfo } from "./maritalInfo";
import { UsEmbassy } from "./usEmbassy";

export interface BeneficiaryOtherName {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  // Family name for beneficiary's other name used
  lastName: string;
  // Given name for beneficiary's other name used
  firstName: string;
  // Middle name for beneficiary's other name used
  middleName: string;
}

export interface Beneficiary {
  ////// basic information
  // 287
  alienNumber: string;
  // 288
  uSCISOnlineAccountNumber: string;
  // 289
  lastName: string;
  // 290
  firstName: string;
  // 291
  middleName: string;
  // 292 - 294
  beneficiaryOtherNames: BeneficiaryOtherName[];
  beneficiaryNationalities: string[];

  // Page2-Question18
  passportNum: string;

  // Page2-Question19
  travelDocNum: string;

  // Page2-Question20
  passportOrTravelDocExpDate: string;

  // Page2-Question21
  passportIssuingCountry: string;

  // Page3-Question27: Current immigration status
  currentStatus: string;
  // 295
  cityOfBirth: string;
  // 296
  countryOfBirth: string;
  // 325
  dateOfBirth: string;
  // Part 4-9-M
  sexMaleCheckbox: string | undefined;
  // Part 4-9-F
  sexFemaleCheckbox: string | undefined;

  physicalAddress: Address;
  mailingAddress: Address;
  addressHistories: Address[];
  daytimePhoneNumber: string;
  // 350
  mobilePhoneNumber: string;
  // 351
  emailAddress: string;

  // Part 4-10
  // Has anyone else ever filed a petition for the beneficiary
  previousPetitionFiledYesCheckbox: string | undefined;
  previousPetitionFiledNoCheckbox: string | undefined;
  previousPetitionFiledUnknownCheckbox: string | undefined;

  // Provide the address in the United States where the beneficiary
  // intends to live, if different from Item Numbers 11.a. - 11.h. If
  // the address is the same, type or print "SAME" in Item Number
  intendToLiveUsAddress: Address;

  outsideUsAddress: Address;

  mostRecentOutSideUsAddressBefore5YearsAgo: Address;

  lastArrivalInformation: LastArrivalInformation;
  employmentHistories: EmploymentHistory[];

  currentEmployment: EmploymentHistory;

  // Part 4-53
  beneficiaryInImmigrationProceedingsYesCheckbox: string | undefined;
  beneficiaryInImmigrationProceedingsNoCheckbox: string | undefined;

  // Part 4-54
  removalCheckbox: string | undefined;
  exclusionCheckbox: string | undefined;
  rescissionCheckbox: string | undefined;
  otherJudicialProceedingsCheckbox: string | undefined;

  // 421
  cityOfProceedings: string;
  // 424
  stateOfProceedings: string;
  // 425
  dateOfProceedings: string;

  // If the beneficiary's native written language does not use
  // Roman letters, type or print his or her name and foreign
  // address in their native written language.
  // part 4:
  // 427
  lastNameUsedNativeLanguage: string;
  // 428
  firstNameUsedNativeLanguage: string;
  // 426
  middleNameUsedNativeLanguage: string;
  addressNativeLanguage: Address;

  // 442 ===== if filling for spouse
  lastAddressLivedTogether: Address;
  // 463
  adjustmentOfStatusCity: string;
  // 464
  adjustmentOfStatusState: string;

  // Page3-Question28: Names as appeared on I-94

  hasSocialSecurityCardNoCheckbox: string | undefined;
  hasSocialSecurityCardYesCheckbox: string | undefined;
  // 341
  ssn: string;

  // Page 4, Question 1 - Applied for Immigrant Visa
  appliedForImmigrantVisaNoCheckbox: string | undefined;
  appliedForImmigrantVisaYesCheckbox: string | undefined;

  biographicInfo: Biographic;

  family: Family;
  maritalInfo: MaritalInfo;
  isFluentEnglish: string | undefined;
  nativeLanguage: string;

  disabilityAccommodation: DisabilityAccommodation;
  appliedImmigrationVisaBefore: boolean;
  usEmbassies: UsEmbassy[];
}
