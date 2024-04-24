import { UserInfo } from "../model/apiModels";
import { performApiRequest } from "./apiConfig";

export async function createUserApi(email: string): Promise<number> {
  const userId = await performApiRequest(
    "api/user/create",
    "POST",
    {
      cognitoUsername: email,
      username: email,
      email,
    },
    "",
  );
  return userId || 0;
}

export async function getUserInfoApi(
  email: string,
  accessToken: string,
): Promise<UserInfo> {
  const userInfo = await performApiRequest(
    `api/user/getByUsername?username=${email}`,
    "GET",
    null,
    accessToken,
    false,
  );
  return userInfo?.data;
}
