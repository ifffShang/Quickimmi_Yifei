export interface MaritalInfo {
  // Page 7, Question 1 - Marital Status
  maritalStatusSingleCheckbox: string | undefined;
  maritalStatusMarriedCheckbox: string | undefined;
  maritalStatusDivorcedCheckbox: string | undefined;
  maritalStatusWidowedCheckbox: string | undefined;
  maritalStatusAnnulledCheckbox: string | undefined;
  maritalStatusSeparatedCheckbox: string | undefined;

  // Page 7, Question 2 - Spouse Military Status
  spouseMilitaryStatusNACheckbox: string | undefined;
  spouseMilitaryStatusYesCheckbox: string | undefined;
  spouseMilitaryStatusNoCheckbox: string | undefined;

  // Page 7, Question 3 - Number of Marriages
  numberOfMarriages: string;
  currentSpouse: CurrentSpouseInfo;
  previousSpouseInfos: PreviousSpouseInfo[];
}

export interface CurrentSpouseInfo {
  // Page 7, Questions 4a, 4b, 4c - Current Spouse Names
  lastName: string;
  firstName: string;
  middleName: string;

  // Page 7, Question 5 - Current Spouse A-Number
  alienNumber: string;

  // Page 7, Question 6 - Current Spouse Date of Birth
  dateOfBirth: string;

  // Page 7, Question 7 - Date of Marriage to Current Spouse
  dateOfMarriage: string;

  // Page 7, Questions 8a, 8b, 8c - Current Spouse Place of Birth
  cityOfBirth: string;
  stateOfBirth: string;
  countryOfBirth: string;

  // Page 7, Questions 9a, 9b, 9c - Place of Marriage
  placeOfMarriageCity: string;
  placeOfMarriageState: string;
  placeOfMarriageCountry: string;

  // Page 7, Question 10 - Is Current Spouse Applying
  currentSpouseApplyingNoCheckbox: string | undefined;
  currentSpouseApplyingYesCheckbox: string | undefined;
}

export interface PreviousSpouseInfo {
  // Page 8, Questions 11a, 11b, 11c - Prior Spouse Name
  lastName: string;
  firstName: string;
  middleName: string;

  // Page 8, Question 12 - Prior Spouse Date of Birth
  dateOfBirth: string;

  // Page 8, Question 13 - Date of Marriage to Prior Spouse
  dateOfMarriage: string;

  // Page 8, Questions 14a, 14b, 14c - Place of Marriage to Prior Spouse
  placeOfMarriageCity: string;
  placeOfMarriageState: string;
  placeOfMarriageCountry: string;

  // Page 8, Question 15 - Date Marriage Legally Ended
  dateMarriageLegallyEnded: string;

  // Page 8, Questions 16a, 16b, 16c - Place Marriage Legally Ended
  placeMarriageLegallyEndedCity: string;
  placeMarriageLegallyEndedState: string;
  placeMarriageLegallyEndedCountry: string;
}
