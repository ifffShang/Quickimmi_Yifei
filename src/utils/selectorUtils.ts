import { ApplicationCase } from "../model/apiModels";
import { CaseProfile } from "../model/commonApiModels";
import { CaseType } from "../model/immigrationTypes";

export function getProfile(caseType: CaseType | null, applicationCase: ApplicationCase): CaseProfile | null {
  if (!caseType) {
    return null;
  }
  if (caseType === CaseType.Asylum) {
    return applicationCase.asylumProfile;
  }
  if (caseType === CaseType.FamilyBased) {
    return applicationCase.familyBasedProfile;
  }

  console.error("Unexpected case type");
  return null;
}
