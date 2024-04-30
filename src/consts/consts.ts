export const Regex = {
  PhoneNumberRegex: {
    FilterRegex: /\D/g,
    ExtractRegex: /^\((\d{3})\)(\d{3}-\d{4}$)/,
    FormatRegex: /(\d{1,3})(\d{0,3})(\d{0,4})/,
    FormatOutput: "($1)$2-$3",
    MaxLength: 10,
  },
};
