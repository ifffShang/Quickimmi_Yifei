import React from "react";
import {Message} from "../model/Models";
import "./ChatBody.css";

export interface ChatBodyProps {
  messages: Message[];
}

export function ChatBody(props: ChatBodyProps) {
  return (
    <div className="chatbody-container">
      {props.messages.map((msg, index) => {
        const roleCss = msg.role === "assistant" ? "assistant" : "user";

        if (msg.status === "loading") {
          return <div key={index}>Loading...</div>;
        }
        return (
          <div key={index} className={"message-container " + roleCss}>
            {msg.content}
          </div>
        );
      })}
    </div>
  );
}
