import {Message} from "../../model/Models";

export function askAi(): Promise<Message> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: "Hello, how can I help you?",
        role: "assistant",
        status: "successful",
      });
    }, 3000);
  });
}
