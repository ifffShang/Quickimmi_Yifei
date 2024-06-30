export type Language = "cn" | "en";

export interface Message {
  role: "user" | "assistant";
  content: string;
  status: "loading" | "successful" | "failed";
}

export interface ChildrenOnlyProps {
  children: React.ReactNode;
}

export enum ScreenSize {
  xsmall = 550,
  small = 900,
  medium = 1500,
  large = 2100,
}

export type DocumentType =
  | "PASSPORT_MAIN"
  | "ID_CARD"
  | "I94"
  | "PASSPORT_FULL"
  | "TRAVEL_ID"
  | "DELIVERY_PACKAGE_PHOTO"
  | "I797_RECEIPT"
  | "COT"
  | "G28"
  | "ASYLUM_COVER_LETTER"
  | "EOIR28"
  | "I589"
  | "PERSONAL_STATEMENT";

export const DocumentTypeMap: { [key: string]: DocumentType } = {
  passport_main: "PASSPORT_MAIN",
  id_card: "ID_CARD",
  i94: "I94",
  passport_full: "PASSPORT_FULL",
  travel_id: "TRAVEL_ID",
  delivery_package_photo: "DELIVERY_PACKAGE_PHOTO",
  i797_receipt: "I797_RECEIPT",
  cot: "COT",
  "g-28": "G28",
  "i-589": "I589",
  personal_statement: "PERSONAL_STATEMENT",
  asylum_cover_letter: "ASYLUM_COVER_LETTER",
  "eoir-28": "EOIR28",
};

export type Identity =
  | "Applicant"
  | "Spouse"
  | "Child_1"
  | "Child_2"
  | "Child_3"
  | "Child_4"
  | "Child_5"
  | "Child_6"
  | "Child_7"
  | "Child_8"
  | "Child_9"
  | "Child_10"
  | "Child_11"
  | "Child_12"
  | "Child_13";
export interface KeyValues {
  [key: string]: any;
}

export type DocumentCreatedBy = "APPLICANT" | "LAWYER" | "SYSTEM";

export type DocumentStatus = "UPLOADING" | "UPLOADED" | "FAILED";

export type DocumentOperation = "NEW" | "REPLACE";