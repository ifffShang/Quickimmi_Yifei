export enum CaseType {
  Asylum = "Asylum",
  FamilyBased = "Family-Based",
  EmploymentBased = "Employment-Based",
  TemporaryWorkVisas = "TemporaryWorkVisas",
}

export enum AsylumType {
  AFFIRMATIVE = "AFFIRMATIVE",
  DEFENSIVE = "DEFENSIVE",
}

export enum FamilyBasedType {
  IMMEDIATE_RELATIVES = "IMMEDIATE RELATIVES OF U.S. CITIZENS",
  FAMILY_PREFERENCE = "FAMILY PREFERENCE CATEGORIES",
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
        value: AsylumType.AFFIRMATIVE,
      },
      {
        text: "DEFENSIVE",
        value: AsylumType.DEFENSIVE,
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
        value: FamilyBasedType.IMMEDIATE_RELATIVES,
      },
      {
        text: "Family preference categories",
        value: FamilyBasedType.FAMILY_PREFERENCE,
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
