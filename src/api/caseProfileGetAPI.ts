import { CacheStore } from "../cache/cache";
import { InitialAsylumProfile } from "../consts/caseConsts";
import { InitialApplicationCase, Role } from "../consts/consts";
import { InitialFamilyBasedProfile } from "../consts/familyBasedConsts";
import { GetCaseProfileResponse } from "../model/commonApiModels";
import { CaseType } from "../model/immigrationTypes";
import { removePropertiesNotDefinedInModel } from "../utils/caseUtils";
import { getProgressWithPercentage } from "../utils/percentageUtils";
import { performApiRequest } from "./apiConfig";

export async function getCaseProfileAndProgressApi(
  caseId: number,
  accessToken: string,
  role: Role,
  caseType: CaseType,
): Promise<GetCaseProfileResponse> {
  if (caseType === CaseType.Asylum) {
    return await getAsylumCaseProfileAndProgressApi(caseId, accessToken, role);
  }
  if (caseType === CaseType.FamilyBased) {
    return await getFamilyBasedCaseProfileAndProgressApi(caseId, accessToken, role);
  }
  throw new Error("Unexpected response type");
}

export async function getAsylumCaseProfileAndProgressApi(
  caseId: number,
  accessToken: string,
  role: Role,
): Promise<GetCaseProfileResponse> {
  const cachedProfile = CacheStore.getProfile(caseId);
  const cachedProgress = CacheStore.getProgress(caseId);
  const cachedPercentage = CacheStore.getPercentage(caseId);
  if (cachedProfile && cachedProgress && cachedPercentage) {
    return {
      profile: cachedProfile,
      progress: getProgressWithPercentage(cachedProgress, cachedPercentage),
    };
  }
  const res = await performApiRequest({
    endPoint: `api/case/asylum/getCaseProfile?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  const responseData = res.data as GetCaseProfileResponse;
  if (!responseData.profile) {
    // For the newly created case, profile is null by default. Initiate the case profile here.
    responseData.profile = InitialAsylumProfile;
  }
  return {
    profile: removePropertiesNotDefinedInModel(InitialAsylumProfile, responseData.profile),
    progress: responseData.progress,
  };
}

export async function getFamilyBasedCaseProfileAndProgressApi(
  caseId: number,
  accessToken: string,
  role: Role,
): Promise<GetCaseProfileResponse> {
  const cachedProfile = CacheStore.getProfile(caseId);
  const cachedProgress = CacheStore.getProgress(caseId);
  const cachedPercentage = CacheStore.getPercentage(caseId);
  if (cachedProfile && cachedProgress && cachedPercentage) {
    return {
      profile: cachedProfile,
      progress: getProgressWithPercentage(cachedProgress, cachedPercentage),
    };
  }
  const res = await performApiRequest({
    endPoint: `api/case/family-based/getCaseProfile?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  const responseData = res.data as GetCaseProfileResponse;
  if (!responseData.profile) {
    // For the newly created case, profile is null by default. Initiate the case profile here.
    responseData.profile = InitialFamilyBasedProfile;
  }
  return {
    profile: removePropertiesNotDefinedInModel(InitialFamilyBasedProfile, responseData.profile),
    progress: responseData.progress,
  };
}
