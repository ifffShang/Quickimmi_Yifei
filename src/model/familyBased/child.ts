export interface Child {
  pageNumber: string;
  partNumber: string;
  itemNumber: string;

  // Page 8-9, Question 2, 7, 12 - Child's Name
  lastName: string;
  firstName: string;
  middleName: string;

  // Page 8-9, Question 3, 8, 13 - Child's A-Number
  alienNumber: string;

  // Page 8-9, Question 4-5, 9-10, 14-15 - Child's Date of Birth
  dateOfBirth: string;
  countryOfBirth: string;

  // Page 8-9, Question 6, 11, 16 - Is Child Applying
  applyingYesCheckbox: boolean;
  applyingNoCheckbox: boolean;
}
