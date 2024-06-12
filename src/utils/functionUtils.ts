import { updateApplicationCaseApi } from "../api/caseAPI";
import { ApplicationCase } from "../model/apiModels";
import { getUpdateApplicationCaseData } from "./utils";

export function updateApplicationCaseFunc(
  applicationCase: ApplicationCase,
  accessToken?: string,
) {
  if (!accessToken) {
    console.error("Access token is missing");
    return;
  }
  updateApplicationCaseApi(
    getUpdateApplicationCaseData(applicationCase),
    accessToken,
  );
}
