import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOutCurrentUser } from "../../utils/authUtils";
import { showFormNavigation } from "../../utils/utils";
import { FormNavigation } from "../form/FormNavigation";
import { getLawyerInfoApi } from "../../api/authAPI";
import { ScreenSize } from "../../model/commonModels";
import { MenuOutlined, DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { Drawer, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Logo } from "../icons/Logo";
import "./Navbar.css";

export function Navbar(props: { currentPath: string }) {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
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
  const containerCss = `${
    isSmallScreen && showFormNav ? "navbar-container form-nav" : "navbar-container"
  }${onHomepage ? " navbar-container-homepage" : ""}`;

  const [firstLetter, setFirstLetter] = useState("U");
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchLawyerInfo();
    }
  }, [accessToken, userId]);

  const fetchLawyerInfo = async () => {
    if (!accessToken || !email) {
      return;
    }
    try {
      const data = await getLawyerInfoApi(email, accessToken, role);
      if (data) {
        const firstName = data.firstName;
        setFirstLetter(firstName ? firstName[0] : "U");
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const signOut = async () => {
    await signOutCurrentUser(dispatch);
    navigate("/");
  };

  // Menu items for profile dropdown
  const menuItems: MenuProps["items"] = isLoggedIn
    ? [
        {
          key: "profile",
          label: t("Profile"),
        },
        {
          key: "signout",
          label: t("SignOut"),
        },
      ]
    : [
        {
          key: "login",
          label: t("Login"),
        },
      ];

  const profileMenu = {
    items: menuItems,
    onClick: ({ key }) => {
      if (key === "profile") {
        goToProfile();
      } else if (key === "signout") {
        signOut();
      } else if (key === "login") {
        login();
      }
    },
  };

  // Menu items for language selector
  const languageMenuItems: MenuProps["items"] = [
    {
      key: "en",
      label: "English",
    },
    {
      key: "cn",
      label: "简体中文",
    },
  ];

  const languageMenu = {
    items: languageMenuItems,
    onClick: ({ key }) => {
      i18n.changeLanguage(key);
    },
  };

  const navLinks: { key: string; label: string; onClick: () => void }[] = onHomepage
    ? [
        {
          key: "about",
          label: t("About"),
          onClick: () => navigate("/contactus"),
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
          onClick: () => navigate("/contactus"),
        },
      ]
    : [];

  return (
    <div className={containerCss}>
      <div className="navbar-group left">
        {isSmallScreen && showFormNav && <FormNavigation />}
        <div className="navbar-logo">
          <Link className="navbar-logo-link" to="/">
            <Logo />
          </Link>
        </div>
      </div>
      {!isSmallScreen && (
        <div className="navbar-group mid">
          <div className="navbar-links">
            {navLinks.map(link => (
              <Button key={link.key} type="link" onClick={link.onClick} className="navbar-link">
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="navbar-group right">
        <div className="navbar-language">
          <Dropdown menu={languageMenu} trigger={["click"]} placement="bottomRight">
            <Button type="link" className="navbar-global-button">
              <GlobalOutlined className="navbar-global-icon" />
            </Button>
          </Dropdown>
        </div>
        {/* Vertical separator */}
        <div className="navbar-separator" />
        {isSmallScreen ? (
          <MenuOutlined className="navbar-hamburger-icon" onClick={() => setDrawerVisible(true)} />
        ) : (
          <>
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
            <div className="navbar-separator" />
            <div className="navbar-profile">
              {isLoggedIn ? (
                <div className="navbar-profile-button">
                  <Dropdown menu={profileMenu} trigger={["click"]}>
                    <Button type="primary" shape="circle" className="nav-btn-profile">
                      {firstLetter} <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              ) : (
                <a href="https://forms.gle/7i85vwVHMbsBSe3a8" target="_blank" rel="noopener noreferrer">
                  <Button type="primary" className="nav-btn-demo">
                    {t("LandingPage.RequestDemo")}
                  </Button>
                </a>
              )}
            </div>
          </>
        )}
      </div>
      {/* Drawer for small screens */}
      <Drawer
        title=""
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="navbar-drawer"
        width={200}
      >
        <div className="drawer-content">
          <div className="drawer-links">
            {navLinks.map(link => (
              <Button
                key={link.key}
                type="link"
                onClick={() => {
                  link.onClick();
                  setDrawerVisible(false);
                }}
                className="drawer-link"
              >
                {link.label}
              </Button>
            ))}
          </div>
          <div className="drawer-divider" />
          <div className="drawer-buttons">
            {isLoggedIn ? (
              <>
                <Button
                  type="link"
                  onClick={() => {
                    goToDashboard();
                    setDrawerVisible(false);
                  }}
                  className="drawer-button"
                >
                  {t("Dashboard.Dashboard")}
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    goToProfile();
                    setDrawerVisible(false);
                  }}
                  className="drawer-button"
                >
                  {t("Profile")}
                </Button>
                <Button
                  type="link"
                  onClick={async () => {
                    await signOut();
                    setDrawerVisible(false);
                  }}
                  className="drawer-button"
                >
                  {t("SignOut")}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="link"
                  onClick={() => {
                    login();
                    setDrawerVisible(false);
                  }}
                  className="drawer-button"
                >
                  {t("Login")}
                </Button>
                <a href="https://forms.gle/7i85vwVHMbsBSe3a8" target="_blank" rel="noopener noreferrer">
                  <Button type="primary" className="drawer-button" onClick={() => setDrawerVisible(false)}>
                    {t("LandingPage.RequestDemo")}
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
