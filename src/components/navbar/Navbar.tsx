import { signOut } from "aws-amplify/auth";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetAuthState } from "../../reducers/authSlice";
import { Logo } from "../icons/Logo";
import LanguageSelector from "./LanguageSelector";
import { Menu } from "../common/Menu";
import "./Navbar.css";
import { isAuthPath, showFormNavigation } from "../../utils/utils";
import { ScreenSize } from "../../model/Models";
import { FormNavigation } from "../form/FormNavigation";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const showNavbar = !isAuthPath(location.pathname);
  const screenSize = useAppSelector(state => state.common.screenSize);
  const isSmallScreen =
    screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;
  const showFormNav = showFormNavigation();

  if (!showNavbar) {
    return null;
  }

  const login = () => {
    navigate("/signin");
  };

  const signOutCurrentUser = () => {
    signOut().then(() => {
      console.log("User signed out");
      dispatch(resetAuthState());
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

  const containerCss =
    isSmallScreen && showFormNav
      ? "navbar-container form-nav"
      : "navbar-container";

  return (
    <div className={containerCss}>
      <div className="navbar-group">
        {isSmallScreen && showFormNav && <FormNavigation />}
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
          <Menu items={menuItems} popupPosition="bottom-left" />
        </div>
      </div>
    </div>
  );
}
