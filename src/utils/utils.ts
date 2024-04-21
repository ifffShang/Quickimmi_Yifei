import {
  AsylumCaseProfile,
  FieldKey,
  ParentFieldKey,
} from "../model/ApiModals";
import { ScreenSize } from "../model/Models";
import { updateApplicant } from "../reducers/formSlice";
import { PATH } from "../router/MainView";

export const handleResize = (
  dispatch?: React.Dispatch<any>,
  callback?: any,
) => {
  const width = window.innerWidth;
  if (width < ScreenSize.xsmall) {
    callback && dispatch && dispatch(callback(ScreenSize.xsmall));
    return ScreenSize.xsmall;
  } else if (width < ScreenSize.small) {
    callback && dispatch && dispatch(callback(ScreenSize.small));
    return ScreenSize.small;
  } else if (width < ScreenSize.medium) {
    callback && dispatch && dispatch(callback(ScreenSize.medium));
    return ScreenSize.medium;
  } else {
    callback && dispatch && dispatch(callback(ScreenSize.large));
    return ScreenSize.large;
  }
};

export const equalsIgnoreCase = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase();
};

export const isAuthPath = (path: string) => {
  return (
    equalsIgnoreCase(path, PATH.SignIn) ||
    equalsIgnoreCase(path, PATH.SignUp) ||
    equalsIgnoreCase(path, PATH.ForgotPassword) ||
    equalsIgnoreCase(path, PATH.ConfirmCode)
  );
};

export const showFormNavigation = () => {
  return window.location.pathname === PATH.NewCase;
};

export const getCaseId = (caseId: number) => {
  const encodedCaseId = encodeId(80000000 + caseId);
  return "#I" + encodedCaseId;
};

export function encodeId(id: number) {
  // Convert the id to a base36 string
  return id.toString(36);
}

export function decodeId(encodedId: string) {
  // Convert the base36 string back to an integer
  return parseInt(encodedId, 36);
}

export function getFieldValue(
  caseDetails: AsylumCaseProfile,
  parentKey: ParentFieldKey,
  key: FieldKey,
) {
  if (!caseDetails) {
    console.info("Case profile is missing");
    return;
  }
  const parentValues = caseDetails[parentKey];
  if (!parentValues) {
    console.error(`Values of parent key ${parentKey} are missing`);
    return;
  }
  return caseDetails[parentKey][key];
}

export function dispatchFormValue(
  dispatch: React.Dispatch<any>,
  parentKey: ParentFieldKey,
  key: FieldKey,
  value: any,
) {
  if (parentKey === "applicant") {
    dispatch(
      updateApplicant({
        [key]: value,
      }),
    );
  }
}
