import { UserInfo } from "../model/apiModels";
import { performApiRequest } from "./apiConfig";

export async function createUserApi(
  email: string,
  accessToken: string,
  // Include a default role of "customer"
  role: string = "customer",
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
  );
  return userId || 0;
}

export async function getUserInfoApi(
  email: string,
  accessToken: string,
  // Include a default role of "customer"
  role: string = "customer",
): Promise<UserInfo> {
  const userInfo = await performApiRequest(
    `api/user/getByUsername?username=${email}&role${role}`,
    "GET",
    null,
    accessToken,
    false,
  );
  return userInfo?.data;
}
