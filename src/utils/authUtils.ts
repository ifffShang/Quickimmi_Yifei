import { signOut } from "aws-amplify/auth";
import { AppDispatch } from "../app/store";
import { resetAuthState } from "../reducers/authSlice";

export const signOutCurrentUser = (dispatch: AppDispatch) => {
  signOut().then(() => {
    console.log("User signed out");
    dispatch(resetAuthState());
  });
};
