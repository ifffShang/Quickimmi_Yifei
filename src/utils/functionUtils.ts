import { updateApplicationCaseApi } from "../api/caseAPI";
import { Role } from "../consts/consts";
import { ApplicationCase, Percentage } from "../model/apiModels";
import { getUpdateApplicationCaseData } from "./utils";

export function updateApplicationCaseFunc(
  applicationCase: ApplicationCase,
  percentage: Percentage,
  role: Role,
  accessToken?: string,
) {
  try {
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    if (!applicationCase.progress) {
      console.error("Progress is missing");
      return;
    }

    const applicationCaseForUpdate = {
      ...applicationCase,
      progress: {
        ...applicationCase.progress,
        steps: applicationCase.progress.steps.map(step => {
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
      },
    };

    updateApplicationCaseApi(
      getUpdateApplicationCaseData(applicationCaseForUpdate),
      accessToken,
      role,
    );
  } catch (error) {
    console.error("Error updating application case: ", error);
    throw error;
  }
}
