export interface SponsorContract {
  // Sponsor's Statement
  // 283 1.a - I can read and understand English (Checkbox)
  canReadUnderstandEnglishCheckbox: string | undefined;

  // 290 1.b - The interpreter named in Part 9 read every question and my answer (Checkbox)
  interpreterHelpedCheckbox: string | undefined;

  // 284 - Language in which I am fluent
  fluentLanguage: string;

  // Preparer information
  // 285 2 - At my request, the preparer named in Part 10 prepared this affidavit (Checkbox)
  preparerCheckbox: string | undefined;

  // 286 - Information provided by sponsor for affidavit
  preparerInformationProvided: string;

  // Sponsor's Contact Information
  // 287 - Sponsor's Daytime Telephone Number
  // 288 - Sponsor's Mobile Telephone Number (if any)
  // 289 - Sponsor's Email Address (if any)
  daytimeTelephoneNumber: string;

  // Mobile Telephone Number (if any)
  mobileTelephoneNumber: string;

  //  Email Address (if any)
  emailAddress: string;

  // Sponsor's Signature
  // 306 - Sponsor's Signature
  sponsorSignature: string;

  // 305 - Date of Signature (mm/dd/yyyy)
  dateOfSignature: string;
}
