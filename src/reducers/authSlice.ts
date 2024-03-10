import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalType = "signin" | "signup" | "confirmcode" | "none";
type Step = "signup" | "forgotpassword" | "none";

export interface AuthState {
  showModal?: boolean;
  modalType?: ModalType;
  prevStep?: Step;
  isLoggedIn?: boolean;
  accessToken?: string;
  email?: string;
  phoneNumber?: string;
}

const initialState: AuthState = {
  showModal: false,
  modalType: "none",
  prevStep: "none",
  isLoggedIn: false,
  accessToken: "",
  email: "",
  phoneNumber: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<AuthState>) => {
      Object.assign(state, action.payload);
      state.showModal = true;
    },
    closeModal: state => {
      state.showModal = false;
      state.modalType = "none";
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { openModal, closeModal, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
