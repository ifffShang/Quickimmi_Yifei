import React from "react";
import {useCallback} from "react";
import {askAi} from "../../api/chatbotAPI";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {addNewMessage, updateNewMessage} from "../../reducers/chatbotSlice";
import {useAppSelector} from "../../app/hooks";
import {ChatBody} from "./ChatBody";

import "./Chatbot.css";

export function Chatbot() {
  const dispatch = useDispatch();
  const messages = useAppSelector(state => state.chatbot.messages);

  const askQuestion = useCallback(() => {
    dispatch(
      addNewMessage({
        content: "",
        role: "user",
        status: "loading",
      }),
    );
    askAi().then(response => {
      dispatch(updateNewMessage(response));
    });
  }, [dispatch]);

  return (
    <div className="chatbot-container">
      <ChatBody messages={messages} />
      <div>
        <input type="text" />
        <button onClick={askQuestion}>Send</button>
      </div>
    </div>
  );
}
