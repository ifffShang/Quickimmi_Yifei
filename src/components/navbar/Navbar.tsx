import "./Navbar.css";
import { Link } from "react-router-dom";
import { openModal, updateSignOutInfo } from "../../reducers/authSlice";
import { signOut } from "aws-amplify/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Logo } from "../icons/Logo";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Menu } from "./Menu";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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

  let menuItems = [
    {
      key: "login",
      label: t("Login"),
      onClick: login,
    },
  ];

  if (isLoggedIn) {
    menuItems = [
      {
        key: "signout",
        label: t("SignOut"),
        onClick: signOutCurrentUser,
      },
    ];
  }

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
        <div>
          <Menu items={menuItems} />
        </div>
      </div>
    </div>
  );
}
