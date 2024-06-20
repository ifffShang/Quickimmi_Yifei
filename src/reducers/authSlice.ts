import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role } from "../consts/consts";

export type Step = "signup" | "signin" | "forgotpassword" | "none";

export interface AuthStateOptional {
  prevStep?: Step;
  isLoggedIn?: boolean;
  accessToken?: string;
  email?: string;
  userId?: number;
  isLawyer?: boolean;
  role?: Role;
}

export interface AuthState {
  prevStep?: Step;
  isLoggedIn?: boolean;
  accessToken?: string;
  email?: string;
  userId?: number;
  isLawyer: boolean;
  role: Role;
}

const initialState: AuthState = {
  prevStep: "none",
  isLoggedIn: false,
  accessToken: "",
  email: "",
  userId: 0,
  isLawyer: false,
  role: Role.APPLICANT,
};

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
    resetAuthState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateAuthState, updateRole, resetAuthState } =
  authSlice.actions;

export default authSlice.reducer;
