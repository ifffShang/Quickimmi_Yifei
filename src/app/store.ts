import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import chatbotReducer from "../reducers/chatbotSlice";
import caseReducer from "../reducers/caseSlice";

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
    case: caseReducer,
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
