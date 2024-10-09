export interface Parent {
  // Fields for basic identity and birth names
  lastName: string; // Mother: P6Q1a, Father: P7Q9a
  firstName: string; // Mother: P6Q1b, Father: P7Q9b
  middleName: string; // Mother: P6Q1c, Father: P7Q9c

  birthLastName: string; // Mother: P6Q2a, Father: P7Q10a
  birthFirstName: string; // Mother: P6Q2b, Father: P7Q10b
  birthMiddleName: string; // Mother: P6Q2c, Father: P7Q10c

  // Date and place of birth
  dateOfBirth: string; // Mother: P6Q3, Father: P7Q11
  cityOfBirth: string; // Mother: P6Q5, Father: P7Q13
  countryOfBirth: string; // Mother: P6Q6, Father: P7Q14

  // Current place of residence
  currentCityOfResidence: string; // Mother: P7Q7, Father: P7Q15
  currentCountryOfResidence: string; // Mother: P7Q8, Father: P7Q16

  // Sex/Gender indicators
  femaleCheckbox: string | undefined; // Mother: P6Q4, Father: P7Q12
  maleCheckbox: string | undefined; // Mother: P6Q4, Father: P7Q12
}
