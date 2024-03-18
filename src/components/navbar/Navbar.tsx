import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { openModal, updateSignOutInfo } from "../../reducers/authSlice";
import { signOut } from "aws-amplify/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Logo } from "../icons/Logo";
import LanguageSelector from "./LanguageSelector";

export function Navbar() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const login = () => {
    dispatch(openModal({ modalType: "signin" }));
  };

  const signOutCurrentUser = () => {
    signOut().then(() => {
      console.log("User signed out");
      dispatch(updateSignOutInfo());
    });
  };

  return (
    <div className="navbar-container">
      <div className="navbar-group">
        <div className="navbar-logo">
          <Link className="navbar-logo-link" to="/">
            <Logo />
          </Link>
        </div>
        {isLoggedIn && (
          <div className="navbar-menu">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        )}
      </div>
      <div className="navbar-group">
        <div className="navbar-profile">
          <LanguageSelector />
        </div>
        <div className="navbar-profile">
          {!isLoggedIn ? (
            <Button type="link" onClick={login}>
              Login
            </Button>
          ) : (
            <Button type="link" onClick={signOutCurrentUser}>
              Sign out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
