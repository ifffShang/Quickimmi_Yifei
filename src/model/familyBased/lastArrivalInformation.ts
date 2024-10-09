export interface LastArrivalInformation {
  // Part 4-45
  beneficiaryEverInUSYesCheckbox: string | undefined;
  beneficiaryEverInUSNoCheckbox: string | undefined;
  // 397 ---> H1B etc. Visitor
  arrivedAsAdmission: string;

  // check 485 table question 25
  admittedAtPortOfEntryCheckbox: string | undefined;
  // temporary worker
  admissionEntryDetail: string;
  paroledAtPortOfEntryCheckbox: string | undefined;
  paroleEntranceDetail: string;
  enteredWithoutAdmissionCheckbox: string | undefined;
  otherEntryMethodCheckbox: string | undefined;
  otherEntryDetail: string;

  // 398
  i94Number: string;

  i94Status: string;

  // 399
  dateOfArrival: string;
  // 396
  authorizedStayExpirationDate: string;
  // 400
  passportNumber: string;
  // 401
  travelDocumentNumber: string;
  // 402
  passportIssueCountry: string;
  // 403
  expirationDateForPassport: string;

  visaNumber: string;
  arrivalCity: string;
  arrivalState: string;

  // Page3-Question27: Current immigration status if has changed since you arrived
  currentImmigrationStatus: string;
}
