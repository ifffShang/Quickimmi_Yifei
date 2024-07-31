import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { AppDispatch } from "../app/store";
import { resetAuthState, updateAuthState } from "../reducers/authSlice";
import { closeModal, openModal } from "../reducers/commonSlice";
import { InMemoryCache } from "../cache/inMemoryCache";
import { message } from "antd";
import { resetFormState } from "../reducers/formSlice";

export const signOutCurrentUser = (dispatch: AppDispatch) => {
  signOut()
    .then(() => {
      console.log("User signed out");

      // Clear the countdown interval
      const intervalId = InMemoryCache.get("tokenRefreshCountDownId");
      if (intervalId) {
        clearInterval(intervalId);
        InMemoryCache.remove("tokenRefreshCountDownId");
      }

      dispatch(resetFormState());
      dispatch(resetAuthState());
      dispatch(closeModal());
    })
    .catch(error => {
      /*
       * To handle the "Auth UserPool not configured" exception when calling signOut.
       * This exception will happen after the token is expired but the user was not sign out correctly.
       * Ideally this issue should not happen.
       */
      if (error.message === "Auth UserPool not configured.") {
        console.warn("UserPool not configured. Proceeding with sign out.");

        // Clear the countdown interval
        const intervalId = InMemoryCache.get("tokenRefreshCountDownId");
        if (intervalId) {
          clearInterval(intervalId);
          InMemoryCache.remove("tokenRefreshCountDownId");
        }
        dispatch(resetAuthState());
        dispatch(closeModal());
      } else {
        // Handle other possible errors
        console.error("Unexpected sign out error:", error);
      }
    });
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 500; // 0.5 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const fetchSessionWithRetry = async (retries: number): Promise<any> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to refresh token...`);
      const session = await fetchAuthSession({ forceRefresh: true });
      console.log("Fetched tokens:", session.tokens);

      if (session.tokens && session.tokens.accessToken) {
        return session.tokens;
      } else {
        console.error(`Attempt ${attempt} failed: Tokens are undefined`);
        if (attempt < retries) {
          await delay(RETRY_DELAY);
        } else {
          throw new Error(`Failed to refresh token after ${retries} attempts`);
        }
      }
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt < retries) {
        await delay(RETRY_DELAY);
      } else {
        throw new Error(`Failed to refresh token after ${retries} attempts`);
      }
    }
  }
};

export const startTokenExpirationTimer = (dispatch: AppDispatch, isLoggedIn: boolean) => {
  if (isLoggedIn) {
    const ExpirationTime = 1000 * 10; // 30 minutes
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
  const tokens = await fetchSessionWithRetry(MAX_RETRIES);
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
