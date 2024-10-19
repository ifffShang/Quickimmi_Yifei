export interface IncomeFromOtherHouseholdMember {
  name: string;
  relationship: string;
  currentIncome: string;
}

export interface EmploymentAndIncome {
  // 1 - Employed as a/an (Checkbox)
  employedAsCheckbox: string | undefined;
  // 236 - Employed as a/an (Occupation)
  employedOccupation: string;

  // 2 - Name of Employer 1
  // 235 - Name of Employer 1
  employer1Name: string;

  // 3 - Name of Employer 2 (if applicable)
  // 237 - Name of Employer 2
  employer2Name: string;

  // 4 - Self-Employed as a/an (Checkbox)
  selfEmployedCheckbox: string | undefined;

  // 238 - Self-employed occupation
  selfEmployedOccupation: string;

  // 5 - Retired Since (mm/dd/yyyy) (Checkbox)
  retiredCheckbox: string | undefined;
  retiredSince: string;

  // 6 - Unemployed Since (mm/dd/yyyy) (Checkbox)
  unemployedCheckbox: string | undefined;
  unemployedSince: string;

  // 7 - My current individual annual income
  // 240 - Current annual income
  individualAnnualIncome: string;

  // Income from other household members
  // 239 - 240
  incomeFromOtherHouseholdMember: IncomeFromOtherHouseholdMember[];

  // 20. My Current Annual Household Income
  // 277 - Total annual household income
  totalAnnualHouseholdIncome: string;

  // 21. People listed in Item Numbers 8, 11, 14, and 17 have completed Form I-864A (Checkbox)
  peopleCompletedFormI864ACheckbox: string | undefined;

  // 259 22. One or more people listed in Item Numbers 8, 11, 14, and 17 are the intending
  // immigrant (Checkbox)
  intendingImmigrantCheckbox: string | undefined;
  // 258 - Name of person listed
  intendingImmigrantName: string;

  // Federal Income Tax Return Information
  // 23.a - Have you filed a federal income tax return for each of the three most recent tax
  // years? (Yes/No Checkbox)
  filedFederalTaxReturnYesCheckbox: string | undefined;
  filedFederalTaxReturnNoCheckbox: string | undefined;

  // 260 23.b - Attached photocopies or transcripts of tax returns for second and third most
  // recent years (Checkbox)
  attachedTaxReturnsCheckbox: string | undefined;

  // Tax Year Information
  // 24.a - Most Recent Tax Year
  // 263 - Most recent tax year
  mostRecentTaxYear: string;

  // 268 - Most recent tax year income
  mostRecentTaxYearIncome: string;

  // 24.b - 2nd Most Recent Tax Year
  // 267 - Second most recent tax year
  secondMostRecentTaxYear: string;

  // 266 - Second most recent tax year income
  secondMostRecentTaxYearIncome: string;

  // 24.c - 3rd Most Recent Tax Year
  // 264 - Third most recent tax year
  thirdMostRecentTaxYear: string;

  // 265 - Third most recent tax year income
  thirdMostRecentTaxYearIncome: string;

  // 25 - I was not required to file a Federal income tax return (Checkbox)
  notRequiredToFileTaxReturnCheckbox: string | undefined;
}
