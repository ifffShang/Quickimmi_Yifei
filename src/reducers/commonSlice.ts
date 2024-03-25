import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Language, ScreenSize } from "../model/Models";
import { handleResize } from "../utils/utils";

export interface CommonState {
  selectedLanguage: Language;
  screenSize: ScreenSize;
}

const initialState: CommonState = {
  selectedLanguage: "en",
  screenSize: handleResize(),
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
  },
});

export const { updateLanguage, updateScreenSize } = commonSlice.actions;

export default commonSlice.reducer;
