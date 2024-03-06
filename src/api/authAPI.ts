import { performApiRequest } from "./apiConfig";
import { encode as base64_encode } from "base-64";

export async function login(username: string, password: string) {
  const encodedPassword = base64_encode(password);
  const data = { username, password: encodedPassword };
  return await performApiRequest("api/auth/login", "POST", data, "");
}

export async function signUp(email: string, password: string) {
  const encodedPassword = base64_encode(password);
  const data = { email, password: encodedPassword };
  return await performApiRequest("api/auth/signup", "POST", data, "");
}

export async function confirmSignUp(
  username: string,
  verificationCode: string,
) {
  const data = { username, verificationCode };
  return await performApiRequest("api/auth/confirm-signup", "POST", data, "");
}

export async function resendVerificationCode(username: string) {
  const data = { username };
  return await performApiRequest(
    "api/auth/resend-verification-code",
    "POST",
    data,
    "",
  );
}
