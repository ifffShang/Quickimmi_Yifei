import { updateApplicationCaseApi } from "../api/caseAPI";
import { Role } from "../consts/consts";
import { AsylumCaseProfile, GeneratedDocument, Percentage, Progress } from "../model/apiModels";
import { DocumentGenerationTaskStatus } from "../model/apiReqResModels";
import { updateGeneratedDocuments } from "../reducers/formSlice";
import { getProgressWithPercentage } from "./percentageUtils";

// !!!! This function should only be used by the form save !!!!
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

    const progressWithPercentage = getProgressWithPercentage(progress, percentage);
    console.log();

    const currentStep = [...progress.steps].reverse().find(step => step.status === "IN_PROGRESS");

    updateApplicationCaseApi(
      {
        id: caseId,
        profile,
        progress: progressWithPercentage,
        currentStep: currentStep ? currentStep.name : "FILLING_APPLICATION",
      },
      accessToken,
      role,
    );
  } catch (error) {
    console.error("Error updating application case: ", error);
    throw error;
  }
}

export function updateGeneratedDocumentStatus(
  taskList: DocumentGenerationTaskStatus[],
  userId: number,
  caseId: number,
  dispatch: React.Dispatch<any>,
) {
  const generartedDocumentList = taskList.map((task, index) => {
    return {
      id: task.id,
      name: task.formName,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      presignUrl: task.presignedUrl,
      userId: userId,
      caseId: caseId,
      identify: "Applicant",
      type: "",
      createdBy: "Applicant",
    } as GeneratedDocument;
  });
  dispatch(updateGeneratedDocuments(generartedDocumentList));
}
