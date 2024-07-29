import { UploadFile, message } from "antd";
import { getDocumentByIdApi, updateApplicationCaseApi } from "../api/caseAPI";
import { Role } from "../consts/consts";
import { AsylumCaseProfile, GeneratedDocument, Percentage, Progress, UploadedDocument } from "../model/apiModels";
import { DocumentGenerationTaskStatus } from "../model/apiReqResModels";
import { updateGeneratedDocuments } from "../reducers/formSlice";
import { getProgressWithPercentage } from "./percentageUtils";

// !!!! This function should only be used by the form save !!!!
export const updateApplicationCaseFunc = async (
  caseId: number,
  profile: AsylumCaseProfile,
  progress: Progress,
  percentage: Percentage,
  role: Role,
  accessToken?: string,
) => {
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
};

export const handleFileDownload = async (file: UploadFile, accessToken: string, role: Role) => {
  if (!accessToken) {
    message.error("Access token is missing! Please login again.");
    return;
  }
  try {
    const docWithPresignedUrl = await getDocumentByIdApi(accessToken, parseInt(file.uid), role);
    const response = await fetch(docWithPresignedUrl.presignUrl);
    if (!response.ok) {
      message.error("Failed to download document.");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = window.document.createElement("a"); // Use window.document
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    message.error("Error downloading document");
    console.error(error);
  }
};

export const handleFileDownloadHasPresigedUrl = async (file: UploadFile, accessToken: string, role: Role) => {
  if (!accessToken || !file.url) {
    message.error("Access token or file url is missing!");
    return;
  }
  try {
    const response = await fetch(file.url);
    if (!response.ok) {
      message.error("Failed to download document.");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = window.document.createElement("a"); // Use window.document
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    message.error("Error downloading document");
    console.error(error);
  }
};
