export interface Address {
  inCareOf: string;
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
