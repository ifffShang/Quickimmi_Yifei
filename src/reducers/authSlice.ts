import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Step = "signup" | "signin" | "forgotpassword" | "none";

export interface AuthState {
  prevStep?: Step;
  isLoggedIn?: boolean;
  accessToken?: string;
  email?: string;
}

const initialState: AuthState = {
  prevStep: "none",
  isLoggedIn: false,
  accessToken: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<AuthState>) => {
      Object.assign(state, action.payload);
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    resetAuthState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateAuthState, updateAccessToken, resetAuthState } =
  authSlice.actions;

export default authSlice.reducer;
