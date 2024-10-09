export interface HouseholdSize {
  // Persons you are sponsoring in this affidavit
  // 227 - Provide the number you entered in Part 3., Item Number 29.
  part3Item29: string; // todo HOW?

  // Persons NOT sponsored in this affidavit
  // 228 - Yourself
  yourself: string;

  // 229 - If you are currently married, enter "1" for your spouse
  spouse: string;

  // 230 - If you have dependent children, enter the number here
  dependentChildren: string;

  // 231 - If you have any other dependents, enter the number here
  otherDependents: string;

  // 232 - If you have sponsored any other persons on Form I-864 or I-864EZ who are now lawful
  // permanent residents
  sponsoredOtherPersons: string;

  // 233 - OPTIONAL: If you have siblings, parents, or adult children with the same principal
  // residence
  optionalSiblingsParentsAdultChildren: string;

  // 234 - Add together Part 5., Item Numbers 1. - 7. and enter the number here (Household Size)
  householdSize: string;
}
