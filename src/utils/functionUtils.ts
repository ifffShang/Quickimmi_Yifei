import { message, UploadFile } from "antd";
import { updateApplicationCaseApi } from "../api/caseProfileUpdateAPI";
import { getDocumentByIdApi } from "../api/documentAPI";
import { Role } from "../consts/consts";
import { Percentage, Progress } from "../model/apiModels";
import { CaseProfile } from "../model/commonApiModels";
import { CaseType } from "../model/immigrationTypes";
import { getProgressWithPercentage } from "./percentageUtils";
import { ObjectUtils } from "./diffUtils";
import { InitialAsylumProfile } from "../consts/caseConsts";
import { InitialFamilyBasedProfile } from "../consts/familyBasedConsts";

// !!!! This function should only be used by the form save !!!!
export const updateApplicationCaseFunc = async (
  caseId: number,
  profile: CaseProfile | null,
  progress: Progress,
  percentage: Percentage,
  role: Role,
  accessToken: string,
  caseType: CaseType,
) => {
  if (!caseId || !accessToken || !caseType || !profile) {
    console.error("Case ID, access token or case type is not available");
    return;
  }

  const asylumDiff = ObjectUtils.diffUpdate(InitialAsylumProfile, profile, true);
  const familyBasedDiff = ObjectUtils.diffUpdate(InitialFamilyBasedProfile, profile, true);
  console.log("Asylum diff is ", asylumDiff);
  console.log("Family based diff is ", familyBasedDiff);

  // Form can only be updated when the case progress is at "Collect Information" or "Review and Sign" step.
  if (!formAllowedToBeEdit(progress)) {
    const errorMsg =
      'Form can only be updated when the case progress is at "Collect Information" or "Review and Sign" step.';
    message.error(errorMsg);
    console.log(errorMsg);
    return;
  }
  try {
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }

    const progressWithPercentage = getProgressWithPercentage(progress, percentage);

    let currentStep = "FILLING_APPLICATION";
    if (percentage?.overall?.avg === 100) {
      currentStep = "REVIEW_AND_SIGN";
    }

    await updateApplicationCaseApi(
      {
        id: caseId,
        profile,
        progress: progressWithPercentage,
        currentStep: currentStep,
      },
      accessToken,
      role,
      caseId,
      caseType,
    );
  } catch (error) {
    console.error("Error updating application case: ", error);
    throw error;
  }
};

export const formAllowedToBeEdit = (progress: Progress): boolean => {
  if (!progress) {
    console.error("Couldn't fetch case progress");
    return false;
  }
  // Define the steps where the form can be edited
  const editableSteps = ["FILLING_APPLICATION", "REVIEW_AND_SIGN"];

  // Check if the current step is one of the editable steps
  return progress.steps.some(
    step => editableSteps.includes(step.name) && (step.status === "IN_PROGRESS" || step.status === "NOT_START"),
  );
};

export const handleFileDownload = async (file: UploadFile, accessToken: string, role: Role, caseId: number) => {
  if (!accessToken) {
    message.error("Access token is missing! Please login again.");
    return;
  }
  try {
    const docWithPresignedUrl = await getDocumentByIdApi(accessToken, parseInt(file.uid), role, caseId);
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
