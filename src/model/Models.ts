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
  | "PASSPORT_FULL";
