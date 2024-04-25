import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ScreenSize } from "../../model/models";
import { signOutCurrentUser } from "../../utils/authUtils";
import { isAuthPath, showFormNavigation } from "../../utils/utils";
import { Menu } from "../common/Menu";
import { FormNavigation } from "../form/FormNavigation";
import { Logo } from "../icons/Logo";
import LanguageSelector from "./LanguageSelector";
import "./Navbar.css";

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
        onClick: () => signOutCurrentUser(dispatch),
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
          <Link
            className="navbar-logo-link"
            to={isLoggedIn ? "/dashboard" : "/"}
          >
            <Logo />
          </Link>
        </div>
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
