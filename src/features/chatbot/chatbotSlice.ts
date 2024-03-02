import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../model/Models";

export interface ChatbotState {
  messages: Message[];
}

const initialState: ChatbotState = {
  messages: [],
};

export const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addNewMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateNewMessage: (state, action: PayloadAction<Message>) => {
      state.messages[state.messages.length - 1] = action.payload;
    },
  },
});

export const { addNewMessage, updateNewMessage } = chatbotSlice.actions;

export default chatbotSlice.reducer;
