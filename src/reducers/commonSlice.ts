import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Language = "cn" | "en";

export interface CommonState {
  selectedLanguage: Language;
}

const initialState: CommonState = {
  selectedLanguage: "cn",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<Language>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { updateLanguage } = commonSlice.actions;

export default commonSlice.reducer;
