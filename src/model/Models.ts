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
