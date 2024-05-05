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
  | "TRAVEL_ID";

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
