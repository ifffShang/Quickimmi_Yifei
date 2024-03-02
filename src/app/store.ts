import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chatbotReducer from "../features/chatbot/chatbotSlice";

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
