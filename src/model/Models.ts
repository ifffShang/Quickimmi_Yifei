export type Language = "cn" | "en";

export interface Message {
  role: "user" | "assistant";
  content: string;
  status: "loading" | "successful" | "failed";
}

export interface ChildrenOnlyProps {
  children: React.ReactNode;
}
