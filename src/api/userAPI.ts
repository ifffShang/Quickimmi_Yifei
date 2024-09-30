import { Role } from "../consts/consts";
import { UpdateLawyerRequest } from "../model/apiModels";
import { performApiRequest } from "./apiConfig";

export async function updateLawyerInfoApi(
  accessToken: string,
  role: Role,
  data: UpdateLawyerRequest,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: "api/lawyer/update",
    method: "POST",
    data,
    accessToken,
    role,
  });
  return <boolean>res.data;
}
