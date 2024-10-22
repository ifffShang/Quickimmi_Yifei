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
    } else if (caseType === CaseType.FamilyBased) {
      return await createNewFamilyBasedCaseByLawyerApi(accessToken, role, base, caseSubType);
    } else if (caseType === CaseType.EmploymentBased) {
      return await createNewEmploymentBasedCaseByLawyerApi(accessToken, role, base, caseSubType);
    } else if (caseType === CaseType.NonImmigrantVisas) {
      return await createNewNonImmigrantVisasCaseByLawyerApi(accessToken, role, base, caseSubType);
    } else {
      console.error("CaseType not supported.");
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

async function createNewEmploymentBasedCaseByLawyerApi(
  accessToken: string,
  role: Role,
  base: CaseCreationBaseParams,
  employmentBasedType: CaseSubType,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: "api/case/employment-based/createByLawyer",
    method: "POST",
    data: {
      ...base,
      employmentBasedType,
    },
    accessToken,
    role,
  });
  return <string>res.data;
}

async function createNewNonImmigrantVisasCaseByLawyerApi(
  accessToken: string,
  role: Role,
  base: CaseCreationBaseParams,
  nonImmigrantVisasType: CaseSubType,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: "api/case/non-immigrant-visas/createByLawyer",
    method: "POST",
    data: {
      ...base,
      nonImmigrantVisasType,
    },
    accessToken,
    role,
  });
  return <string>res.data;
}
