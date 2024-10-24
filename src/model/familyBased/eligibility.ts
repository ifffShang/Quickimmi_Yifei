import { Benefit } from "./benefit";
import { Institutionalization } from "./institutionalization";
import { Organization } from "./organization";

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
