import { Beneficiary } from "./beneficiary";
import { Eligibility } from "./eligibility";
import { Interpreter } from "./intepreter";
import { Petitioner } from "./pertitioner";
import { PetitionerStatement } from "./petitionStatement";
import { PreviousPetition } from "./previousPetition";
import { Relationship } from "./relationship";
import { Sponsor } from "./sponsor";

export interface FamilyBasedProfile {
  relationship: Relationship;
  petitioner: Petitioner;
  beneficiary: Beneficiary;
  beneficiaryEligibility: Eligibility;
  previousPetition: PreviousPetition;
  petitionerStatement: PetitionerStatement;
  sponsorList: Sponsor[];
  interpreter: Interpreter;
}
