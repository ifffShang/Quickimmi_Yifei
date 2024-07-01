import { updateApplicationCaseApi } from "../api/caseAPI";
import { Role } from "../consts/consts";
import { AsylumCaseProfile, Percentage, Progress } from "../model/apiModels";
import { getProgressWithPercentage } from "./percentageUtils";

export function updateApplicationCaseFunc(
  caseId: number,
  profile: AsylumCaseProfile,
  progress: Progress,
  percentage: Percentage,
  role: Role,
  accessToken?: string,
) {
  try {
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    const progressWithPercentage = getProgressWithPercentage(
      progress,
      percentage,
    );

    updateApplicationCaseApi(
      { id: caseId, profile, progress: progressWithPercentage },
      accessToken,
      role,
    );
  } catch (error) {
    console.error("Error updating application case: ", error);
    throw error;
  }
}
