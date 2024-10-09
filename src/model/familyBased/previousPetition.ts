import { AdditionalRelative } from "./additionalRelative";

export interface PreviousPetition {
  // part 5-1
  filedPetitionYesCheckbox: string | undefined;
  filedPetitionNoCheckbox: string | undefined;

  // 456
  lastName: string;
  // 457
  firstName: string;
  // 458
  middleName: string;
  // 461
  city: string;
  // 462
  state: string;
  // 460
  date: string;
  // 459
  result: string;

  additionalRelatives: AdditionalRelative[];
}
