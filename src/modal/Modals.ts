export interface Message {
    role: "user" | "assistant";
    content: string;
    status: "loading" | "successful" | "failed";
}