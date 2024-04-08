import { performApiRequest } from "./apiConfig";

export async function createUser(email: string) {
  return await performApiRequest(
    "api/user/create",
    "POST",
    {
      cognitoUsername: email,
      username: email,
      email,
    },
    "",
  );
}
