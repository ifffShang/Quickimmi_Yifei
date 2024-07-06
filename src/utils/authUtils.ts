import { signOut } from "aws-amplify/auth";
import { AppDispatch } from "../app/store";
import { resetAuthState, updateAuthState } from "../reducers/authSlice";
import { closeModal, openModal } from "../reducers/commonSlice";
import { fetchAuthSession } from "aws-amplify/auth";
import { InMemoryCache } from "../cache/inMemoryCache";

export const signOutCurrentUser = (dispatch: AppDispatch) => {
  signOut().then(() => {
    console.log("User signed out");
    dispatch(resetAuthState());
    dispatch(closeModal());
  });
};

export const startTokenExpirationTimer = (dispatch: AppDispatch) => {
  const ExpirationTime = 1000 * 60 * 50; // 50 minutes
  const timerId = setTimeout(() => {
    dispatch(openModal({ modalType: "tokenRefreshPopup", modalData: {} }));
  }, ExpirationTime);
  InMemoryCache.set("tokenExpirationTimerId", timerId);
};

export const refreshToken = async (dispatch: AppDispatch) => {
  const { tokens } = await fetchAuthSession({ forceRefresh: true });
  if (!tokens || !tokens.accessToken) {
    throw new Error("Empty tokens in session after refresh");
  }
  const accessToken = tokens.accessToken.toString();
  dispatch(updateAuthState({ accessToken: accessToken, tokenRefreshCountDownSeconds: 30 }));
  InMemoryCache.get("tokenRefreshCountDownId") && clearInterval(InMemoryCache.get("tokenRefreshCountDownId"));
  InMemoryCache.set("tokenRefreshCountDownId", undefined);
};
