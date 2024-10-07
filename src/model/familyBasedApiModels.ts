export interface Relationship {
  // Part 1-1
  petitionForSpouseCheckbox: string | undefined;
  // Part 1-2
  petitionForParentCheckbox: string | undefined;
  // Part 1-3
  petitionForSiblingCheckbox: string | undefined;
  // Part 1-4
  petitionForChildCheckbox: string | undefined;

  // Part 1-Q2-1
  petitionForChildBornInWedlockCheckbox: string | undefined;
  // Part 1-Q2-2
  petitionForStepchildAndStepparentCheckbox: string | undefined;
  // Part 1-Q2-3
  petitionForChildNotBornInWedlockCheckbox: string | undefined;
  // Part 1-Q2-4
  petitionForChildAdoptedCheckbox: string | undefined;

  // Part 1-Q3
  siblingAdoptionRelationYesCheckbox: string | undefined;
  siblingAdoptionRelationNoCheckbox: string | undefined;

  // Part 1-Q4
  gainedStatusThroughAdoptionYesCheckbox: string | undefined;
  gainedStatusThroughAdoptionNoCheckbox: string | undefined;
}

export interface PetitionerOtherName {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  // Family name for petitioner's other name used
  lastName: string;
  // Given name for petitioner's other name used
  firstName: string;
  // Middle name for petitioner's other name used
  middleName: string;
}

export interface Spouses {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  lastName: string;
  firstName: string;
  middleName: string;
  dateMarriageEnded: string;
}

export interface EmploymentHistory {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;
  inUSA: string | undefined;

  nameOfEmployer: string;
  streetNumberAndName: string;

  aptCheckbox: string | undefined;
  steCheckbox: string | undefined;
  flrCheckbox: string | undefined;
  aptSteFlrNumber: string;

  city: string;
  state: string;
  zipCode: string;
  province: string;
  postalCode: string;
  country: string;
  occupation: string;
  dateFrom: string;
  dateTo: string;
}

export interface AddressHistory {
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
  dateFrom: string;
  dateTo: string;
}

export interface Parents {
  part: string;
  question: string;
  lastName: string; // Mother: P3Q24a, Father: P3Q30a
  firstName: string; // Mother: P3Q24b, Father: P3Q30b
  middleName: string; // Mother: P3Q24c, Father: P3Q30c
  dateOfBirth: string; // Mother: P3Q25, Father: P3Q31

  sexOfMaleCheckbox: string; // Mother: P3Q26, Father: P3Q32
  sexOfFemaleCheckbox: string; // Mother: P3Q26, Father: P3Q32

  countryOfBirth: string; // Mother: P3Q27, Father: P3Q33
  cityOfResidence: string; // Mother: P3Q28, Father: P3Q34
  countryOfResidence: string; // Mother: P3Q29, Father: P3Q35
}

export interface Petitioner {
  // 132
  alienNumber: string;
  // 133
  uSCISOnlineAccountNumber: string;
  // 112
  ssn: string;
  // 129
  lastName: string;
  // 130
  firstName: string;
  // 131
  middleName: string;
  // 178 - 180
  petitionerOtherNames: PetitionerOtherName[];

  // 177
  cityOfBirth: string;
  // 137
  countryOfBirth: string;
  // 134
  dateOfBirth: string;

  // Part 2-9-M
  sexMaleCheckbox: string | undefined;
  // Part 2-9-F
  sexFemaleCheckbox: string | undefined;
  // 151
  inCareOf: string;
  // 140
  streetNumberAndName: string;
  // 144
  aptCheckbox: string | undefined;
  steCheckbox: string | undefined;
  flrCheckbox: string | undefined;
  aptSteFlrNumber: string;
  // 145
  cityOrTown: string;
  // 149
  state: string;
  // 148
  zipCode: string;
  // 146
  province: string;
  // 147
  postalCode: string;
  // 150
  country: string;
  // Part2-11 Yes
  mailingAddressSameAsPhysicalAddressYesCheckbox: string | undefined;
  // No
  mailingAddressSameAsPhysicalAddressNoCheckbox: string | undefined;

  addressHistory: AddressHistory[];

  // 181
  timesMarried: string;
  // Part2-17
  currentMartialStatusSingleCheckbox: string | undefined;
  currentMartialStatusMarriedCheckbox: string | undefined;
  currentMartialStatusDivorcedCheckbox: string | undefined;
  currentMartialStatusWidowedCheckbox: string | undefined;
  currentMartialStatusSeparatedCheckbox: string | undefined;
  currentMartialStatusAnnulledCheckbox: string | undefined;
  // 197
  dateOfCurrentMarriage: string;
  // 226
  cityOfCurrentMarriage: string;
  // 227
  stateOfCurrentMarriage: string;
  // 228
  provinceOfCurrentMarriage: string;
  // 229
  countryOfCurrentMarriage: string;

  spouses: Spouses[];
  mother: Parents;
  father: Parents;

  // Part2-36
  iAmUsCitizenCheckbox: string | undefined;
  iAmLawfulPermanentResidentCheckbox: string | undefined;

  // Part2-37
  citizenshipAcquiredByBirthCheckbox: string | undefined;
  citizenshipAcquiredByNaturalizationCheckbox: string | undefined;
  citizenshipAcquiredThroughParentsCheckbox: string | undefined;

  // Part2-38
  obtainedNaturalizationCertificateYesCheckbox: string | undefined;
  obtainedNaturalizationCertificateNoCheckbox: string | undefined;

  // 217
  certificateNumber: string;
  // 221
  placeOfIssuance: string;
  // 220
  dateOfIssuance: string;

  // 230
  classOfAdmission: string;
  // 231
  dateOfAdmission: string;
  // 232
  placeOfAdmissionCity: string;
  // 286
  placeOfAdmissionState: string;
  // Part2-41
  gainedStatusThroughMarriageYesCheckbox: string | undefined;
  gainedStatusThroughMarriageNoCheckbox: string | undefined;

  employmentHistory: EmploymentHistory[];

  biographic: Biographic;
}

export interface Biographic {
  // Part3-1
  ethnicityHispanicCheckbox: string | undefined;
  ethnicityNotHispanicCheckbox: string | undefined;

  // Part3-2
  raceWhiteCheckbox: string | undefined;
  raceAsianCheckbox: string | undefined;
  raceBlackCheckbox: string | undefined;
  raceAmericanIndianCheckbox: string | undefined;
  raceNativeHawaiianCheckbox: string | undefined;

  // 268
  heightFeet: string;
  // 269
  heightInches: string;
  // 27
  weightPounds1: string;
  weightPounds2: string;
  weightPounds3: string;
  // Part3-5
  eyeColorBlackCheckbox: string | undefined;
  eyeColorBlueCheckbox: string | undefined;
  eyeColorBrownCheckbox: string | undefined;
  eyeColorGrayCheckbox: string | undefined;
  eyeColorGreenCheckbox: string | undefined;
  eyeColorHazelCheckbox: string | undefined;
  eyeColorMaroonCheckbox: string | undefined;
  eyeColorPinkCheckbox: string | undefined;
  eyeColorUnknownCheckbox: string | undefined;
  // Part3-6
  hairColorBaldCheckbox: string | undefined;
  hairColorBlackCheckbox: string | undefined;
  hairColorBlondCheckbox: string | undefined;
  hairColorBrownCheckbox: string | undefined;
  hairColorGrayCheckbox: string | undefined;
  hairColorRedCheckbox: string | undefined;
  hairColorSandyCheckbox: string | undefined;
  hairColorWhiteCheckbox: string | undefined;
  hairColorUnknownCheckbox: string | undefined;
}

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

export interface BeneficiarySpouses {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  lastName: string;
  firstName: string;
  middleName: string;
  dateMarriageEnded: string;
}

export interface BeneficiaryFamily {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  lastName: string;
  firstName: string;
  middleName: string;
  relationship: string;
  dateOfBirth: string;
  countryOfBirth: string;
}

export interface EntryInformation {
  beneficiaryEverInUSYesCheckbox: string;
  beneficiaryEverInUSNoCheckbox: string;
  arrivedAsAdmission: string;
  i94Number: string;
  dateOfArrival: string;
  authorizedStayExpirationDate: string;
  passportNumber: string;
  travelDocumentNumber: string;
  passportIssueCountry: string;
  expirationDateForPassport: string;
}

export interface Organization {
  orgName: string; // Used in P9Q2, P9Q6, P10Q10
  cityTown: string; // Used in P9Q3a, P9Q7a, P10Q11a
  state: string; // Used in P9Q3b, P9Q7b, P10Q11b
  country: string; // Used in P9Q3c, P9Q7c, P10Q11c
  natureOfGroup: string; // Used in P9Q4, P9Q8, P10Q12
  dateFrom: string; // Used in P9Q5a, P10Q9a, P10Q13a
  dateTo: string; // Used in P9Q5b, P10Q9b, P10Q13b
}

export interface Beneficiary {
  // 287
  alienNumber: string;
  // 288
  uSCISOnlineAccountNumber: string;
  // 341
  ssn: string;
  // 289
  lastName: string;
  // 290
  firstName: string;
  // 291
  middleName: string;

  // 292 - 294
  beneficiaryOtherNames: BeneficiaryOtherName[];

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
  // Part 4-10
  previousPetitionFiledYesCheckbox: string | undefined;
  previousPetitionFiledNoCheckbox: string | undefined;
  previousPetitionFiledUnknownCheckbox: string | undefined;

  addressHistories: AddressHistory[];

  // 309
  aptOutsideUsCheckbox: string | undefined;
  steOutsideUsCheckbox: string | undefined;
  flrOutsideUsCheckbox: string | undefined;
  aptSteFlrNumberOutsideUs: string;
  // 314
  cityOrTownOutsideUs: string;
  // 316
  provinceOutsideUs: string;
  // 308
  postalCodeOutsideUs: string;
  // 315
  countryOtherAddress: string;

  // 151
  dateFromOutsideUs: string;
  // 150
  dateToOutsideUs: string;

  // 340
  daytimePhoneNumber: string;
  // 350
  mobilePhoneNumber: string;
  // 351
  emailAddress: string;
  // 343
  timesBeneficiaryMarried: string;
  // Part 4-18
  currentMaritalStatusSingleCheckbox: string | undefined;
  currentMaritalStatusMarriedCheckbox: string | undefined;
  currentMaritalStatusDivorcedCheckbox: string | undefined;
  currentMaritalStatusWidowedCheckbox: string | undefined;
  currentMaritalStatusSeparatedCheckbox: string | undefined;
  currentMaritalStatusAnnulledCheckbox: string | undefined;
  // 352
  currentMarriageDate: string;
  // 379
  currentMarriageCity: string;
  // 380
  currentMarriageState: string;
  // 342
  currentMarriageProvince: string;
  // 381
  currentMarriageCountry: string;
  //
  beneficiarySpouses: BeneficiarySpouses[];
  // need parent info.
  beneficiaryFamilies: BeneficiaryFamily[];

  entryInformation: EntryInformation;
  employmentHistories: EmploymentHistory[];

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

  // 427
  lastNameUsedNativeLanguage: string;
  // 428
  firstNameUsedNativeLanguage: string;
  // 426
  middleNameUsedNativeLanguage: string;
  // 437
  streetNumberAndNameOutsideUsUsedNativeLanguage: string;
  // 432
  aptUsedNativeLanguageCheckbox: string | undefined;
  steUsedNativeLanguageCheckbox: string | undefined;
  flrUsedNativeLanguageCheckbox: string | undefined;
  NativeLanguageAptSteFlrNumber: string | undefined;
  // 433
  cityOrTownUsedNativeLanguage: string;
  // 434
  provinceUsedNativeLanguage: string;
  // 436
  postalCodeUsedNativeLanguage: string;
  // 435
  countryUsedNativeLanguage: string;

  // 442
  streetOfLastAddressLivedTogether: string;
  // 440
  aptLastAddressLivedTogetherCheckbox: string | undefined;
  steLastAddressLivedTogetherCheckbox: string | undefined;
  flrLastAddressLivedTogetherCheckbox: string | undefined;
  lastAddressLivedTogetherAptSteFlrNumber: string;
  // 443
  cityOrTownLastAddressLivedTogether: string;
  // 445
  stateLastAddressLivedTogether: string;
  // 444
  zipCodeLastAddressLivedTogether: string;
  // 448
  provinceLastAddressLivedTogether: string;
  // 450
  postalCodeLastAddressLivedTogether: string;
  // 449
  countryLastAddressLivedTogether: string;
  // 446
  dateFromLastAddressLivedTogether: string;
  // 447
  dateToLastAddressLivedTogether: string;

  // 463
  adjustmentOfStatusCity: string;
  // 464
  adjustmentOfStatusState: string;

  // 451
  immigrantVisaCity: string;
  // 452
  immigrantVisaProvince: string;
  // 453
  immigrantVisaCountry: string;
}

export interface Benefit {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  benefitReceived: string;
  startDate: string;
  endDate: string;
  dollarAmount: string;
}

export interface Institutionalization {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  institutionNameCityState: string;
  dateFrom: string;
  dateTo: string;
  reason: string;
}

export interface Eligibility {
  // Page 9 Question 1-13 - associated with organization
  associatedWithOrganizationYesCheckbox: string | undefined;
  associatedWithOrganizationNoCheckbox: string | undefined;
  organizations: Organization[];

  // Page 10 Question 14 - Denied admission
  deniedAdmissionYesCheckbox: string | undefined;
  deniedAdmissionNoCheckbox: string | undefined;

  // Page 10 Question 15 - Denied visa
  deniedVisaYesCheckbox: string | undefined;
  deniedVisaNoCheckbox: string | undefined;

  // Page 10 Question 16 - Worked without authorization
  workedWithoutAuthorizationYesCheckbox: string | undefined;
  workedWithoutAuthorizationNoCheckbox: string | undefined;

  // Page 10 Question 17 - Violated nonimmigrant status
  violatedNonimmigrantStatusYesCheckbox: string | undefined;
  violatedNonimmigrantStatusNoCheckbox: string | undefined;

  // Page 10 Question 18 - Removal proceedings
  removalProceedingsYesCheckbox: string | undefined;
  removalProceedingsNoCheckbox: string | undefined;

  // Page 10 Question 19 - Final order of removal
  finalOrderOfRemovalYesCheckbox: string | undefined;
  finalOrderOfRemovalNoCheckbox: string | undefined;

  // Page 10 Question 20 - Prior final order reinstated
  priorFinalOrderReinstatedYesCheckbox: string | undefined;
  priorFinalOrderReinstatedNoCheckbox: string | undefined;

  // Page 10 Question 21 - LPR status rescinded
  lprStatusRescindedYesCheckbox: string | undefined;
  lprStatusRescindedNoCheckbox: string | undefined;

  // Page 10 Question 22 - Voluntary departure failed
  voluntaryDepartureFailedYesCheckbox: string | undefined;
  voluntaryDepartureFailedNoCheckbox: string | undefined;

  // Page 10 Question 23 - Applied for relief from removal
  appliedForReliefFromRemovalYesCheckbox: string | undefined;
  appliedForReliefFromRemovalNoCheckbox: string | undefined;

  // Page 10 Question 24a-24c - Compliance with specific visa requirements (J visa)
  jVisaForeignResidenceRequirementYesCheckbox: string | undefined;
  jVisaForeignResidenceRequirementNoCheckbox: string | undefined;
  compliedWithForeignResidenceYesCheckbox: string | undefined;
  compliedWithForeignResidenceNoCheckbox: string | undefined;
  grantedWaiverOrRecommendationYesCheckbox: string | undefined;
  grantedWaiverOrRecommendationNoCheckbox: string | undefined;

  // Page 10 Question 25 - Arrested or Detained
  arrestedOrDetainedYesCheckbox: string | undefined;
  arrestedOrDetainedNoCheckbox: string | undefined;

  // Page 10 Question 26 - Committed Crime
  committedCrimeNoCheckbox: string | undefined;
  committedCrimeYesCheckbox: string | undefined;

  // Page 11 Question 27 - Pled Guilty or Convicted
  pledGuiltyOrConvictedYesCheckbox: string | undefined;
  pledGuiltyOrConvictedNoCheckbox: string | undefined;

  // Page 11 Question 28 - Ordered Punished by Judge
  orderedPunishedByJudgeNoCheckbox: string | undefined;
  orderedPunishedByJudgeYesCheckbox: string | undefined;

  // Page 11 Question 29 - Defendant in Criminal Proceeding
  defendantInCriminalProceedingYesCheckbox: string | undefined;
  defendantInCriminalProceedingNoCheckbox: string | undefined;

  // Page 11 Question 30 - Violated Controlled Substance Law
  violatedControlledSubstanceLawNoCheckbox: string | undefined;
  violatedControlledSubstanceLawYesCheckbox: string | undefined;

  // Page 11 Question 31 - Convicted of Multiple Offenses
  convictedOfMultipleOffensesNoCheckbox: string | undefined;
  convictedOfMultipleOffensesYesCheckbox: string | undefined;

  // Page 11 Question 32 - Illicitly Trafficked Controlled Substances
  illicitlyTraffickedControlledSubstancesYesCheckbox: string | undefined;
  illicitlyTraffickedControlledSubstancesNoCheckbox: string | undefined;

  // Page 11 Question 33 - Aided in Illicit Trafficking
  aidedInIllicitTraffickingNoCheckbox: string | undefined;
  aidedInIllicitTraffickingYesCheckbox: string | undefined;

  // Page 11 Question 34 - Related to Illicit Trafficker
  relatedToIllicitTraffickerNoCheckbox: string | undefined;
  relatedToIllicitTraffickerYesCheckbox: string | undefined;

  // Page 11 Question 35 - Engaged in Prostitution
  engagedInProstitutionNoCheckbox: string | undefined;
  engagedInProstitutionYesCheckbox: string | undefined;

  // Page 11 Question 36 - Procured Prostitutes
  procuredProstitutesYesCheckbox: string | undefined;
  procuredProstitutesNoCheckbox: string | undefined;

  // Page 11 Question 37 - Received Proceeds from Prostitution
  receivedProceedsFromProstitutionNoCheckbox: string | undefined;
  receivedProceedsFromProstitutionYesCheckbox: string | undefined;
  // Page 11 Question 38 - Intent to Engage in Illegal Gambling
  intentToEngageInIllegalGamblingYesCheckbox: string | undefined;
  intentToEngageInIllegalGamblingNoCheckbox: string | undefined;

  // Page 11 Question 39 - Exercised Immunity from Prosecution
  exercisedImmunityFromProsecutionNoCheckbox: string | undefined;
  exercisedImmunityFromProsecutionYesCheckbox: string | undefined;

  // Page 11 Question 40 - Responsible for Religious Violations
  responsibleForReligiousViolationsYesCheckbox: string | undefined;
  responsibleForReligiousViolationsNoCheckbox: string | undefined;

  // Page 11 Question 41 - Induced Trafficking for Sex
  inducedTraffickingForSexNoCheckbox: string | undefined;
  inducedTraffickingForSexYesCheckbox: string | undefined;

  // Page 11 Question 42 - Trafficked into Slavery
  traffickedIntoSlaveryNoCheckbox: string | undefined;
  traffickedIntoSlaveryYesCheckbox: string | undefined;

  // Page 11 Question 43 - Aided Trafficking for Sex or Slavery
  aidedTraffickingForSexOrSlaveryYesCheckbox: string | undefined;
  aidedTraffickingForSexOrSlaveryNoCheckbox: string | undefined;

  // Page 11 Question 44 - Related to Trafficker and Benefited
  relatedToTraffickerAndBenefitedNoCheckbox: string | undefined;
  relatedToTraffickerAndBenefitedYesCheckbox: string | undefined;

  // Page 11 Question 45 - Engaged in Money Laundering
  engagedInMoneyLaunderingYesCheckbox: string | undefined;
  engagedInMoneyLaunderingNoCheckbox: string | undefined;

  // Page 12, Question 46a - Engage in Espionage or Sabotage
  engageInEspionageOrSabotageYesCheckbox: string | undefined;
  engageInEspionageOrSabotageNoCheckbox: string | undefined;

  // Page 12, Question 46b - Engage in Illegal Export
  engageInIllegalExportYesCheckbox: string | undefined;
  engageInIllegalExportNoCheckbox: string | undefined;

  // Page 12, Question 46c - Engage in Overthrowing Government
  engageInOverthrowingGovernmentYesCheckbox: string | undefined;
  engageInOverthrowingGovernmentNoCheckbox: string | undefined;

  // Page 12, Question 46d - Engage in Endangering US
  engageInEndangeringUSYesCheckbox: string | undefined;
  engageInEndangeringUSNoCheckbox: string | undefined;

  // Page 12, Question 46e - Engage in Unlawful Activity
  engageInUnlawfulActivityYesCheckbox: string | undefined;
  engageInUnlawfulActivityNoCheckbox: string | undefined;

  // Page 12, Question 47 - Engage in Adverse Foreign Policy
  engageInAdverseForeignPolicyYesCheckbox: string | undefined;
  engageInAdverseForeignPolicyNoCheckbox: string | undefined;

  // Page 12, Question 48a - Committed or Planned Serious Crime
  committedOrPlannedSeriousCrimeYesCheckbox: string | undefined;
  committedOrPlannedSeriousCrimeNoCheckbox: string | undefined;

  // Page 12, Question 48b - Member of a Group Involved in Serious Crime
  memberOfGroupInvolvedInSeriousCrimeYesCheckbox: string | undefined;
  memberOfGroupInvolvedInSeriousCrimeNoCheckbox: string | undefined;

  // Page 12, Question 48c - Recruited for a Group Involved in Serious Crime
  recruitedForGroupInvolvedInSeriousCrimeYesCheckbox: string | undefined;
  recruitedForGroupInvolvedInSeriousCrimeNoCheckbox: string | undefined;

  // Page 12, Question 48d - Provided Support for a Group Involved in Serious Crime
  providedSupportForGroupInvolvedInSeriousCrimeYesCheckbox: string | undefined;
  providedSupportForGroupInvolvedInSeriousCrimeNoCheckbox: string | undefined;

  // Page 12, Question 48e - Provided Support for an Individual or Group
  providedSupportForIndividualOrGroupYesCheckbox: string | undefined;
  providedSupportForIndividualOrGroupNoCheckbox: string | undefined;

  // Page 12, Question 49 - Received Military or Weapons Training
  receivedMilitaryOrWeaponsTrainingYesCheckbox: string | undefined;
  receivedMilitaryOrWeaponsTrainingNoCheckbox: string | undefined;

  // Page 12, Question 50 - Intent to Engage in Serious Activities
  intendToEngageInSeriousActivitiesYesCheckbox: string | undefined;
  intendToEngageInSeriousActivitiesNoCheckbox: string | undefined;

  // Page 12, Question 51a - Spouse or Child Committed Serious Crime
  spouseOrChildCommittedSeriousCrimeYesCheckbox: string | undefined;
  spouseOrChildCommittedSeriousCrimeNoCheckbox: string | undefined;

  // Page 12, Question 51b - Spouse or Child Member of a Group
  spouseOrChildMemberOfGroupYesCheckbox: string | undefined;
  spouseOrChildMemberOfGroupNoCheckbox: string | undefined;

  // Page 12, Question 51c - Spouse or Child Recruited for a Group
  spouseOrChildRecruitedForGroupYesCheckbox: string | undefined;
  spouseOrChildRecruitedForGroupNoCheckbox: string | undefined;

  // Page 12, Question 51d - Spouse or Child Provided Support
  spouseOrChildProvidedSupportYesCheckbox: string | undefined;
  spouseOrChildProvidedSupportNoCheckbox: string | undefined;

  // Page 12, Question 51e - Spouse or Child Provided Support for Individual or Group
  spouseOrChildProvidedSupportForIndividualOrGroupYesCheckbox: string | undefined;
  spouseOrChildProvidedSupportForIndividualOrGroupNoCheckbox: string | undefined;

  // Page 12, Question 51f - Spouse or Child Received Training
  spouseOrChildReceivedTrainingYesCheckbox: string | undefined;
  spouseOrChildReceivedTrainingNoCheckbox: string | undefined;

  // Page 12, Question 52 - Assisted in Weapons Activities
  assistedInWeaponsActivitiesYesCheckbox: string | undefined;
  assistedInWeaponsActivitiesNoCheckbox: string | undefined;

  // Page 13, Question 53 - Worked or Volunteered in a Detention Facility
  workedOrVolunteeredInDetentionFacilityYesCheckbox: string | undefined;
  workedOrVolunteeredInDetentionFacilityNoCheckbox: string | undefined;

  // Page 13, Question 54 - Participated in a Group Using Weapons
  participatedInGroupUsingWeaponsYesCheckbox: string | undefined;
  participatedInGroupUsingWeaponsNoCheckbox: string | undefined;

  // Page 13, Question 55 - Served in Military or Armed Group
  servedInMilitaryOrArmedGroupYesCheckbox: string | undefined;
  servedInMilitaryOrArmedGroupNoCheckbox: string | undefined;

  // Page 13, Question 56 - Affiliated with Communist or Totalitarian Party
  affiliatedWithCommunistOrTotalitarianPartyYesCheckbox: string | undefined;
  affiliatedWithCommunistOrTotalitarianPartyNoCheckbox: string | undefined;

  // Page 13, Question 57 - Participated in Nazi Persecution
  participatedInNaziPersecutionYesCheckbox: string | undefined;
  participatedInNaziPersecutionNoCheckbox: string | undefined;

  // Page 13, Question 58a - Involved in Torture or Genocide
  involvedInTortureOrGenocideYesCheckbox: string | undefined;
  involvedInTortureOrGenocideNoCheckbox: string | undefined;

  // Page 13, Question 58b - Killed Any Person
  killedAnyPersonYesCheckbox: string | undefined;
  killedAnyPersonNoCheckbox: string | undefined;

  // Page 13, Question 58c - Severely Injured Any Person
  severelyInjuredAnyPersonYesCheckbox: string | undefined;
  severelyInjuredAnyPersonNoCheckbox: string | undefined;

  // Page 13, Question 58d - Engaged in Non-Consensual Sexual Contact
  engagedInNonConsensualSexualContactYesCheckbox: string | undefined;
  engagedInNonConsensualSexualContactNoCheckbox: string | undefined;

  // Page 13, Question 58e - Limited Religious Beliefs
  limitedReligiousBeliefsYesCheckbox: string | undefined;
  limitedReligiousBeliefsNoCheckbox: string | undefined;

  // Page 13, Question 59 - Recruited Child Soldiers
  recruitedChildSoldiersYesCheckbox: string | undefined;
  recruitedChildSoldiersNoCheckbox: string | undefined;

  // Page 13, Question 60 - Used Child Soldiers in Combat
  usedChildSoldiersInCombatYesCheckbox: string | undefined;
  usedChildSoldiersInCombatNoCheckbox: string | undefined;

  // Page 13, Question 61 - Subject to Public Charge
  subjectToPublicChargeYesCheckbox: string | undefined;
  subjectToPublicChargeNoCheckbox: string | undefined;

  // Page 13, Question 62 - Household Size
  householdSize: string;

  // Page 13, Question 63 - Household Income Range
  householdIncomeRange0to27kCheckbox: string | undefined;
  householdIncomeRange27kto52kCheckbox: string | undefined;
  householdIncomeRange52kto85kCheckbox: string | undefined;
  householdIncomeRange85kto141kCheckbox: string | undefined;
  householdIncomeRangeOver141kCheckbox: string | undefined;

  // Page 13, Question 64 - Household Assets Value
  householdAssetsValue0to18kCheckbox: string | undefined;
  householdAssetsValue18kto136kCheckbox: string | undefined;
  householdAssetsValue136kto321kCheckbox: string | undefined;
  householdAssetsValue321kto707kCheckbox: string | undefined;
  householdAssetsValueOver707kCheckbox: string | undefined;

  // Page 14, Question 65 - Liabilities Value
  liabilitiesValue0Checkbox: string | undefined;
  liabilitiesValue1kto10kCheckbox: string | undefined;
  liabilitiesValue10kto57kCheckbox: string | undefined;
  liabilitiesValue57kto186kCheckbox: string | undefined;
  liabilitiesValueOver186kCheckbox: string | undefined;

  // Page 14, Question 66 - Education Level
  educationGrades1to11Checkbox: string | undefined;
  education12thNoDiplomaCheckbox: string | undefined;
  educationHighSchoolDiplomaCheckbox: string | undefined;
  educationSomeCollegeNoDegreeCheckbox: string | undefined;
  educationAssociatesDegreeCheckbox: string | undefined;
  educationBachelorsDegreeCheckbox: string | undefined;
  educationMastersDegreeCheckbox: string | undefined;
  educationProfessionalDegreeCheckbox: string | undefined;
  educationDoctorateDegreeCheckbox: string | undefined;

  // Page 14, Question 67 - Certifications, Licenses, Skills
  certificationsLicensesSkills: string;

  // Page 14, Question 68a - Received SSI or TANF
  receivedSSIOrTANFYesCheckbox: string | undefined;
  receivedSSIOrTANFNoCheckbox: string | undefined;

  // Page 14, Question 68b - Received Institutionalization
  receivedInstitutionalizationYesCheckbox: string | undefined;
  receivedInstitutionalizationNoCheckbox: string | undefined;

  // Page 14, Question 68c - Detailed Benefits Information
  benefitRecords: Benefit[];

  // Page 14, Question 68d - Detailed Institutionalization Information
  institutionalizationRecords: Institutionalization[];

  // Page 15, Question 69a - Failed to Attend Removal Proceeding
  failedToAttendRemovalProceedingYesCheckbox: string | undefined;
  failedToAttendRemovalProceedingNoCheckbox: string | undefined;

  // Page 15, Question 69b - Believe Had Reasonable Cause
  believeHadReasonableCauseYesCheckbox: string | undefined;
  believeHadReasonableCauseNoCheckbox: string | undefined;

  // Page 15, Question 70 - Submitted Fraudulent Documentation
  submittedFraudulentDocumentationYesCheckbox: string | undefined;
  submittedFraudulentDocumentationNoCheckbox: string | undefined;

  // Page 15, Question 71 - Lied or Misrepresented for Immigration Benefit
  liedOrMisrepresentedForImmigrationBenefitYesCheckbox: string | undefined;
  liedOrMisrepresentedForImmigrationBenefitNoCheckbox: string | undefined;

  // Page 15, Question 72 - Falsely Claimed US Citizenship
  falselyClaimedUSCitizenshipYesCheckbox: string | undefined;
  falselyClaimedUSCitizenshipNoCheckbox: string | undefined;

  // Page 15, Question 73 - Been a Stowaway
  beenAStowawayYesCheckbox: string | undefined;
  beenAStowawayNoCheckbox: string | undefined;

  // Page 15, Question 74 - Knowingly Encouraged Illegal Entry
  knowinglyEncouragedIllegalEntryYesCheckbox: string | undefined;
  knowinglyEncouragedIllegalEntryNoCheckbox: string | undefined;

  // Page 15, Question 75 - Under Civil Penalty for Fraudulent Documents
  underCivilPenaltyForFraudulentDocumentsYesCheckbox: string | undefined;
  underCivilPenaltyForFraudulentDocumentsNoCheckbox: string | undefined;

  // Page 15, Question 76 - Excluded, Deported, or Removed
  excludedDeportedOrRemovedYesCheckbox: string | undefined;
  excludedDeportedOrRemovedNoCheckbox: string | undefined;

  // Page 15, Question 77 - Entered Without Inspection
  enteredWithoutInspectionYesCheckbox: string | undefined;
  enteredWithoutInspectionNoCheckbox: string | undefined;

  // Page 15, Question 78a - Unlawfully Present 180 Days to 1 Year
  unlawfullyPresent180DaysTo1YearYesCheckbox: string | undefined;
  unlawfullyPresent180DaysTo1YearNoCheckbox: string | undefined;

  // Page 15, Question 78b - Unlawfully Present 1 Year or More
  unlawfullyPresent1YearOrMoreYesCheckbox: string | undefined;
  unlawfullyPresent1YearOrMoreNoCheckbox: string | undefined;

  // Page 15, Question 79a - Reentered After Unlawfully Present
  reenteredAfterUnlawfullyPresentYesCheckbox: string | undefined;
  reenteredAfterUnlawfullyPresentNoCheckbox: string | undefined;

  // Page 15, Question 79b - Reentered After Deportation
  reenteredAfterDeportationYesCheckbox: string | undefined;
  reenteredAfterDeportationNoCheckbox: string | undefined;

  // Page 15, Question 80 - Plan to Practice Polygamy
  planToPracticePolygamyYesCheckbox: string | undefined;
  planToPracticePolygamyNoCheckbox: string | undefined;

  // Page 15, Question 81 - Accompanying Inadmissible Foreign National
  accompanyingInadmissibleForeignNationalYesCheckbox: string | undefined;
  accompanyingInadmissibleForeignNationalNoCheckbox: string | undefined;

  // Page 15, Question 82 - Assisted in Withholding Custody
  assistedInWithholdingCustodyYesCheckbox: string | undefined;
  assistedInWithholdingCustodyNoCheckbox: string | undefined;

  // Page 15, Question 83 - Voted in Violation of Law
  votedInViolationOfLawYesCheckbox: string | undefined;
  votedInViolationOfLawNoCheckbox: string | undefined;

  // Page 15, Question 84 - Renounced Citizenship to Avoid Tax
  renouncedCitizenshipToAvoidTaxYesCheckbox: string | undefined;
  renouncedCitizenshipToAvoidTaxNoCheckbox: string | undefined;

  // Page 16, Question 85a - Applied for Exemption from Military Service
  appliedForExemptionFromMilitaryServiceYesCheckbox: string | undefined;
  appliedForExemptionFromMilitaryServiceNoCheckbox: string | undefined;

  // Page 16, Question 85b - Relieved from Military Service
  relievedFromMilitaryServiceYesCheckbox: string | undefined;
  relievedFromMilitaryServiceNoCheckbox: string | undefined;

  // Page 16, Question 85c - Convicted of Desertion
  convictedOfDesertionYesCheckbox: string | undefined;
  convictedOfDesertionNoCheckbox: string | undefined;

  // Page 16, Question 86a - Evaded Military Service During War
  evadedMilitaryServiceDuringWarYesCheckbox: string | undefined;
  evadedMilitaryServiceDuringWarNoCheckbox: string | undefined;

  // Page 16, Question 86b - Nationality or Status Before Evading Military Service
  nationalityOrStatusBeforeEvadingMilitaryService: string;
}

export interface AdditionalRelative {
  lastName: string;
  firstName: string;
  middleName: string;
  relationship: string;
}

export interface PreviousPetition {
  // part 5-1
  filedPetitionYesCheckbox: string | undefined;
  filedPetitionNoCheckbox: string | undefined;

  // 456
  lastName: string;
  // 457
  firstName: string;
  // 458
  middleName: string;
  // 461
  city: string;
  // 462
  state: string;
  // 460
  date: string;
  // 459
  result: string;

  additionalRelatives: AdditionalRelative[];
}

export interface PetitionerStatement {
  // Part 6-1a
  canReadAndUnderstandEnglishCheckbox: string | undefined;
  // Part 6-1b 478
  interpreterReadAndTranslatedCheckbox: string | undefined;
  interpreterReadAndTranslatedNumber: string;
  // 480
  preparerAssistanceCheckbox: string | undefined;
  preparerAssistanceNumber: string;
  // 469
  daytimeTelephoneNumber: string;
  // 471
  mobileTelephoneNumber: string;
  // 470
  petitionerEmailAddress: string;
  // 482
  petitionerSignature: string;
  // 481
  dateOfSignature: string;
}

export interface Interpreter {
  // 484
  lastName: string;
  // 483
  firstName: string;
  // 485
  businessName: string;
  // 487
  streetNumberAndName: string;
  // Part 7-3b 491
  aptCheckbox: string | undefined;
  steCheckbox: string | undefined;
  flrCheckbox: string | undefined;
  aptSteFlrNumber: string;
  // 486
  city: string;
  // 494
  state: string;
  // 493
  zipCode: string;
  // 496
  province: string;
  // 492
  postalCode: string;
  // 495
  country: string;
  // 503
  daytimeTelephoneNumber: string;
  // 505
  mobileTelephoneNumber: string;
  // 504
  emailAddress: string;
  // 497
  fluentInEnglish: string;
}

export interface FamilyBasedProfile {
  relationship: Relationship;
  petitioner: Petitioner;
  beneficiary: Beneficiary;
  beneficiaryEligibility: Eligibility;
  previousPetition: PreviousPetition;
  petitionerStatement: PetitionerStatement;
  interpreter: Interpreter;
}
