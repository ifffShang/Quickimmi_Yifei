import { performApiRequest } from "./apiConfig";

export async function createUserApi(email: string): Promise<string> {
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
  return userId?.toString() || "";
}

export async function getUserInfoApi(email: string): Promise<string> {
  const userInfo = await performApiRequest(
    `api/user/getByUsername?username=${email}`,
    "GET",
    null,
    "",
    false,
  );
  return userInfo?.userId?.toString() || "";
}
