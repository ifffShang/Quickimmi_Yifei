import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role } from "../consts/consts";
import { InMemoryCache } from "../cache/inMemoryCache";
import { closeModal } from "./commonSlice";

export type Step = "signup" | "signin" | "forgotpassword" | "none";

export interface AuthStateOptional {
  prevStep?: Step;
  isLoggedIn?: boolean;
  accessToken?: string;
  email?: string;
  userId?: number;
  isLawyer?: boolean;
  role?: Role;
  tokenRefreshCountDownSeconds?: number;
}

export interface AuthState {
  prevStep?: Step;
  isLoggedIn?: boolean;
  accessToken?: string;
  email?: string;
  userId?: number;
  isLawyer: boolean;
  role: Role;
  tokenRefreshCountDownSeconds: number;
}

const initialState: AuthState = {
  prevStep: "none",
  isLoggedIn: false,
  accessToken: "",
  email: "",
  userId: 0,
  isLawyer: false,
  role: Role.APPLICANT,
  tokenRefreshCountDownSeconds: 30,
};

function logout(state: AuthState) {
  const tokenExpirationTimerId = InMemoryCache.get("tokenExpirationTimerId");
  if (tokenExpirationTimerId) {
    clearTimeout(tokenExpirationTimerId);
  }
  const tokenRefreshCountDownId = InMemoryCache.get("tokenRefreshCountDownId");
  if (tokenRefreshCountDownId) {
    clearInterval(tokenRefreshCountDownId);
  }
  InMemoryCache.clearAll();
  Object.assign(state, initialState);
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<AuthStateOptional>) => {
      Object.assign(state, action.payload);
    },
    updateRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
      state.isLawyer = action.payload === Role.LAWYER;
    },
    countDownTokenRefresh: state => {
      state.tokenRefreshCountDownSeconds > 0 && state.tokenRefreshCountDownSeconds--;
      console.log("Token refresh count down: ", state.tokenRefreshCountDownSeconds);
    },
    resetAuthState: state => {
      logout(state);
    },
  },
});

export const { updateAuthState, updateRole, countDownTokenRefresh, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
