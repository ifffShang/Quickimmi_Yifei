import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Language, ScreenSize } from "../model/Models";
import { handleResize } from "../utils/utils";

export type ModalType = "uploadpassport" | "";
export interface CommonState {
  showModal?: boolean;
  modalType?: ModalType;
  selectedLanguage: Language;
  screenSize: ScreenSize;
  showNavbar: boolean;
}

const initialState: CommonState = {
  selectedLanguage: "en",
  screenSize: handleResize(),
  showNavbar: true,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<Language>) => {
      state.selectedLanguage = action.payload;
    },
    updateScreenSize: (state, action: PayloadAction<ScreenSize>) => {
      state.screenSize = action.payload;
    },
    updateShowNavbar: (state, action: PayloadAction<boolean>) => {
      state.showNavbar = action.payload;
    },
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.showModal = true;
      state.modalType = action.payload;
    },
    closeModal: state => {
      state.showModal = false;
    },
  },
});

export const {
  updateLanguage,
  updateScreenSize,
  updateShowNavbar,
  openModal,
  closeModal,
} = commonSlice.actions;

export default commonSlice.reducer;
