import {
  AddressHistory,
  Beneficiary,
  Biographic,
  Eligibility,
  EmploymentHistory,
  EntryInformation,
  FamilyBasedProfile,
  Interpreter,
  Parents,
  Petitioner,
  PetitionerOtherName,
  PetitionerStatement,
  PreviousPetition,
  Relationship,
} from "../model/familyBasedApiModels";

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

export const InitialParents: Parents = {
  part: "",
  question: "",
  lastName: "",
  firstName: "",
  middleName: "",
  dateOfBirth: "",
  sexOfMaleCheckbox: "",
  sexOfFemaleCheckbox: "",
  countryOfBirth: "",
  cityOfResidence: "",
  countryOfResidence: "",
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

export const InitialBeneficiary: Beneficiary = {
  alienNumber: "",
  uSCISOnlineAccountNumber: "",
  ssn: "",
  lastName: "",
  firstName: "",
  middleName: "",
  beneficiaryOtherNames: [],
  cityOfBirth: "",
  countryOfBirth: "",
  dateOfBirth: "",
  sexMaleCheckbox: undefined,
  sexFemaleCheckbox: undefined,
  previousPetitionFiledYesCheckbox: undefined,
  previousPetitionFiledNoCheckbox: undefined,
  previousPetitionFiledUnknownCheckbox: undefined,
  addressHistories: [],
  aptOutsideUsCheckbox: undefined,
  steOutsideUsCheckbox: undefined,
  flrOutsideUsCheckbox: undefined,
  aptSteFlrNumberOutsideUs: "",
  cityOrTownOutsideUs: "",
  provinceOutsideUs: "",
  postalCodeOutsideUs: "",
  countryOtherAddress: "",
  dateFromOutsideUs: "",
  dateToOutsideUs: "",
  daytimePhoneNumber: "",
  mobilePhoneNumber: "",
  emailAddress: "",
  timesBeneficiaryMarried: "",
  currentMaritalStatusSingleCheckbox: undefined,
  currentMaritalStatusMarriedCheckbox: undefined,
  currentMaritalStatusDivorcedCheckbox: undefined,
  currentMaritalStatusWidowedCheckbox: undefined,
  currentMaritalStatusSeparatedCheckbox: undefined,
  currentMaritalStatusAnnulledCheckbox: undefined,
  currentMarriageDate: "",
  currentMarriageCity: "",
  currentMarriageState: "",
  currentMarriageProvince: "",
  currentMarriageCountry: "",
  beneficiarySpouses: [],
  beneficiaryFamilies: [],
  entryInformation: InitialEntryInformation,
  employmentHistories: [],
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
  streetNumberAndNameOutsideUsUsedNativeLanguage: "",
  aptUsedNativeLanguageCheckbox: undefined,
  steUsedNativeLanguageCheckbox: undefined,
  flrUsedNativeLanguageCheckbox: undefined,
  NativeLanguageAptSteFlrNumber: "",
  cityOrTownUsedNativeLanguage: "",
  provinceUsedNativeLanguage: "",
  postalCodeUsedNativeLanguage: "",
  countryUsedNativeLanguage: "",
  streetOfLastAddressLivedTogether: "",
  aptLastAddressLivedTogetherCheckbox: undefined,
  steLastAddressLivedTogetherCheckbox: undefined,
  flrLastAddressLivedTogetherCheckbox: undefined,
  lastAddressLivedTogetherAptSteFlrNumber: "",
  cityOrTownLastAddressLivedTogether: "",
  stateLastAddressLivedTogether: "",
  zipCodeLastAddressLivedTogether: "",
  provinceLastAddressLivedTogether: "",
  postalCodeLastAddressLivedTogether: "",
  countryLastAddressLivedTogether: "",
  dateFromLastAddressLivedTogether: "",
  dateToLastAddressLivedTogether: "",
  adjustmentOfStatusCity: "",
  adjustmentOfStatusState: "",
  immigrantVisaCity: "",
  immigrantVisaProvince: "",
  immigrantVisaCountry: "",
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
  petitionerSignature: "",
  dateOfSignature: "",
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

export const InitialFamilyBasedProfile: FamilyBasedProfile = {
  relationship: InitialRelationship,
  petitioner: InitialPetitioner,
  beneficiary: InitialBeneficiary,
  beneficiaryEligibility: InitialEligibility,
  previousPetition: InitialPreviousPetition,
  petitionerStatement: InitialPetitionerStatement,
  interpreter: InitialInterpreter,
};

export const InitialAddressHistory: AddressHistory = {
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
