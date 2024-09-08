export const Regex = {
  PhoneNumberRegex: {
    FilterRegex: /\D/g,
    ExtractRegex: /^\((\d{3})\)(\d{3}-\d{4}$)/,
    FormatRegex: /(\d{1,3})(\d{0,3})(\d{0,4})/,
    FormatOutput: "($1)$2-$3",
    MaxLength: 10,
  },
};

export enum Role {
  APPLICANT = "APPLICANT",
  LAWYER = "LAWYER",
}

export const ExcludedSectionsFromPercentage = [
  "i589_fields_view_reports",
  "i589_fields_view_merged_documents",
  "i589_fields_view_application_form",
];
