export interface Relationship {
  // Part 1-1
  petitionForSpouseCheckbox: string | undefined;
  // Part 1-2
  petitionForParentCheckbox: string | undefined;
  // Part 1-3
  petitionForSiblingCheckbox: string | undefined;
  // Part 1-4
  petitionForChildCheckbox: string | undefined;

  // Part 1-Q2-1
  petitionForChildBornInWedlockCheckbox: string | undefined;
  // Part 1-Q2-2
  petitionForStepchildAndStepparentCheckbox: string | undefined;
  // Part 1-Q2-3
  petitionForChildNotBornInWedlockCheckbox: string | undefined;
  // Part 1-Q2-4
  petitionForChildAdoptedCheckbox: string | undefined;

  // Part 1-Q3
  siblingAdoptionRelationYesCheckbox: string | undefined;
  siblingAdoptionRelationNoCheckbox: string | undefined;

  // Part 1-Q4
  gainedStatusThroughAdoptionYesCheckbox: string | undefined;
  gainedStatusThroughAdoptionNoCheckbox: string | undefined;
}
