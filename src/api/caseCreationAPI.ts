import { Role } from "../consts/consts";
import { CaseType, CaseSubType } from "../model/immigrationTypes";
import { performApiRequest } from "./apiConfig";

/**
 * Create new case by lawyer
 * @param accessToken
 * @param lawyerId
 * @param caseName
 * @param applicantName
 * @param providedCustomerEmail
 * @param role
 * @param caseType
 * @param asylumParams
 * @returns CaseId
 */
export async function createNewCaseByLawyerApi(
  accessToken: string,
  lawyerId: number,
  caseName: string,
  applicantName: string,
  providedCustomerEmail: string,
  role: Role,
  caseType: CaseType,
  caseSubType: CaseSubType,
): Promise<string | undefined> {
  try {
    const base = {
      lawyerId,
      caseType,
      caseName,
      applicantName,
      providedCustomerEmail,
    };

    if (caseType === CaseType.Asylum) {
      return await createNewAsylumCaseByLawyerApi(accessToken, role, base, caseSubType);
    }

    if (caseType === CaseType.FamilyBased) {
      return await createNewFamilyBasedCaseByLawyerApi(accessToken, role, base, caseSubType);
    }
  } catch (error) {
    console.error("Failed to create new case for lawyer:", error);
  }
}

export interface CaseCreationBaseParams {
  lawyerId: number;
  caseType: CaseType;
  caseName: string;
  applicantName: string;
  providedCustomerEmail: string;
}

async function createNewAsylumCaseByLawyerApi(
  accessToken: string,
  role: Role,
  base: CaseCreationBaseParams,
  asylumType: CaseSubType,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: "api/case/asylum/createByLawyer",
    method: "POST",
    data: {
      ...base,
      asylumType,
    },
    accessToken,
    role,
  });
  return <string>res.data;
}

async function createNewFamilyBasedCaseByLawyerApi(
  accessToken: string,
  role: Role,
  base: CaseCreationBaseParams,
  familyBasedType: CaseSubType,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: "api/case/family-based/createByLawyer",
    method: "POST",
    data: {
      ...base,
      familyBasedType,
    },
    accessToken,
    role,
  });
  return <string>res.data;
}
