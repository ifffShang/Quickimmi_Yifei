import { Message } from "../../modal/Modals";

export function askAi(): Promise<Message> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        content: "Hello, how can I help you?",
        role: "assistant",
        status: "successful",
      });
    }, 3000);
  });
}