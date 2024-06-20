export const baseUrl = "https://devapi.quickimmi.ai";

export const fetchFunction = async (
  endPoint: string,
  method: string,
  data: any,
  additionalHeaders: any,
  baseUrl: string,
  role: string,
) => {
  const url = baseUrl ? `${baseUrl}/${endPoint}` : `/${endPoint}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Role: role,
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
      if (
        response.headers.get("content-type")?.includes("application/json") &&
        response.status !== 204
      ) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.errorCode ||
          errorData?.message ||
          `HTTP Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`,
        );
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

export const performApiRequest = async (
  endPoint: string,
  method: string,
  data: any,
  accessToken: string,
  self = false,
  role = "APPLICANT",
) => {
  const additionalHeaders = { Authorization: `Bearer ${accessToken}` };
  const body = data ? JSON.stringify(data) : null;

  try {
    return await fetchFunction(
      endPoint,
      method,
      body,
      additionalHeaders,
      self ? "" : baseUrl,
      role,
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
