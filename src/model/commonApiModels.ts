import { Declaration } from "typescript";
import {
  Applicant,
  ApplicationDetails,
  AsylumCaseProfile,
  Background,
  Family,
  Progress,
  SupplementDocument,
  YourSignature,
} from "./apiModels";
import {
  Beneficiary,
  Biographic,
  Eligibility,
  FamilyBasedProfile,
  Interpreter,
  Petitioner,
  PetitionerStatement,
  PreviousPetition,
  Relationship,
} from "./familyBasedApiModels";

export type CaseProfile = AsylumCaseProfile | FamilyBasedProfile;

export interface GetCaseProfileResponse {
  profile: CaseProfile;
  progress: Progress;
}

export interface CaseProfileOptional {
  /** Asylum */
  applyForWithholdingYesCheckbox?: string;
  applicant?: Applicant;
  family?: Family;
  background?: Background;
  applicationDetails?: ApplicationDetails;
  signature?: YourSignature;
  declaration?: Declaration;
  supplementDocument?: SupplementDocument;
  overwriteEntryRecords?: boolean;
  overwriteChildren?: boolean;
  overwriteSiblings?: boolean;
  overwriteAddressHistoriesBeforeUS?: boolean;
  overwriteUsAddressHistoriesPast5Years?: boolean;
  overwrite?: boolean; // Overwrite a specific field like documentId array

  /** Family Based */
  relationship?: Relationship;
  petitioner?: Petitioner;
  biographic?: Biographic;
  beneficiary?: Beneficiary;
  beneficiaryEligibility?: Eligibility;
  previousPetition?: PreviousPetition;
  petitionerStatement?: PetitionerStatement;
  interpreter?: Interpreter;
}
