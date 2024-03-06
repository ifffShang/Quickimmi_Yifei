import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalType = "signin" | "signup" | "confirmcode" | "none";

export interface UserData {
  email?: string;
  phoneNumber?: string;
}

export interface CommonState {
  showModal: boolean;
  modalType: ModalType;
  isLoggedIn: boolean;
  userData: UserData;
}

const initialState: CommonState = {
  showModal: false,
  modalType: "signin",
  isLoggedIn: false,
  userData: {},
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ modalType: ModalType; data?: UserData }>,
    ) => {
      state.modalType = action.payload.modalType;
      state.showModal = true;

      if (action.payload.data) {
        if (action.payload.data.email)
          state.userData.email = action.payload.data.email;
        if (action.payload.data.phoneNumber)
          state.userData.phoneNumber = action.payload.data.phoneNumber;
      }
    },
    closeModal: state => {
      state.showModal = false;
      state.modalType = "none";
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.userData.email = action.payload;
    },
  },
});

export const { openModal, closeModal, updateEmail } = commonSlice.actions;

export default commonSlice.reducer;
