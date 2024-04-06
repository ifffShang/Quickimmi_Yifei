export const baseUrl = "https://dev.api.quickimmi.ai";

export const fetchFunction = async (
  endPoint: string,
  method: string,
  data: any,
  additionalHeaders: any,
) => {
  const url = `${baseUrl}/${endPoint}`;
  const headers = {
    accept: "application/json",
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
      const errorData = await response.json();
      const errorMessage =
        errorData?.message ||
        errorData?.errorCode ||
        `HTTP Error: ${response.status}`;
      throw new Error(errorMessage);
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
) => {
  const additionalHeaders = { Authorization: `Bearer ${accessToken}` };
  const body = data ? JSON.stringify(data) : null;

  try {
    const response = await fetchFunction(
      endPoint,
      method,
      body,
      additionalHeaders,
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
