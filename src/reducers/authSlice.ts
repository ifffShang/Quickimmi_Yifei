import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../consts/consts";
import { InMemoryCache } from "../cache/inMemoryCache";

export type Step = "signup" | "signin" | "forgotpassword" | "none";

export interface AuthStateOptional {
  prevStep?: Step;
  accessToken?: string;
  email?: string;
  userId?: number;
  isLawyer?: boolean;
  role?: Role;
  tokenRefreshCountDownSeconds?: number;
  tokenExpiration?: number;
}

export interface AuthState {
  prevStep?: Step;
  accessToken?: string;
  email?: string;
  userId?: number;
  isLawyer: boolean;
  role: Role;
  tokenRefreshCountDownSeconds: number;
  tokenExpiration: number | null;
}

const initialState: AuthState = {
  prevStep: "none",
  accessToken: "",
  email: "",
  userId: 0,
  isLawyer: false,
  role: Role.APPLICANT,
  tokenRefreshCountDownSeconds: 30,
  tokenExpiration: null,
};

function clearTimers() {
  const tokenExpirationTimerId = InMemoryCache.get("tokenExpirationTimerId");
  if (tokenExpirationTimerId) {
    clearTimeout(tokenExpirationTimerId);
    InMemoryCache.remove("tokenExpirationTimerId");
  }

  const tokenRefreshCountDownId = InMemoryCache.get("tokenRefreshCountDownId");
  if (tokenRefreshCountDownId) {
    clearInterval(tokenRefreshCountDownId);
    InMemoryCache.remove("tokenRefreshCountDownId");
  }
}

function logout(state: AuthState) {
  clearTimers();
  InMemoryCache.clearAll();
  Object.assign(state, initialState);
  console.log("User has been logged out and state reset.");
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<AuthStateOptional>) => {
      Object.assign(state, action.payload);
    },
    countDownTokenRefresh: state => {
      if (state.tokenRefreshCountDownSeconds > 0) {
        state.tokenRefreshCountDownSeconds--;
        console.log("Token refresh countdown: ", state.tokenRefreshCountDownSeconds);
      } else {
        console.log("Token refresh countdown has reached zero.");
      }
    },
    resetAuthState: state => {
      logout(state);
    },
    updateTokenExpiration: (state, action: PayloadAction<number>) => {
      state.tokenExpiration = action.payload;
      console.log("Token expiration time updated: ", new Date(action.payload).toLocaleString());
    },
  },
});

export const { updateAuthState, countDownTokenRefresh, resetAuthState, updateTokenExpiration } = authSlice.actions;

export default authSlice.reducer;
