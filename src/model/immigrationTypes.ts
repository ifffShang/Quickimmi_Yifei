export enum CaseType {
  Asylum = "Asylum",
  FamilyBased = "FamilyBased",
  EmploymentBased = "EmploymentBased",
  NonImmigrantVisas = "NonImmigrantVisas",
}

export enum CaseSubType {
  // Asylum
  AFFIRMATIVE = "AFFIRMATIVE",
  DEFENSIVE = "DEFENSIVE",
  // FamilyBased
  IMMEDIATE_RELATIVES = "IMMEDIATE_RELATIVES",
  FAMILY_PREFERENCE = "FAMILY_PREFERENCE",
  // EmploymentBased
  EB1 = "EB1",
  EB2 = "EB2",
  EB2_NIW = "EB2_NIW",
  EB3 = "EB3",
  EB5 = "EB5",
  // NonImmigrantVisas
  H1B = "H1B",
  L1 = "L1",
  O1 = "O1",
}

export const EnabledCaseSubTypes = [
  CaseSubType.AFFIRMATIVE,
  CaseSubType.DEFENSIVE,
  CaseSubType.IMMEDIATE_RELATIVES,
  CaseSubType.FAMILY_PREFERENCE,
  CaseSubType.EB1,
  CaseSubType.EB2,
  CaseSubType.EB2_NIW,
  CaseSubType.EB3,
  CaseSubType.O1,
];

export const SupportingApplicationFormCaseSubTypes = [
  CaseSubType.AFFIRMATIVE,
  CaseSubType.DEFENSIVE,
  CaseSubType.IMMEDIATE_RELATIVES,
  CaseSubType.FAMILY_PREFERENCE,
];

export const ImmigrationCategories = [
  {
    Type: {
      text: "Asylum",
      value: CaseType.Asylum,
    },
    SubType: [
      {
        text: "AFFIRMATIVE",
        value: CaseSubType.AFFIRMATIVE,
      },
      {
        text: "DEFENSIVE",
        value: CaseSubType.DEFENSIVE,
      },
    ],
  },
  {
    Type: {
      text: "Family-Based Immigration",
      value: CaseType.FamilyBased,
    },
    SubType: [
      {
        text: "Immediate relatives of U.S. citizens",
        value: CaseSubType.IMMEDIATE_RELATIVES,
      },
      {
        text: "Family preference categories",
        value: CaseSubType.FAMILY_PREFERENCE,
      },
    ],
  },
  {
    Type: {
      text: "Employment-Based Immigration",
      value: CaseType.EmploymentBased,
    },
    SubType: [
      {
        text: "EB-1",
        value: CaseSubType.EB1,
      },
      {
        text: "EB-2",
        value: CaseSubType.EB2,
      },
      {
        text: "NIW",
        value: CaseSubType.EB2_NIW,
      },
      {
        text: "EB-3",
        value: CaseSubType.EB3,
      },
      {
        text: "EB-5",
        value: CaseSubType.EB5,
      },
    ],
  },
  {
    Type: {
      text: "Temporary Work Visas",
      value: CaseType.NonImmigrantVisas,
    },
    SubType: [
      {
        text: "H-1B",
        value: CaseSubType.H1B,
      },
      {
        text: "L-1",
        value: CaseSubType.L1,
      },
      {
        text: "O-1",
        value: CaseSubType.O1,
      },
    ],
  },
];
