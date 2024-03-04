import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalType = "signin" | "signup" | "none";

export interface CommonState {
  showModal: boolean;
  modalType: ModalType;
  isLoggedIn: boolean;
}

const initialState: CommonState = {
  showModal: false,
  modalType: "signin",
  isLoggedIn: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
      state.showModal = true;
    },
    closeModal: state => {
      state.showModal = false;
      state.modalType = "none";
    },
    changeLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      
      if (action.payload) {
        state.showModal = true;
        state.modalType = "signin";
      } else {
        state.showModal = false;
        state.modalType = "none";
      }
    },
  },
});

export const { openModal, closeModal, changeLoginStatus} =
commonSlice.actions;

export default commonSlice.reducer;
