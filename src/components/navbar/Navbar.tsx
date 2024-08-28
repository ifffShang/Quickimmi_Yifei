import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOutCurrentUser } from "../../utils/authUtils";
import { showFormNavigation } from "../../utils/utils";
import { FormNavigation } from "../form/FormNavigation";
import { getLawyerInfoApi } from "../../api/authAPI";
import { ScreenSize } from "../../model/commonModels";
import LanguageSelector from "./LanguageSelector";
import { Menu } from "../common/Menu";
import { Logo } from "../icons/Logo";
import { Button, message } from "antd"; 
import "./Navbar.css";

export function Navbar(props: { currentPath: string }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const screenSize = useAppSelector(state => state.common.screenSize);
  const isSmallScreen = screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;
  const tokenExpiration = useAppSelector(state => state.auth.tokenExpiration);
  const isLoggedIn = tokenExpiration ? tokenExpiration > Date.now() : false;
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const email = useAppSelector(state => state.auth.email);
  const role = useAppSelector(state => state.auth.role);
  const showFormNav = showFormNavigation();

  const currentPath = props.currentPath;
  const onHomepage = currentPath === "/";
  const containerCss = `${isSmallScreen && showFormNav ? "navbar-container form-nav" : "navbar-container"}${onHomepage ? " navbar-container-homepage" : ""}`;
  
  let lawyerFirstName = "";
  useEffect(() => {
    fetchLawyerInfo();
  }, [accessToken, userId]);
  const fetchLawyerInfo = async () => {
    if (!accessToken || !email) {
      return;
    }
    try {
      const data = await getLawyerInfoApi(email, accessToken, role);
      if (data) {
        lawyerFirstName = data.firstName[0];
      }
    } catch (err) {
      console.error(err);
    }
  };
  const firstLetter = lawyerFirstName ? lawyerFirstName[0] : "U";

  const handleScrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const login = () => {
    navigate("/signin");
  };
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToProfile = () => {
    navigate("/profile");
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
      // {
      //   key: "dashboard",
      //   label: t("Dashboard.Dashboard"),
      //   onClick: goToDashboard,
      // },
      // {
      //   key: "profile",
      //   label: t("Profile"),
      //   onClick: goToProfile,
      // },
      {
        key: "signout",
        label: t("SignOut"),
        onClick: () => signOutCurrentUser(dispatch),
      },
    ];
  }

  let navLinks: { key: string; label: string; onClick: () => void }[] = [];
  if (onHomepage) {
    navLinks = [
      {
        key: "about",
        label: t("About"),
        onClick: () => {
          navigate("/contactus");
        },
      },
      {
        key: "solutions",
        label: t("Solutions"),
        onClick: () => {
          navigate("/");
          setTimeout(() => handleScrollToSection("solutions"), 500);
        },
      },
      {
        key: "features",
        label: t("Features"),
        onClick: () => {
          navigate("/");
          setTimeout(() => handleScrollToSection("features"), 500);
        },
      },
      {
        key: "services",
        label: t("Services"),
        onClick: () => {
          navigate("/");
          setTimeout(() => handleScrollToSection("services"), 500);
        },
      },
      {
        key: "contact",
        label: t("Contact"),
        onClick: () => {
          navigate("/contactus");
        },
      },
    ];
  }

  return (
    <div className={containerCss}>
      <div className="navbar-group left">
        {isSmallScreen && showFormNav && <FormNavigation />}
        <div className="navbar-logo">
          <Link className="navbar-logo-link" to={"/"}>
            <Logo />
          </Link>
        </div>
      </div>
      <div className="navbar-group mid">
        <div className="navbar-links">
          {navLinks.map(link => (
            <Button
              key={link.key}
              type="link"
              onClick={link.onClick}
              className="navbar-link"
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="navbar-group right">
        <div className="navbar-language">
          <LanguageSelector />
        </div>
        <div className="navbar-button">
          {isLoggedIn ? (
            <Button type="primary" onClick={goToDashboard} className="nav-btn-dashboard">
              {t("Dashboard.Dashboard")}
            </Button>
          ) : (
            <Button type="link" onClick={login} className="nav-link-login">
              {t("Login")}
            </Button>
          )}
        </div>
        <div className="navbar-profile">
          {isLoggedIn ? (
            <div className="navbar-profile-button">
              <Button type="primary" shape="circle" onClick={goToProfile} className="nav-btn-profile">
                {firstLetter}
              </Button>
              <Menu items={menuItems} popupPosition="bottom-left" />
            </div>
          ):(
            <a href="https://forms.gle/7i85vwVHMbsBSe3a8" target="_blank" rel="noopener noreferrer">
              <Button type="primary" className="nav-btn-demo">
                {t("LandingPage.RequestDemo")}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
