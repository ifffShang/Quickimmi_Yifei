import { Role } from "../consts/consts";

export const baseUrl = process.env.REACT_APP_BACKENDAPI ?? "https://devapi.quickimmi.ai";

export const fetchFunction = async (
  endPoint: string,
  method: string,
  data: any,
  additionalHeaders: any,
  baseUrl: string,
) => {
  const url = baseUrl ? `${baseUrl}/${endPoint}` : `/${endPoint}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...additionalHeaders,
  };

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: data,
    });

    // Check if the response status is OK
    if (!response.ok) {
      if (response.headers.get("content-type")?.includes("application/json") && response.status !== 204) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.errorCode || errorData?.message || `HTTP Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    }
    // Ensure the response is in JSON format before parsing
    if (response.headers.get("content-type")?.includes("application/json")) {
      return await response.json();
    } else {
      return response.text();
    }
  } catch (error: any) {
    console.error(`Error fetching data from ${endPoint}:`, error.message);
    throw error; // Re-throwing the error for the caller to handle if needed
  }
};

export interface ApiRequestModel {
  endPoint: string;
  method: string;
  data: any;
  accessToken: string;
  self?: boolean; // Self is true if we want to request data from the frontend server itself
  role?: Role;
  caseId?: number;
}

export const performApiRequest = async ({
  endPoint,
  method,
  data,
  accessToken,
  self,
  role,
  caseId,
}: ApiRequestModel) => {
  const additionalHeaders: any = { Authorization: `Bearer ${accessToken}` };
  const body = data ? JSON.stringify(data) : null;

  if (!self && !role) {
    throw new Error("Role is required for API calls made by the user");
  }

  if (!self) {
    additionalHeaders.Role = role;
  }

  if (caseId) {
    additionalHeaders["Case-Id"] = caseId;
  }

  try {
    return await fetchFunction(endPoint, method, body, additionalHeaders, self ? "" : baseUrl);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
