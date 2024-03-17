import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalType = "signin" | "signup" | "confirmcode" | "signoutsccess" | "none";
type Step = "signup" | "signin" | "forgotpassword" | "none";

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

const closeModalHelper = (state: AuthState) => {
  state.showModal = false;
  state.modalType = "none";
  state.prevStep = "none";
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
      closeModalHelper(state);
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    updateLoginInfo: (state, action: PayloadAction<AuthState>) => {
      Object.assign(state, action.payload);
      closeModalHelper(state);
    },
    updateSignOutInfo: state => {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.email = "";
      state.phoneNumber = "";
      state.showModal = true;
      state.modalType = "signoutsccess";
    },
  },
});

export const {
  openModal,
  closeModal,
  updateAccessToken,
  updateLoginInfo,
  updateSignOutInfo,
} = authSlice.actions;

export default authSlice.reducer;
