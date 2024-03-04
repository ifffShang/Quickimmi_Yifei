import { performApiRequest } from "./apiConfig";
import { encode as base64_encode } from "base-64";

export async function login() {
  performApiRequest("api/auth/login", "POST", null, "");
}

export async function signUp(
  email: string,
  password: string,
  phoneNumber: string,
) {
  const encodedPassword = base64_encode(password);
  const data = { email, password: encodedPassword, phoneNumber };
  return await performApiRequest("api/auth/signup", "POST", data, "");
}
