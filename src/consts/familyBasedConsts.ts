import { AdditionalRelative } from "../model/familyBased/additionalRelative";
import { Address } from "../model/familyBased/address";
import { Beneficiary } from "../model/familyBased/beneficiary";
import { Benefit } from "../model/familyBased/benefit";
import { Biographic } from "../model/familyBased/biographic";
import { DisabilityAccommodation } from "../model/familyBased/disabilityAccommodation";
import { Eligibility } from "../model/familyBased/eligibility";
import { EmploymentHistory } from "../model/familyBased/employmentHistory";
import { EntryInformation } from "../model/familyBased/entryInformation";
import { Family } from "../model/familyBased/family";
import { FamilyBasedProfile } from "../model/familyBased/familyBasedProfile";
import { Institutionalization } from "../model/familyBased/institutionalization";
import { Interpreter } from "../model/familyBased/intepreter";
import { LastArrivalInformation } from "../model/familyBased/lastArrivalInformation";
import { CurrentSpouseInfo, MaritalInfo, PreviousSpouseInfo } from "../model/familyBased/maritalInfo";
import { Organization } from "../model/familyBased/organization";
import { Parent } from "../model/familyBased/parent";
import { Petitioner } from "../model/familyBased/pertitioner";
import { PetitionerOtherName } from "../model/familyBased/pertitionerOtherName";
import { PetitionerStatement } from "../model/familyBased/petitionStatement";
import { PreviousPetition } from "../model/familyBased/previousPetition";
import { Relationship } from "../model/familyBased/relationship";
import { Sponsor } from "../model/familyBased/sponsor";
import { UsEmbassy } from "../model/familyBased/usEmbassy";

export const InitialRelationship: Relationship = {
  petitionForSpouseCheckbox: undefined,
  petitionForParentCheckbox: undefined,
  petitionForSiblingCheckbox: undefined,
  petitionForChildCheckbox: undefined,
  petitionForChildBornInWedlockCheckbox: undefined,
  petitionForStepchildAndStepparentCheckbox: undefined,
  petitionForChildNotBornInWedlockCheckbox: undefined,
  petitionForChildAdoptedCheckbox: undefined,
  siblingAdoptionRelationYesCheckbox: undefined,
  siblingAdoptionRelationNoCheckbox: undefined,
  gainedStatusThroughAdoptionYesCheckbox: undefined,
  gainedStatusThroughAdoptionNoCheckbox: undefined,
};

export const InitialPetitionerOtherName: PetitionerOtherName = {
  pageNumber: "",
  partNumber: "",
  itemNumber: "",
  lastName: "",
  firstName: "",
  middleName: "",
};

export const InitialEmploymentHistory: EmploymentHistory = {
  pageNumber: "",
  partNumber: "",
  itemNumber: "",
  inUSA: undefined,

  nameOfEmployer: "",
  streetNumberAndName: "",

  aptCheckbox: "",
  steCheckbox: "",
  flrCheckbox: "",
  aptSteFlrNumber: "",

  city: "",
  state: "",
  zipCode: "",
  province: "",
  postalCode: "",
  country: "",
  occupation: "",
  dateFrom: "",
  dateTo: "",
};

export const InitialParents: Parent = {
  lastName: "",
  firstName: "",
  middleName: "",

  birthLastName: "",
  birthFirstName: "",
  birthMiddleName: "",

  dateOfBirth: "",
  cityOfBirth: "",
  countryOfBirth: "",

  currentCityOfResidence: "",
  currentCountryOfResidence: "",

  femaleCheckbox: undefined,
  maleCheckbox: undefined,
};

export const InitialBiographic: Biographic = {
  ethnicityHispanicCheckbox: undefined,
  ethnicityNotHispanicCheckbox: undefined,

  raceWhiteCheckbox: undefined,
  raceAsianCheckbox: undefined,
  raceBlackCheckbox: undefined,
  raceAmericanIndianCheckbox: undefined,
  raceNativeHawaiianCheckbox: undefined,

  heightFeet: "",
  heightInches: "",
  weightPounds1: "",
  weightPounds2: "",
  weightPounds3: "",

  eyeColorBlackCheckbox: undefined,
  eyeColorBlueCheckbox: undefined,
  eyeColorBrownCheckbox: undefined,
  eyeColorGrayCheckbox: undefined,
  eyeColorGreenCheckbox: undefined,
  eyeColorHazelCheckbox: undefined,
  eyeColorMaroonCheckbox: undefined,
  eyeColorPinkCheckbox: undefined,
  eyeColorUnknownCheckbox: undefined,

  hairColorBaldCheckbox: undefined,
  hairColorBlackCheckbox: undefined,
  hairColorBlondCheckbox: undefined,
  hairColorBrownCheckbox: undefined,
  hairColorGrayCheckbox: undefined,
  hairColorRedCheckbox: undefined,
  hairColorSandyCheckbox: undefined,
  hairColorWhiteCheckbox: undefined,
  hairColorUnknownCheckbox: undefined,
};

export const InitialPetitioner: Petitioner = {
  alienNumber: "",
  uSCISOnlineAccountNumber: "",
  ssn: "",
  lastName: "",
  firstName: "",
  middleName: "",
  petitionerOtherNames: [],

  cityOfBirth: "",
  countryOfBirth: "",
  dateOfBirth: "",

  sexMaleCheckbox: undefined,
  sexFemaleCheckbox: undefined,
  inCareOf: "",
  streetNumberAndName: "",
  aptCheckbox: undefined,
  steCheckbox: undefined,
  flrCheckbox: undefined,
  aptSteFlrNumber: "",
  cityOrTown: "",
  state: "",
  zipCode: "",
  province: "",
  postalCode: "",
  country: "",
  mailingAddressSameAsPhysicalAddressYesCheckbox: undefined,
  mailingAddressSameAsPhysicalAddressNoCheckbox: undefined,

  addressHistory: [],

  timesMarried: "",
  currentMartialStatusSingleCheckbox: undefined,
  currentMartialStatusMarriedCheckbox: undefined,
  currentMartialStatusDivorcedCheckbox: undefined,
  currentMartialStatusWidowedCheckbox: undefined,
  currentMartialStatusSeparatedCheckbox: undefined,
  currentMartialStatusAnnulledCheckbox: undefined,
  dateOfCurrentMarriage: "",
  cityOfCurrentMarriage: "",
  stateOfCurrentMarriage: "",
  provinceOfCurrentMarriage: "",
  countryOfCurrentMarriage: "",

  spouses: [],
  mother: InitialParents,
  father: InitialParents,

  iAmUsCitizenCheckbox: undefined,
  iAmLawfulPermanentResidentCheckbox: undefined,

  citizenshipAcquiredByBirthCheckbox: undefined,
  citizenshipAcquiredByNaturalizationCheckbox: undefined,
  citizenshipAcquiredThroughParentsCheckbox: undefined,

  obtainedNaturalizationCertificateYesCheckbox: undefined,
  obtainedNaturalizationCertificateNoCheckbox: undefined,

  certificateNumber: "",
  placeOfIssuance: "",
  dateOfIssuance: "",

  classOfAdmission: "",
  dateOfAdmission: "",
  placeOfAdmissionCity: "",
  placeOfAdmissionState: "",
  gainedStatusThroughMarriageYesCheckbox: undefined,
  gainedStatusThroughMarriageNoCheckbox: undefined,

  employmentHistory: [],
  biographic: InitialBiographic,
};

export const InitialEntryInformation: EntryInformation = {
  beneficiaryEverInUSYesCheckbox: "",
  beneficiaryEverInUSNoCheckbox: "",
  arrivedAsAdmission: "",
  i94Number: "",
  dateOfArrival: "",
  authorizedStayExpirationDate: "",
  passportNumber: "",
  travelDocumentNumber: "",
  passportIssueCountry: "",
  expirationDateForPassport: "",
};

export const InitialAddress: Address = {
  inCareOf: "",
  streetNumberAndName: "",
  aptCheckbox: undefined,
  steCheckbox: undefined,
  flrCheckbox: undefined,
  aptSteFlrNumber: "",
  cityOrTown: "",
  state: "",
  zipCode: "",
  province: "",
  postalCode: "",
  country: "",
  dateFrom: "",
  dateTo: "",
};

export const InitialLastArrivalInformation: LastArrivalInformation = {
  i94DocumentId: 0,
  beneficiaryEverInUSYesCheckbox: undefined,
  beneficiaryEverInUSNoCheckbox: undefined,
  arrivedAsAdmission: "",
  admittedAtPortOfEntryCheckbox: undefined,
  admissionEntryDetail: "",
  paroledAtPortOfEntryCheckbox: undefined,
  paroleEntranceDetail: "",
  enteredWithoutAdmissionCheckbox: undefined,
  otherEntryMethodCheckbox: undefined,
  otherEntryDetail: "",
  i94Number: "",
  i94Status: "",
  dateOfArrival: "",
  authorizedStayExpirationDate: "",
  passportNumber: "",
  travelDocumentNumber: "",
  passportIssueCountry: "",
  expirationDateForPassport: "",
  visaNumber: "",
  arrivalCity: "",
  arrivalState: "",
  currentImmigrationStatus: "",
};

export const InitialFamily: Family = {
  father: InitialParents,
  mother: InitialParents,
  totalNumberOfChildren: "",
  children: [],
};

export const InitialCurrentSpouseInfo: CurrentSpouseInfo = {
  lastName: "",
  firstName: "",
  middleName: "",
  alienNumber: "",
  dateOfBirth: "",
  dateOfMarriage: "",
  cityOfBirth: "",
  stateOfBirth: "",
  countryOfBirth: "",
  placeOfMarriageCity: "",
  placeOfMarriageState: "",
  placeOfMarriageCountry: "",
  currentSpouseApplyingNoCheckbox: undefined,
  currentSpouseApplyingYesCheckbox: undefined,
};

export const InitialPreviousSpouseInfo: PreviousSpouseInfo = {
  lastName: "",
  firstName: "",
  middleName: "",
  dateOfBirth: "",
  dateOfMarriage: "",
  placeOfMarriageCity: "",
  placeOfMarriageState: "",
  placeOfMarriageCountry: "",
  dateMarriageLegallyEnded: "",
  placeMarriageLegallyEndedCity: "",
  placeMarriageLegallyEndedState: "",
  placeMarriageLegallyEndedCountry: "",
};

export const InitialMaritalInfo: MaritalInfo = {
  maritalStatusSingleCheckbox: undefined,
  maritalStatusMarriedCheckbox: undefined,
  maritalStatusDivorcedCheckbox: undefined,
  maritalStatusWidowedCheckbox: undefined,
  maritalStatusAnnulledCheckbox: undefined,
  maritalStatusSeparatedCheckbox: undefined,

  spouseMilitaryStatusNACheckbox: undefined,
  spouseMilitaryStatusYesCheckbox: undefined,
  spouseMilitaryStatusNoCheckbox: undefined,

  numberOfMarriages: "",
  currentSpouse: InitialCurrentSpouseInfo,
  previousSpouseInfos: [],
};

export const InitialDisabilityAccommodation: DisabilityAccommodation = {
  requestingAccommodationYesCheckbox: undefined,
  requestingAccommodationNoCheckbox: undefined,

  deafOrHardOfHearingYesCheckbox: undefined,
  deafOrHardOfHearingAccommodationDetails: "",

  blindOrLowVisionYesCheckbox: undefined,
  blindOrLowVisionAccommodationDetails: "",

  otherDisabilityOrImpairmentYesCheckbox: undefined,
  otherDisabilityOrImpairmentAccommodationDetails: "",
};

export const InitialUsEmbassy: UsEmbassy = {
  pageNumber: "4",
  partNumber: "3",
  itemNumber: "2-4",
  city: "",
  country: "",
  visaDecision: "",
  visaDecisionDate: "",
};

export const InitialBeneficiary: Beneficiary = {
  alienNumber: "",
  uSCISOnlineAccountNumber: "",
  lastName: "",
  firstName: "",
  middleName: "",
  beneficiaryOtherNames: [],
  beneficiaryNationalities: [],
  passportNum: "",
  travelDocNum: "",
  passportOrTravelDocExpDate: "",
  passportIssuingCountry: "",
  currentStatus: "",
  cityOfBirth: "",
  countryOfBirth: "",
  dateOfBirth: "",
  sexMaleCheckbox: undefined,
  sexFemaleCheckbox: undefined,
  physicalAddress: InitialAddress,
  mailingAddress: InitialAddress,
  addressHistories: [],
  daytimePhoneNumber: "",
  mobilePhoneNumber: "",
  emailAddress: "",
  previousPetitionFiledYesCheckbox: undefined,
  previousPetitionFiledNoCheckbox: undefined,
  previousPetitionFiledUnknownCheckbox: undefined,
  intendToLiveUsAddress: InitialAddress,
  outsideUsAddress: InitialAddress,
  mostRecentOutSideUsAddressBefore5YearsAgo: InitialAddress,
  lastArrivalInformation: InitialLastArrivalInformation,
  employmentHistories: [],
  mostRecentOutSideUsEmploymentHistory5YearsAgo: InitialEmploymentHistory,
  beneficiaryInImmigrationProceedingsYesCheckbox: undefined,
  beneficiaryInImmigrationProceedingsNoCheckbox: undefined,
  removalCheckbox: undefined,
  exclusionCheckbox: undefined,
  rescissionCheckbox: undefined,
  otherJudicialProceedingsCheckbox: undefined,
  cityOfProceedings: "",
  stateOfProceedings: "",
  dateOfProceedings: "",
  lastNameUsedNativeLanguage: "",
  firstNameUsedNativeLanguage: "",
  middleNameUsedNativeLanguage: "",
  addressNativeLanguage: InitialAddress,
  lastAddressLivedTogether: InitialAddress,
  adjustmentOfStatusCity: "",
  adjustmentOfStatusState: "",
  hasSocialSecurityCardNoCheckbox: undefined,
  hasSocialSecurityCardYesCheckbox: undefined,
  ssn: "",
  appliedForImmigrantVisaNoCheckbox: undefined,
  appliedForImmigrantVisaYesCheckbox: undefined,
  biographicInfo: InitialBiographic,
  family: InitialFamily,
  maritalInfo: InitialMaritalInfo,
  isFluentEnglish: undefined,
  nativeLanguage: "",
  disabilityAccommodation: InitialDisabilityAccommodation,
  appliedImmigrationVisaBefore: false,
  usEmbassies: [],
};

export const InitialOrganization: Organization = {
  orgName: "",
  cityTown: "",
  state: "",
  country: "",
  natureOfGroup: "",
  dateFrom: "",
  dateTo: "",
};

export const InitialBenefitRecord: Benefit = {
  pageNumber: "",
  partNumber: "",
  itemNumber: "",
  benefitReceived: "",
  startDate: "",
  endDate: "",
  dollarAmount: "",
};

export const InitialInstitutionalizationRecord: Institutionalization = {
  pageNumber: "",
  partNumber: "",
  itemNumber: "",
  institutionNameCityState: "",
  dateFrom: "",
  dateTo: "",
  reason: "",
};

export const InitialEligibility: Eligibility = {
  associatedWithOrganizationYesCheckbox: undefined,
  associatedWithOrganizationNoCheckbox: undefined,
  organizations: [],

  deniedAdmissionYesCheckbox: undefined,
  deniedAdmissionNoCheckbox: undefined,
  deniedAdmissionYesSupplement: undefined,

  deniedVisaYesCheckbox: undefined,
  deniedVisaNoCheckbox: undefined,
  deniedVisaYesSupplement: undefined,

  workedWithoutAuthorizationYesCheckbox: undefined,
  workedWithoutAuthorizationNoCheckbox: undefined,
  WorkedWithoutAuthorizationYesSupplement: undefined,

  violatedNonimmigrantStatusYesCheckbox: undefined,
  violatedNonimmigrantStatusNoCheckbox: undefined,
  violatedNonimmigrantStatusYesSupplement: undefined,

  removalProceedingsYesCheckbox: undefined,
  removalProceedingsNoCheckbox: undefined,
  removalProceedingsYesSupplement: undefined,

  finalOrderOfRemovalYesCheckbox: undefined,
  finalOrderOfRemovalNoCheckbox: undefined,
  finalOrderOfRemovalYesSupplement: undefined,

  priorFinalOrderReinstatedYesCheckbox: undefined,
  priorFinalOrderReinstatedNoCheckbox: undefined,
  priorFinalOrderReinstatedYesSupplement: undefined,

  lprStatusRescindedYesCheckbox: undefined,
  lprStatusRescindedNoCheckbox: undefined,
  lprStatusRescindedYesSupplement: undefined,

  voluntaryDepartureFailedYesCheckbox: undefined,
  voluntaryDepartureFailedNoCheckbox: undefined,
  voluntaryDepartureFailedYesSupplement: undefined,

  appliedForReliefFromRemovalYesCheckbox: undefined,
  appliedForReliefFromRemovalNoCheckbox: undefined,
  appliedForReliefFromRemovalYesSupplement: undefined,

  jVisaForeignResidenceRequirementYesCheckbox: undefined,
  jVisaForeignResidenceRequirementNoCheckbox: undefined,
  compliedWithForeignResidenceYesCheckbox: undefined,
  compliedWithForeignResidenceNoCheckbox: undefined,
  compliedWithForeignResidenceYesSupplement: undefined,
  grantedWaiverOrRecommendationYesCheckbox: undefined,
  grantedWaiverOrRecommendationNoCheckbox: undefined,
  grantedWaiverOrRecommendationYesSupplement: undefined,

  arrestedOrDetainedYesCheckbox: undefined,
  arrestedOrDetainedNoCheckbox: undefined,
  arrestedOrDetainedYesSupplement: undefined,

  committedCrimeNoCheckbox: undefined,
  committedCrimeYesCheckbox: undefined,
  committedCrimeYesSupplement: undefined,

  pledGuiltyOrConvictedYesCheckbox: undefined,
  pledGuiltyOrConvictedNoCheckbox: undefined,
  pledGuiltyOrConvictedYesSupplement: undefined,

  orderedPunishedByJudgeNoCheckbox: undefined,
  orderedPunishedByJudgeYesCheckbox: undefined,
  orderedPunishedByJudgeYesSupplement: undefined,

  defendantInCriminalProceedingYesCheckbox: undefined,
  defendantInCriminalProceedingNoCheckbox: undefined,
  defendantInCriminalProceedingYesSupplement: undefined,

  violatedControlledSubstanceLawNoCheckbox: undefined,
  violatedControlledSubstanceLawYesCheckbox: undefined,
  violatedControlledSubstanceLawYesSupplement: undefined,

  convictedOfMultipleOffensesNoCheckbox: undefined,
  convictedOfMultipleOffensesYesCheckbox: undefined,
  convictedOfMultipleOffensesYesSupplement: undefined,

  illicitlyTraffickedControlledSubstancesYesCheckbox: undefined,
  illicitlyTraffickedControlledSubstancesNoCheckbox: undefined,
  illicitlyTraffickedControlledSubstancesYesSupplement: undefined,

  aidedInIllicitTraffickingNoCheckbox: undefined,
  aidedInIllicitTraffickingYesCheckbox: undefined,
  aidedInIllicitTraffickingYesSupplement: undefined,

  relatedToIllicitTraffickerNoCheckbox: undefined,
  relatedToIllicitTraffickerYesCheckbox: undefined,
  relatedToIllicitTraffickerYesSupplement: undefined,

  engagedInProstitutionNoCheckbox: undefined,
  engagedInProstitutionYesCheckbox: undefined,
  engagedInProstitutionYesSupplement: undefined,

  procuredProstitutesYesCheckbox: undefined,
  procuredProstitutesNoCheckbox: undefined,
  procuredProstitutesYesSupplement: undefined,

  receivedProceedsFromProstitutionNoCheckbox: undefined,
  receivedProceedsFromProstitutionYesCheckbox: undefined,
  receivedProceedsFromProstitutionYesSupplement: undefined,

  intentToEngageInIllegalGamblingYesCheckbox: undefined,
  intentToEngageInIllegalGamblingNoCheckbox: undefined,
  intentToEngageInIllegalGamblingYesSupplement: undefined,

  exercisedImmunityFromProsecutionNoCheckbox: undefined,
  exercisedImmunityFromProsecutionYesCheckbox: undefined,
  exercisedImmunityFromProsecutionYesSupplement: undefined,

  responsibleForReligiousViolationsYesCheckbox: undefined,
  responsibleForReligiousViolationsNoCheckbox: undefined,
  responsibleForReligiousViolationsYesSupplement: undefined,

  inducedTraffickingForSexNoCheckbox: undefined,
  inducedTraffickingForSexYesCheckbox: undefined,
  inducedTraffickingForSexYesSupplement: undefined,

  traffickedIntoSlaveryNoCheckbox: undefined,
  traffickedIntoSlaveryYesCheckbox: undefined,
  traffickedIntoSlaveryYesSupplement: undefined,

  aidedTraffickingForSexOrSlaveryYesCheckbox: undefined,
  aidedTraffickingForSexOrSlaveryNoCheckbox: undefined,
  aidedTraffickingForSexOrSlaveryYesSupplement: undefined,

  relatedToTraffickerAndBenefitedNoCheckbox: undefined,
  relatedToTraffickerAndBenefitedYesCheckbox: undefined,
  relatedToTraffickerAndBenefitedYesSupplement: undefined,

  engagedInMoneyLaunderingYesCheckbox: undefined,
  engagedInMoneyLaunderingNoCheckbox: undefined,
  engagedInMoneyLaunderingYesSupplement: undefined,

  engageInEspionageOrSabotageYesCheckbox: undefined,
  engageInEspionageOrSabotageNoCheckbox: undefined,
  engageInEspionageOrSabotageYesSupplement: undefined,

  engageInIllegalExportYesCheckbox: undefined,
  engageInIllegalExportNoCheckbox: undefined,
  engageInIllegalExportYesSupplement: undefined,

  engageInOverthrowingGovernmentYesCheckbox: undefined,
  engageInOverthrowingGovernmentNoCheckbox: undefined,
  engageInOverthrowingGovernmentYesSupplement: undefined,

  engageInEndangeringUSYesCheckbox: undefined,
  engageInEndangeringUSNoCheckbox: undefined,
  engageInEndangeringUSYesSupplement: undefined,

  engageInUnlawfulActivityYesCheckbox: undefined,
  engageInUnlawfulActivityNoCheckbox: undefined,
  engageInUnlawfulActivityYesSupplement: undefined,

  engageInAdverseForeignPolicyYesCheckbox: undefined,
  engageInAdverseForeignPolicyNoCheckbox: undefined,
  engageInAdverseForeignPolicyYesSupplement: undefined,

  committedOrPlannedSeriousCrimeYesCheckbox: undefined,
  committedOrPlannedSeriousCrimeNoCheckbox: undefined,
  committedOrPlannedSeriousCrimeYesSupplement: undefined,

  memberOfGroupInvolvedInSeriousCrimeYesCheckbox: undefined,
  memberOfGroupInvolvedInSeriousCrimeNoCheckbox: undefined,
  memberOfGroupInvolvedInSeriousCrimeYesSupplement: undefined,

  recruitedForGroupInvolvedInSeriousCrimeYesCheckbox: undefined,
  recruitedForGroupInvolvedInSeriousCrimeNoCheckbox: undefined,
  recruitedForGroupInvolvedInSeriousCrimeYesSupplement: undefined,

  providedSupportForGroupInvolvedInSeriousCrimeYesCheckbox: undefined,
  providedSupportForGroupInvolvedInSeriousCrimeNoCheckbox: undefined,
  providedSupportForGroupInvolvedInSeriousCrimeYesSupplement: undefined,

  providedSupportForIndividualOrGroupYesCheckbox: undefined,
  providedSupportForIndividualOrGroupNoCheckbox: undefined,
  providedSupportForIndividualOrGroupYesSupplement: undefined,

  receivedMilitaryOrWeaponsTrainingYesCheckbox: undefined,
  receivedMilitaryOrWeaponsTrainingNoCheckbox: undefined,
  receivedMilitaryOrWeaponsTrainingYesSupplement: undefined,

  intendToEngageInSeriousActivitiesYesCheckbox: undefined,
  intendToEngageInSeriousActivitiesNoCheckbox: undefined,
  intendToEngageInSeriousActivitiesYesSupplement: undefined,

  spouseOrChildCommittedSeriousCrimeYesCheckbox: undefined,
  spouseOrChildCommittedSeriousCrimeNoCheckbox: undefined,
  spouseOrChildCommittedSeriousCrimeYesSupplement: undefined,

  spouseOrChildMemberOfGroupYesCheckbox: undefined,
  spouseOrChildMemberOfGroupNoCheckbox: undefined,
  spouseOrChildMemberOfGroupYesSupplement: undefined,

  spouseOrChildRecruitedForGroupYesCheckbox: undefined,
  spouseOrChildRecruitedForGroupNoCheckbox: undefined,
  spouseOrChildRecruitedForGroupYesSupplement: undefined,

  spouseOrChildProvidedSupportYesCheckbox: undefined,
  spouseOrChildProvidedSupportNoCheckbox: undefined,
  spouseOrChildProvidedSupportYesSupplement: undefined,

  spouseOrChildProvidedSupportForIndividualOrGroupYesCheckbox: undefined,
  spouseOrChildProvidedSupportForIndividualOrGroupNoCheckbox: undefined,
  spouseOrChildProvidedSupportForIndividualOrGroupYesSupplement: undefined,

  spouseOrChildReceivedTrainingYesCheckbox: undefined,
  spouseOrChildReceivedTrainingNoCheckbox: undefined,
  spouseOrChildReceivedTrainingYesSupplement: undefined,

  assistedInWeaponsActivitiesYesCheckbox: undefined,
  assistedInWeaponsActivitiesNoCheckbox: undefined,
  assistedInWeaponsActivitiesYesSupplement: undefined,

  workedOrVolunteeredInDetentionFacilityYesCheckbox: undefined,
  workedOrVolunteeredInDetentionFacilityNoCheckbox: undefined,
  workedOrVolunteeredInDetentionFacilityYesSupplement: undefined,

  participatedInGroupUsingWeaponsYesCheckbox: undefined,
  participatedInGroupUsingWeaponsNoCheckbox: undefined,
  participatedInGroupUsingWeaponsYesSupplement: undefined,

  servedInMilitaryOrArmedGroupYesCheckbox: undefined,
  servedInMilitaryOrArmedGroupNoCheckbox: undefined,
  servedInMilitaryOrArmedGroupYesSupplement: undefined,

  affiliatedWithCommunistOrTotalitarianPartyYesCheckbox: undefined,
  affiliatedWithCommunistOrTotalitarianPartyNoCheckbox: undefined,
  affiliatedWithCommunistOrTotalitarianPartyYesSupplement: undefined,

  participatedInNaziPersecutionYesCheckbox: undefined,
  participatedInNaziPersecutionNoCheckbox: undefined,
  participatedInNaziPersecutionYesSupplement: undefined,

  involvedInTortureOrGenocideYesCheckbox: undefined,
  involvedInTortureOrGenocideNoCheckbox: undefined,
  involvedInTortureOrGenocideYesSupplement: undefined,

  killedAnyPersonYesCheckbox: undefined,
  killedAnyPersonNoCheckbox: undefined,
  killedAnyPersonYesSupplement: undefined,

  severelyInjuredAnyPersonYesCheckbox: undefined,
  severelyInjuredAnyPersonNoCheckbox: undefined,
  severelyInjuredAnyPersonYesSupplement: undefined,

  engagedInNonConsensualSexualContactYesCheckbox: undefined,
  engagedInNonConsensualSexualContactNoCheckbox: undefined,
  engagedInNonConsensualSexualContactYesSupplement: undefined,

  limitedReligiousBeliefsYesCheckbox: undefined,
  limitedReligiousBeliefsNoCheckbox: undefined,
  limitedReligiousBeliefsYesSupplement: undefined,

  recruitedChildSoldiersYesCheckbox: undefined,
  recruitedChildSoldiersNoCheckbox: undefined,
  recruitedChildSoldiersYesSupplement: undefined,

  usedChildSoldiersInCombatYesCheckbox: undefined,
  usedChildSoldiersInCombatNoCheckbox: undefined,
  usedChildSoldiersInCombatYesSupplement: undefined,

  subjectToPublicChargeYesCheckbox: undefined,
  subjectToPublicChargeNoCheckbox: undefined,
  subjectToPublicChargeYesSupplement: undefined,

  householdSize: "",

  householdIncomeRange0to27kCheckbox: undefined,
  householdIncomeRange27kto52kCheckbox: undefined,
  householdIncomeRange52kto85kCheckbox: undefined,
  householdIncomeRange85kto141kCheckbox: undefined,
  householdIncomeRangeOver141kCheckbox: undefined,

  householdAssetsValue0to18kCheckbox: undefined,
  householdAssetsValue18kto136kCheckbox: undefined,
  householdAssetsValue136kto321kCheckbox: undefined,
  householdAssetsValue321kto707kCheckbox: undefined,
  householdAssetsValueOver707kCheckbox: undefined,

  liabilitiesValue0Checkbox: undefined,
  liabilitiesValue1kto10kCheckbox: undefined,
  liabilitiesValue10kto57kCheckbox: undefined,
  liabilitiesValue57kto186kCheckbox: undefined,
  liabilitiesValueOver186kCheckbox: undefined,

  educationGrades1to11Checkbox: undefined,
  education12thNoDiplomaCheckbox: undefined,
  educationHighSchoolDiplomaCheckbox: undefined,
  educationSomeCollegeNoDegreeCheckbox: undefined,
  educationAssociatesDegreeCheckbox: undefined,
  educationBachelorsDegreeCheckbox: undefined,
  educationMastersDegreeCheckbox: undefined,
  educationProfessionalDegreeCheckbox: undefined,
  educationDoctorateDegreeCheckbox: undefined,

  certificationsLicensesSkills: "",

  receivedSSIOrTANFYesCheckbox: undefined,
  receivedSSIOrTANFNoCheckbox: undefined,

  receivedInstitutionalizationYesCheckbox: undefined,
  receivedInstitutionalizationNoCheckbox: undefined,

  benefitRecords: [],

  institutionalizationRecords: [],

  failedToAttendRemovalProceedingYesCheckbox: undefined,
  failedToAttendRemovalProceedingNoCheckbox: undefined,
  failedToAttendRemovalProceedingYesSupplement: undefined,

  believeHadReasonableCauseYesCheckbox: undefined,
  believeHadReasonableCauseNoCheckbox: undefined,
  believeHadReasonableCauseYesSupplement: undefined,

  submittedFraudulentDocumentationYesCheckbox: undefined,
  submittedFraudulentDocumentationNoCheckbox: undefined,
  submittedFraudulentDocumentationYesSupplement: undefined,

  liedOrMisrepresentedForImmigrationBenefitYesCheckbox: undefined,
  liedOrMisrepresentedForImmigrationBenefitNoCheckbox: undefined,
  liedOrMisrepresentedForImmigrationBenefitYesSupplement: undefined,

  falselyClaimedUSCitizenshipYesCheckbox: undefined,
  falselyClaimedUSCitizenshipNoCheckbox: undefined,
  falselyClaimedUSCitizenshipYesSupplement: undefined,

  beenAStowawayYesCheckbox: undefined,
  beenAStowawayNoCheckbox: undefined,
  beenAStowawayYesSupplement: undefined,

  knowinglyEncouragedIllegalEntryYesCheckbox: undefined,
  knowinglyEncouragedIllegalEntryNoCheckbox: undefined,
  knowinglyEncouragedIllegalEntryYesSupplement: undefined,

  underCivilPenaltyForFraudulentDocumentsYesCheckbox: undefined,
  underCivilPenaltyForFraudulentDocumentsNoCheckbox: undefined,
  underCivilPenaltyForFraudulentDocumentsYesSupplement: undefined,

  excludedDeportedOrRemovedYesCheckbox: undefined,
  excludedDeportedOrRemovedNoCheckbox: undefined,
  excludedDeportedOrRemovedYesSupplement: undefined,

  enteredWithoutInspectionYesCheckbox: undefined,
  enteredWithoutInspectionNoCheckbox: undefined,
  enteredWithoutInspectionYesSupplement: undefined,

  unlawfullyPresent180DaysTo1YearYesCheckbox: undefined,
  unlawfullyPresent180DaysTo1YearNoCheckbox: undefined,
  unlawfullyPresent180DaysTo1YearYesSupplement: undefined,

  unlawfullyPresent1YearOrMoreYesCheckbox: undefined,
  unlawfullyPresent1YearOrMoreNoCheckbox: undefined,
  unlawfullyPresent1YearOrMoreYesSupplement: undefined,

  reenteredAfterUnlawfullyPresentYesCheckbox: undefined,
  reenteredAfterUnlawfullyPresentNoCheckbox: undefined,
  reenteredAfterUnlawfullyPresentYesSupplement: undefined,

  reenteredAfterDeportationYesCheckbox: undefined,
  reenteredAfterDeportationNoCheckbox: undefined,
  reenteredAfterDeportationYesSupplement: undefined,

  planToPracticePolygamyYesCheckbox: undefined,
  planToPracticePolygamyNoCheckbox: undefined,
  planToPracticePolygamyYesSupplement: undefined,

  accompanyingInadmissibleForeignNationalYesCheckbox: undefined,
  accompanyingInadmissibleForeignNationalNoCheckbox: undefined,
  accompanyingInadmissibleForeignNationalYesSupplement: undefined,

  assistedInWithholdingCustodyYesCheckbox: undefined,
  assistedInWithholdingCustodyNoCheckbox: undefined,
  assistedInWithholdingCustodyYesSupplement: undefined,

  votedInViolationOfLawYesCheckbox: undefined,
  votedInViolationOfLawNoCheckbox: undefined,
  votedInViolationOfLawYesSupplement: undefined,

  renouncedCitizenshipToAvoidTaxYesCheckbox: undefined,
  renouncedCitizenshipToAvoidTaxNoCheckbox: undefined,
  renouncedCitizenshipToAvoidTaxYesSupplement: undefined,

  appliedForExemptionFromMilitaryServiceYesCheckbox: undefined,
  appliedForExemptionFromMilitaryServiceNoCheckbox: undefined,
  appliedForExemptionFromMilitaryServiceYesSupplement: undefined,

  relievedFromMilitaryServiceYesCheckbox: undefined,
  relievedFromMilitaryServiceNoCheckbox: undefined,
  relievedFromMilitaryServiceYesSupplement: undefined,

  convictedOfDesertionYesCheckbox: undefined,
  convictedOfDesertionNoCheckbox: undefined,
  convictedOfDesertionYesSupplement: undefined,

  evadedMilitaryServiceDuringWarYesCheckbox: undefined,
  evadedMilitaryServiceDuringWarNoCheckbox: undefined,

  nationalityOrStatusBeforeEvadingMilitaryService: "",
};

export const InitialAdditionalRelative: AdditionalRelative = {
  lastName: "",
  firstName: "",
  middleName: "",
  relationship: "",
};

export const InitialPreviousPetition: PreviousPetition = {
  filedPetitionYesCheckbox: undefined,
  filedPetitionNoCheckbox: undefined,
  lastName: "",
  firstName: "",
  middleName: "",
  city: "",
  state: "",
  date: "",
  result: "",
  additionalRelatives: [],
};

export const InitialPetitionerStatement: PetitionerStatement = {
  canReadAndUnderstandEnglishCheckbox: undefined,
  interpreterReadAndTranslatedCheckbox: undefined,
  interpreterReadAndTranslatedNumber: "",
  preparerAssistanceCheckbox: undefined,
  preparerAssistanceNumber: "",
  daytimeTelephoneNumber: "",
  mobileTelephoneNumber: "",
  petitionerEmailAddress: "",
};

export const InitialInterpreter: Interpreter = {
  lastName: "",
  firstName: "",
  businessName: "",
  streetNumberAndName: "",
  aptCheckbox: undefined,
  steCheckbox: undefined,
  flrCheckbox: undefined,
  aptSteFlrNumber: "",
  city: "",
  state: "",
  zipCode: "",
  province: "",
  postalCode: "",
  country: "",
  daytimeTelephoneNumber: "",
  mobileTelephoneNumber: "",
  emailAddress: "",
  fluentInEnglish: "",
};

export const InitialSponsor: Sponsor = {
  basicInfo: {
    isPetitionerCheckbox: undefined,
    filedAlienWorkerPetitionCheckbox: undefined,
    relationshipToImmigrant: "",
    ownershipInterest5PercentCheckbox: undefined,
    ownershipInterestDescription: "",
    ownershipRelationshipToImmigrant: "",
    onlyJointSponsorCheckbox: undefined,
    notOnlyJointSponsorCheckbox: undefined,
    firstJointSponsorCheckbox: undefined,
    secondJointSponsorCheckbox: undefined,
    substituteSponsorCheckbox: undefined,
    substituteSponsorRelationship: "",
  },
  sponsorDetails: {
    lastName: "",
    firstName: "",
    middleName: "",
    inCareOfName: "",
    mailAddress: InitialAddress,
    mailingAddressSameAsPhysicalYesCheckbox: undefined,
    mailingAddressSameAsPhysicalNoCheckbox: undefined,
    physicalAddress: InitialAddress,
    countryOfDomicile: "",
    dateOfBirth: "",
    cityOfBirth: "",
    stateOrProvinceOfBirth: "",
    countryOfBirth: "",
    ssn: "",
    isUsCitizenCheckbox: undefined,
    isUsNationalCheckbox: undefined,
    isLawfulPermanentResidentCheckbox: undefined,
    sponsorANumber: "",
    uSCISOnlineAccountNumber: "",
    militaryServiceActiveDutyYesCheckbox: undefined,
    militaryServiceActiveDutyNoCheckbox: undefined,
  },
  householdSize: {
    part3Item29: "",
    yourself: "",
    spouse: "",
    dependentChildren: "",
    otherDependents: "",
    sponsoredOtherPersons: "",
    optionalSiblingsParentsAdultChildren: "",
    householdSize: "",
  },
  employmentAndIncome: {
    employedAsCheckbox: undefined,
    employedOccupation: "",
    employer1Name: "",
    employer2Name: "",
    selfEmployedCheckbox: undefined,
    selfEmployedOccupation: "",
    retiredCheckbox: undefined,
    retiredSince: "",
    unemployedCheckbox: undefined,
    unemployedSince: "",
    individualAnnualIncome: "",
    incomeFromOtherHouseholdMember: [],
    totalAnnualHouseholdIncome: "",
    peopleCompletedFormI864ACheckbox: undefined,
    intendingImmigrantCheckbox: undefined,
    intendingImmigrantName: "",
    filedFederalTaxReturnYesCheckbox: undefined,
    filedFederalTaxReturnNoCheckbox: undefined,
    attachedTaxReturnsCheckbox: undefined,
    mostRecentTaxYear: "",
    mostRecentTaxYearIncome: "",
    secondMostRecentTaxYear: "",
    secondMostRecentTaxYearIncome: "",
    thirdMostRecentTaxYear: "",
    thirdMostRecentTaxYearIncome: "",
    notRequiredToFileTaxReturnCheckbox: undefined,
  },
  assetsSupplementIncome: {
    balanceSavingsCheckingAccounts: "",
    netRealEstateHoldings: "",
    netStocksBondsAssets: "",
    totalAssets: "",
    nameOfRelative: "",
    householdMemberAssets: "",
    principalImmigrantSavingsCheckingBalance: "",
    principalImmigrantRealEstateHoldings: "",
    principalImmigrantStocksBondsAssets: "",
    totalPrincipalImmigrantAssets: "",
    totalValueOfAssets: "",
  },
  sponsorContract: {
    canReadUnderstandEnglishCheckbox: undefined,
    interpreterHelpedCheckbox: undefined,
    fluentLanguage: "",
    preparerCheckbox: undefined,
    preparerInformationProvided: "",
    daytimeTelephoneNumber: "",
    mobileTelephoneNumber: "",
    emailAddress: "",
    sponsorSignature: "",
    dateOfSignature: "",
  },
};

export const InitialFamilyBasedProfile: FamilyBasedProfile = {
  relationship: InitialRelationship,
  petitioner: InitialPetitioner,
  beneficiary: InitialBeneficiary,
  beneficiaryEligibility: InitialEligibility,
  previousPetition: InitialPreviousPetition,
  petitionerStatement: InitialPetitionerStatement,
  sponsorList: [],
  interpreter: InitialInterpreter,
};
