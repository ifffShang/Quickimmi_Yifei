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
