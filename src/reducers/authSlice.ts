import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Step = "signup" | "signin" | "forgotpassword" | "none";

export interface AuthState {
  prevStep?: Step;
  isLoggedIn?: boolean;
  accessToken?: string;
  email?: string;
  lawyerId?: number;
  userId?: number;
  role?: string;
}

const initialState: AuthState = {
  prevStep: "none",
  isLoggedIn: false,
  accessToken: "",
  email: "",
  userId: 0,
  lawyerId: 0,
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<AuthState>) => {
      Object.assign(state, action.payload);
    },
    resetAuthState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateAuthState, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
