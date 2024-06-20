//export const baseUrl = "https://192.168.0.13:8080";
export const baseUrl = "https://devapi.quickimmi.ai";

export const fetchFunction = async (
  endPoint: string,
  method: string,
  data: any,
  additionalHeaders: any,
  role: string,
  baseUrl?: string,
) => {
  const url = baseUrl ? `${baseUrl}/${endPoint}` : `/${endPoint}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    role: role,
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
          `HTTP Error: ${response.status}`;
        throw new Error(errorMessage);
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    }
    return response;
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
    const response = await fetchFunction(
      endPoint,
      method,
      body,
      additionalHeaders,
      self ? "" : baseUrl,
      role,
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error(`API Request Failed:`, {
        endPoint,
        method,
        status: response.status,
        statusText: response.statusText,
        responseData,
      });
      throw new Error(
        responseData.errorCode ||
          responseData.message ||
          "Failed to perform API request",
      );
    }
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
