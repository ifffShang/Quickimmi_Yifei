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
