import { Role } from "../consts/consts";
import { AsylumType, CaseType, FamilyBasedType } from "../model/immigrationTypes";
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
  caseSubType: AsylumType | FamilyBasedType | undefined,
): Promise<string> {
  try {
    const base = {
      lawyerId,
      caseType,
      caseName,
      applicantName,
      providedCustomerEmail,
    };

    if (caseType === CaseType.Asylum && Object.values(AsylumType).includes(caseSubType as AsylumType)) {
      return await createNewAsylumCaseByLawyerApi(accessToken, role, base, caseSubType as AsylumType);
    }

    if (caseType === CaseType.FamilyBased && Object.values(FamilyBasedType).includes(caseSubType as FamilyBasedType)) {
      return await createNewFamilyBasedCaseByLawyerApi(accessToken, role, base, caseSubType as FamilyBasedType);
    }
  } catch (error) {
    console.error("Failed to create new case for lawyer:", error);
  }
  return "";
}

export interface CaseCreationBaseParams {
  lawyerId: number;
  caseType: CaseType;
  caseName: string;
  applicantName: string;
  providedCustomerEmail: string;
}

export async function createNewAsylumCaseByLawyerApi(
  accessToken: string,
  role: Role,
  base: CaseCreationBaseParams,
  asylumType: AsylumType,
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

export async function createNewFamilyBasedCaseByLawyerApi(
  accessToken: string,
  role: Role,
  base: CaseCreationBaseParams,
  familyBasedType: FamilyBasedType,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: "api/case/familyBased/createByLawyer",
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
