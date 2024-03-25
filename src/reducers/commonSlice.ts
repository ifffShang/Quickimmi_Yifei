import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Language, ScreenSize } from "../model/Models";
import { handleResize } from "../utils/utils";

export interface CommonState {
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
  },
});

export const { updateLanguage, updateScreenSize, updateShowNavbar } =
  commonSlice.actions;

export default commonSlice.reducer;
