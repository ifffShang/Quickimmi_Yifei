import { UserInfo } from "../model/apiModels";
import { performApiRequest } from "./apiConfig";

export async function createUserApi(
  email: string,
  accessToken: string,
  role?: string,
): Promise<number> {
  const userId = await performApiRequest(
    "api/user/create",
    "POST",
    {
      cognitoUsername: email,
      username: email,
      email,
      role, // Add the role to API request
    },
    accessToken,
    false,
    role,
  );
  return userId || 0;
}

export async function getUserInfoApi(
  email: string,
  accessToken: string,
  role?: string,
): Promise<UserInfo> {
  if (role !== "APPLICANT" && role !== "LAWYER") {
    throw new Error(`Invalid role ${role}`);
  }
  const userInfo = await performApiRequest(
    `api/user/getByUsername?username=${email}`,
    "GET",
    null,
    accessToken,
    false,
    role,
  );
  return userInfo?.data;
}
