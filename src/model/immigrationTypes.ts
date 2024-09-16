export enum CaseType {
  Asylum = "Asylum",
  FamilyBased = "FamilyBased",
  EmploymentBased = "EmploymentBased",
  TemporaryWorkVisas = "TemporaryWorkVisas",
}

export enum CaseSubType {
  AFFIRMATIVE = "AFFIRMATIVE",
  DEFENSIVE = "DEFENSIVE",
  IMMEDIATE_RELATIVES = "IMMEDIATE_RELATIVES",
  FAMILY_PREFERENCE = "FAMILY_PREFERENCE",
}

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
        value: "EB-1",
      },
      {
        text: "EB-2",
        value: "EB-2",
      },
      {
        text: "EB-5",
        value: "EB-5",
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
        value: "H-1B",
      },
      {
        text: "L-1",
        value: "L-1",
      },
      {
        text: "O-1",
        value: "O-1",
      },
    ],
  },
];
