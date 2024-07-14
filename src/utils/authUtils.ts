import { signOut } from "aws-amplify/auth";
import { AppDispatch } from "../app/store";
import { resetAuthState, updateAuthState } from "../reducers/authSlice";
import { closeModal, openModal } from "../reducers/commonSlice";
import { fetchAuthSession } from "aws-amplify/auth";
import { InMemoryCache } from "../cache/inMemoryCache";
import { message } from "antd";

export const signOutCurrentUser = (dispatch: AppDispatch) => {
  signOut().then(() => {
    console.log("User signed out");

    // Clear the countdown interval
    const intervalId = InMemoryCache.get("tokenRefreshCountDownId");
    if (intervalId) {
      clearInterval(intervalId);
      InMemoryCache.remove("tokenRefreshCountDownId");
    }

    dispatch(resetAuthState());
    dispatch(closeModal());
  });
};

export const startTokenExpirationTimer = (dispatch: AppDispatch, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    const ExpirationTime = 1000 * 60 * 30; // 30 minutes
    const timerId = setTimeout(() => {
      dispatch(openModal({ modalType: "tokenRefreshPopup", modalData: {} }));
    }, ExpirationTime);
    InMemoryCache.set("tokenExpirationTimerId", timerId);
  }
};

export const refreshToken = async (dispatch: AppDispatch) => {
  /*
   * The fetchAuthSession API automatically refreshes the user's session
   * when the authentication tokens have expired and a valid refreshToken is present.
   * Additionally, you can also refresh the session explicitly by calling the
   * fetchAuthSession API with the forceRefresh flag enabled.
   * https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/manage-user-session/#refreshing-sessions
   */
  const { tokens } = await fetchAuthSession({ forceRefresh: true });
  console.log("tokens", tokens);
  if (!tokens || !tokens.accessToken) {
    message.error("Empty tokens in session after refresh");
    throw new Error("Empty tokens in session after refresh");
  }
  const accessToken = tokens.accessToken.toString();
  dispatch(updateAuthState({ accessToken: accessToken, tokenRefreshCountDownSeconds: 30 }));
  InMemoryCache.get("tokenRefreshCountDownId") && clearInterval(InMemoryCache.get("tokenRefreshCountDownId"));
  InMemoryCache.set("tokenRefreshCountDownId", undefined);
};
