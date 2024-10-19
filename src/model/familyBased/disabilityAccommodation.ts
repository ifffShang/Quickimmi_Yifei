export interface DisabilityAccommodation {
  // Page 16, Question 1 - Requesting Accommodation
  requestingAccommodationYesCheckbox: string | undefined;
  requestingAccommodationNoCheckbox: string | undefined;

  // Page 16, Question 2a - Deaf or Hard of Hearing Accommodation
  deafOrHardOfHearingYesCheckbox: string | undefined;
  deafOrHardOfHearingAccommodationDetails: string;

  // Page 16, Question 2b - Blind or Low Vision Accommodation
  blindOrLowVisionYesCheckbox: string | undefined;
  blindOrLowVisionAccommodationDetails: string;

  // Page 16, Question 2c - Other Disability or Impairment Accommodation
  otherDisabilityOrImpairmentYesCheckbox: string | undefined;
  otherDisabilityOrImpairmentAccommodationDetails: string;
}
