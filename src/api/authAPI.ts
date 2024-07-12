import { Role } from "../consts/consts";
import { UserInfo } from "../model/apiModels";
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

export async function getUserInfoApi(email: string, accessToken: string, role: Role): Promise<UserInfo> {
  if (role !== "APPLICANT" && role !== "LAWYER") {
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
