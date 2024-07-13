import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chatbotReducer from "../reducers/chatbotSlice";
import caseReducer from "../reducers/caseSlice";
import authReducer from "../reducers/authSlice";
import commonReducer from "../reducers/commonSlice";
import formReducer from "../reducers/formSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  chatbot: chatbotReducer,
  case: caseReducer,
  auth: authReducer,
  common: commonReducer,
  form: formReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
