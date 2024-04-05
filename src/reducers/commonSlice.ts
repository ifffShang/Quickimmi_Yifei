import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Language, ScreenSize } from "../model/Models";
import { handleResize } from "../utils/utils";

export interface CommonState {
  showModal?: boolean;
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
    closeModal: state => {
      state.showModal = false;
    },
  },
});

export const {
  updateLanguage,
  updateScreenSize,
  updateShowNavbar,
  closeModal,
} = commonSlice.actions;

export default commonSlice.reducer;
