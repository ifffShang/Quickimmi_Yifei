export enum CaseType {
  Asylum = "Asylum",
  FamilyBased = "FamilyBased",
  EmploymentBased = "EmploymentBased",
  TemporaryWorkVisas = "TemporaryWorkVisas",
}

export enum CaseSubType {
  // Asylum
  AFFIRMATIVE = "AFFIRMATIVE",
  DEFENSIVE = "DEFENSIVE",
  // FamilyBased
  IMMEDIATE_RELATIVES = "IMMEDIATE_RELATIVES",
  FAMILY_PREFERENCE = "FAMILY_PREFERENCE",
  // EmploymentBased
  EB_1 = "EB_1",
  EB_2 = "EB_2",
  EB_2_NIW = "EB_2_NIW",
  EB_3 = "EB_3",
  EB_5 = "EB_5",
  // TemporaryWorkVisas
  H1B = "H1B",
  L1 = "L1",
  O1 = "O1",
}

export const EnabledCaseSubTypes = [
  CaseSubType.AFFIRMATIVE,
  CaseSubType.DEFENSIVE,
  CaseSubType.IMMEDIATE_RELATIVES,
  CaseSubType.FAMILY_PREFERENCE,
  CaseSubType.EB_2_NIW,
  CaseSubType.EB_1,
  CaseSubType.O1,
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
        value: CaseSubType.EB_1,
      },
      {
        text: "EB-2",
        value: CaseSubType.EB_2,
      },
      {
        text: "NIW",
        value: CaseSubType.EB_2_NIW,
      },
      {
        text: "EB-3",
        value: CaseSubType.EB_3,
      },
      {
        text: "EB-5",
        value: CaseSubType.EB_5,
      },
    ],
  },
  {
    Type: {
      text: "Temporary Work Visas",
      value: CaseType.TemporaryWorkVisas,
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
