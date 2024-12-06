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

  deniedVisaYesCheckbox: undefined,
  deniedVisaNoCheckbox: undefined,

  workedWithoutAuthorizationYesCheckbox: undefined,
  workedWithoutAuthorizationNoCheckbox: undefined,

  violatedNonimmigrantStatusYesCheckbox: undefined,
  violatedNonimmigrantStatusNoCheckbox: undefined,

  removalProceedingsYesCheckbox: undefined,
  removalProceedingsNoCheckbox: undefined,

  finalOrderOfRemovalYesCheckbox: undefined,
  finalOrderOfRemovalNoCheckbox: undefined,

  priorFinalOrderReinstatedYesCheckbox: undefined,
  priorFinalOrderReinstatedNoCheckbox: undefined,

  lprStatusRescindedYesCheckbox: undefined,
  lprStatusRescindedNoCheckbox: undefined,

  voluntaryDepartureFailedYesCheckbox: undefined,
  voluntaryDepartureFailedNoCheckbox: undefined,

  appliedForReliefFromRemovalYesCheckbox: undefined,
  appliedForReliefFromRemovalNoCheckbox: undefined,

  jVisaForeignResidenceRequirementYesCheckbox: undefined,
  jVisaForeignResidenceRequirementNoCheckbox: undefined,
  compliedWithForeignResidenceYesCheckbox: undefined,
  compliedWithForeignResidenceNoCheckbox: undefined,
  grantedWaiverOrRecommendationYesCheckbox: undefined,
  grantedWaiverOrRecommendationNoCheckbox: undefined,

  arrestedOrDetainedYesCheckbox: undefined,
  arrestedOrDetainedNoCheckbox: undefined,

  committedCrimeNoCheckbox: undefined,
  committedCrimeYesCheckbox: undefined,

  pledGuiltyOrConvictedYesCheckbox: undefined,
  pledGuiltyOrConvictedNoCheckbox: undefined,

  orderedPunishedByJudgeNoCheckbox: undefined,
  orderedPunishedByJudgeYesCheckbox: undefined,

  defendantInCriminalProceedingYesCheckbox: undefined,
  defendantInCriminalProceedingNoCheckbox: undefined,

  violatedControlledSubstanceLawNoCheckbox: undefined,
  violatedControlledSubstanceLawYesCheckbox: undefined,

  convictedOfMultipleOffensesNoCheckbox: undefined,
  convictedOfMultipleOffensesYesCheckbox: undefined,

  illicitlyTraffickedControlledSubstancesYesCheckbox: undefined,
  illicitlyTraffickedControlledSubstancesNoCheckbox: undefined,

  aidedInIllicitTraffickingNoCheckbox: undefined,
  aidedInIllicitTraffickingYesCheckbox: undefined,

  relatedToIllicitTraffickerNoCheckbox: undefined,
  relatedToIllicitTraffickerYesCheckbox: undefined,

  engagedInProstitutionNoCheckbox: undefined,
  engagedInProstitutionYesCheckbox: undefined,

  procuredProstitutesYesCheckbox: undefined,
  procuredProstitutesNoCheckbox: undefined,

  receivedProceedsFromProstitutionNoCheckbox: undefined,
  receivedProceedsFromProstitutionYesCheckbox: undefined,

  intentToEngageInIllegalGamblingYesCheckbox: undefined,
  intentToEngageInIllegalGamblingNoCheckbox: undefined,

  exercisedImmunityFromProsecutionNoCheckbox: undefined,
  exercisedImmunityFromProsecutionYesCheckbox: undefined,

  responsibleForReligiousViolationsYesCheckbox: undefined,
  responsibleForReligiousViolationsNoCheckbox: undefined,

  inducedTraffickingForSexNoCheckbox: undefined,
  inducedTraffickingForSexYesCheckbox: undefined,

  traffickedIntoSlaveryNoCheckbox: undefined,
  traffickedIntoSlaveryYesCheckbox: undefined,

  aidedTraffickingForSexOrSlaveryYesCheckbox: undefined,
  aidedTraffickingForSexOrSlaveryNoCheckbox: undefined,

  relatedToTraffickerAndBenefitedNoCheckbox: undefined,
  relatedToTraffickerAndBenefitedYesCheckbox: undefined,

  engagedInMoneyLaunderingYesCheckbox: undefined,
  engagedInMoneyLaunderingNoCheckbox: undefined,

  engageInEspionageOrSabotageYesCheckbox: undefined,
  engageInEspionageOrSabotageNoCheckbox: undefined,

  engageInIllegalExportYesCheckbox: undefined,
  engageInIllegalExportNoCheckbox: undefined,

  engageInOverthrowingGovernmentYesCheckbox: undefined,
  engageInOverthrowingGovernmentNoCheckbox: undefined,

  engageInEndangeringUSYesCheckbox: undefined,
  engageInEndangeringUSNoCheckbox: undefined,

  engageInUnlawfulActivityYesCheckbox: undefined,
  engageInUnlawfulActivityNoCheckbox: undefined,

  engageInAdverseForeignPolicyYesCheckbox: undefined,
  engageInAdverseForeignPolicyNoCheckbox: undefined,

  committedOrPlannedSeriousCrimeYesCheckbox: undefined,
  committedOrPlannedSeriousCrimeNoCheckbox: undefined,

  memberOfGroupInvolvedInSeriousCrimeYesCheckbox: undefined,
  memberOfGroupInvolvedInSeriousCrimeNoCheckbox: undefined,

  recruitedForGroupInvolvedInSeriousCrimeYesCheckbox: undefined,
  recruitedForGroupInvolvedInSeriousCrimeNoCheckbox: undefined,

  providedSupportForGroupInvolvedInSeriousCrimeYesCheckbox: undefined,
  providedSupportForGroupInvolvedInSeriousCrimeNoCheckbox: undefined,

  providedSupportForIndividualOrGroupYesCheckbox: undefined,
  providedSupportForIndividualOrGroupNoCheckbox: undefined,

  receivedMilitaryOrWeaponsTrainingYesCheckbox: undefined,
  receivedMilitaryOrWeaponsTrainingNoCheckbox: undefined,

  intendToEngageInSeriousActivitiesYesCheckbox: undefined,
  intendToEngageInSeriousActivitiesNoCheckbox: undefined,

  spouseOrChildCommittedSeriousCrimeYesCheckbox: undefined,
  spouseOrChildCommittedSeriousCrimeNoCheckbox: undefined,

  spouseOrChildMemberOfGroupYesCheckbox: undefined,
  spouseOrChildMemberOfGroupNoCheckbox: undefined,

  spouseOrChildRecruitedForGroupYesCheckbox: undefined,
  spouseOrChildRecruitedForGroupNoCheckbox: undefined,

  spouseOrChildProvidedSupportYesCheckbox: undefined,
  spouseOrChildProvidedSupportNoCheckbox: undefined,

  spouseOrChildProvidedSupportForIndividualOrGroupYesCheckbox: undefined,
  spouseOrChildProvidedSupportForIndividualOrGroupNoCheckbox: undefined,

  spouseOrChildReceivedTrainingYesCheckbox: undefined,
  spouseOrChildReceivedTrainingNoCheckbox: undefined,

  assistedInWeaponsActivitiesYesCheckbox: undefined,
  assistedInWeaponsActivitiesNoCheckbox: undefined,

  workedOrVolunteeredInDetentionFacilityYesCheckbox: undefined,
  workedOrVolunteeredInDetentionFacilityNoCheckbox: undefined,

  participatedInGroupUsingWeaponsYesCheckbox: undefined,
  participatedInGroupUsingWeaponsNoCheckbox: undefined,

  servedInMilitaryOrArmedGroupYesCheckbox: undefined,
  servedInMilitaryOrArmedGroupNoCheckbox: undefined,

  affiliatedWithCommunistOrTotalitarianPartyYesCheckbox: undefined,
  affiliatedWithCommunistOrTotalitarianPartyNoCheckbox: undefined,

  participatedInNaziPersecutionYesCheckbox: undefined,
  participatedInNaziPersecutionNoCheckbox: undefined,

  involvedInTortureOrGenocideYesCheckbox: undefined,
  involvedInTortureOrGenocideNoCheckbox: undefined,

  killedAnyPersonYesCheckbox: undefined,
  killedAnyPersonNoCheckbox: undefined,

  severelyInjuredAnyPersonYesCheckbox: undefined,
  severelyInjuredAnyPersonNoCheckbox: undefined,

  engagedInNonConsensualSexualContactYesCheckbox: undefined,
  engagedInNonConsensualSexualContactNoCheckbox: undefined,

  limitedReligiousBeliefsYesCheckbox: undefined,
  limitedReligiousBeliefsNoCheckbox: undefined,

  recruitedChildSoldiersYesCheckbox: undefined,
  recruitedChildSoldiersNoCheckbox: undefined,

  usedChildSoldiersInCombatYesCheckbox: undefined,
  usedChildSoldiersInCombatNoCheckbox: undefined,

  subjectToPublicChargeYesCheckbox: undefined,
  subjectToPublicChargeNoCheckbox: undefined,

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

  believeHadReasonableCauseYesCheckbox: undefined,
  believeHadReasonableCauseNoCheckbox: undefined,

  submittedFraudulentDocumentationYesCheckbox: undefined,
  submittedFraudulentDocumentationNoCheckbox: undefined,

  liedOrMisrepresentedForImmigrationBenefitYesCheckbox: undefined,
  liedOrMisrepresentedForImmigrationBenefitNoCheckbox: undefined,

  falselyClaimedUSCitizenshipYesCheckbox: undefined,
  falselyClaimedUSCitizenshipNoCheckbox: undefined,

  beenAStowawayYesCheckbox: undefined,
  beenAStowawayNoCheckbox: undefined,

  knowinglyEncouragedIllegalEntryYesCheckbox: undefined,
  knowinglyEncouragedIllegalEntryNoCheckbox: undefined,

  underCivilPenaltyForFraudulentDocumentsYesCheckbox: undefined,
  underCivilPenaltyForFraudulentDocumentsNoCheckbox: undefined,

  excludedDeportedOrRemovedYesCheckbox: undefined,
  excludedDeportedOrRemovedNoCheckbox: undefined,

  enteredWithoutInspectionYesCheckbox: undefined,
  enteredWithoutInspectionNoCheckbox: undefined,

  unlawfullyPresent180DaysTo1YearYesCheckbox: undefined,
  unlawfullyPresent180DaysTo1YearNoCheckbox: undefined,

  unlawfullyPresent1YearOrMoreYesCheckbox: undefined,
  unlawfullyPresent1YearOrMoreNoCheckbox: undefined,

  reenteredAfterUnlawfullyPresentYesCheckbox: undefined,
  reenteredAfterUnlawfullyPresentNoCheckbox: undefined,

  reenteredAfterDeportationYesCheckbox: undefined,
  reenteredAfterDeportationNoCheckbox: undefined,

  planToPracticePolygamyYesCheckbox: undefined,
  planToPracticePolygamyNoCheckbox: undefined,

  accompanyingInadmissibleForeignNationalYesCheckbox: undefined,
  accompanyingInadmissibleForeignNationalNoCheckbox: undefined,

  assistedInWithholdingCustodyYesCheckbox: undefined,
  assistedInWithholdingCustodyNoCheckbox: undefined,

  votedInViolationOfLawYesCheckbox: undefined,
  votedInViolationOfLawNoCheckbox: undefined,

  renouncedCitizenshipToAvoidTaxYesCheckbox: undefined,
  renouncedCitizenshipToAvoidTaxNoCheckbox: undefined,

  appliedForExemptionFromMilitaryServiceYesCheckbox: undefined,
  appliedForExemptionFromMilitaryServiceNoCheckbox: undefined,

  relievedFromMilitaryServiceYesCheckbox: undefined,
  relievedFromMilitaryServiceNoCheckbox: undefined,

  convictedOfDesertionYesCheckbox: undefined,
  convictedOfDesertionNoCheckbox: undefined,

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
