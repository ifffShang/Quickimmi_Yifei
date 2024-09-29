import { AsylumCaseProfile, Progress } from "./apiModels";
import { FamilyBasedProfile } from "./familyBasedApiModels";

export type CaseProfile = AsylumCaseProfile | FamilyBasedProfile;

export interface GetCaseProfileResponse {
  profile: CaseProfile;
  progress: Progress;
}
