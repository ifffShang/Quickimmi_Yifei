import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {KeyValues, Language, ScreenSize} from "../model/commonModels";
import {handleResize} from "../utils/utils";

export type ModalType =
  | "uploadpassport"
  | "uploadotherid"
  | "uploadSignedDocument"
  | "registerTrackingNumber"
  | "registerApplicationReceipt"
  | "registerFingerprintTimeLocation"
  | "registerInterviewTimeLocation"
  | "registerApplicationFinalResultReceipt"
  | "tokenRefreshPopup"
  | "";

export interface CommonState {
    showModal?: boolean;
    modalType?: ModalType;
    modalData?: KeyValues;
    tmpImageUrl?: string;
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
        openModal: (
            state,
            action: PayloadAction<{ modalType: ModalType; modalData: KeyValues }>,
        ) => {
            state.showModal = true;
            state.modalType = action.payload.modalType;
            state.modalData = action.payload.modalData;
        },
        changeModalType: (state, action: PayloadAction<ModalType>) => {
            state.modalType = action.payload;
        },
        updateTmpImageUrl: (state, action: PayloadAction<string>) => {
            state.tmpImageUrl = action.payload;
        },
        closeModal: state => {
            state.showModal = false;
            state.modalType = "";
            state.tmpImageUrl = "";
            state.modalData = {};
        },
    },
});

export const {
    updateLanguage,
    updateScreenSize,
    updateShowNavbar,
    openModal,
    changeModalType,
    updateTmpImageUrl,
    closeModal,
} = commonSlice.actions;

export default commonSlice.reducer;
