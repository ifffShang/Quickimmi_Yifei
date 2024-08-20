import { Role } from "../consts/consts";
import { UserInfo, LawyerInfo } from "../model/apiModels";
import { performApiRequest } from "./apiConfig";

export async function createUserApi(email: string, accessToken: string, role: Role): Promise<number> {
  const userId = await performApiRequest({
    endPoint: "api/user/create",
    method: "POST",
    data: {
      cognitoUsername: email,
      username: email,
      email,
    },
    accessToken,
    role,
  });
  return userId || 0;
}

export async function createNewLawyerApi(
  cognitoId: string,
  email: string,
  accessToken: string,
  role: Role,
): Promise<number> {
  const userId = await performApiRequest({
    endPoint: "api/lawyer/create",
    method: "POST",
    data: {
      email: email,
      cognitoId: cognitoId,
      phoneNumber: "",
    },
    accessToken,
    role,
  });
  return userId || 0;
}

export async function getUserInfoApi(email: string, accessToken: string, role: Role): Promise<UserInfo> {
  if (role !== "APPLICANT") {
    throw new Error(`Invalid role ${role}`);
  }
  const userInfo = await performApiRequest({
    endPoint: `api/user/getByUsername?username=${email}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return userInfo?.data;
}

export async function getLawyerInfoApi(email: string, accessToken: string, role: Role): Promise<LawyerInfo> {
  if (role !== "LAWYER") {
    throw new Error(`Invalid role ${role}`);
  }
  const lawyerInfo = await performApiRequest({
    endPoint: `api/lawyer/getLawyerByUsername?username=${email}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return lawyerInfo?.data;
}
