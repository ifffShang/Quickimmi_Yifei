import { updateApplicationCaseApi } from "../api/caseAPI";
import { Role } from "../consts/consts";
import { AsylumCaseProfile, Percentage, Progress } from "../model/apiModels";

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

    const progressWithPercentage = {
      ...progress,
      steps: progress.steps.map(step => {
        if (step.name === "FILLING_APPLICATION") {
          return {
            ...step,
            status: "IN_PROGRESS",
            substeps: step.substeps.map(substep => {
              if (substep.name === "FILLING_DETAILS") {
                return {
                  ...substep,
                  metadata: JSON.stringify({
                    percentage: percentage,
                  }),
                  status: "IN_PROGRESS",
                };
              }
              return substep;
            }),
          };
        }
        return step;
      }),
    };

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
