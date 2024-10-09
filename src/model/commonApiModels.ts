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
import { FamilyBasedProfile } from "./familyBased/familyBasedProfile";
import { Relationship } from "./familyBased/relationship";
import { Petitioner } from "./familyBased/pertitioner";
import { Beneficiary } from "./familyBased/beneficiary";
import { Eligibility } from "./familyBased/eligibility";
import { PreviousPetition } from "./familyBased/previousPetition";
import { PetitionerStatement } from "./familyBased/petitionStatement";
import { Interpreter } from "./familyBased/intepreter";
import { Sponsor } from "./familyBased/sponsor";

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
  beneficiary?: Beneficiary;
  beneficiaryEligibility?: Eligibility;
  previousPetition?: PreviousPetition;
  petitionerStatement?: PetitionerStatement;
  sponsorList?: Sponsor[];
  interpreter?: Interpreter;
}
