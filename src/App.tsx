import "./App.css";
import "./styles/Common.css";
import { ModalView } from "./components/modals/ModalView";
import { Navbar } from "./components/navbar/Navbar";
import { MainView } from "./router/MainView";
import { useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import { ScreenSize, handleResize } from "./utils/utils";
import { ConfigProvider, ThemeConfig } from "antd";

function App() {
  const selectedLanguage = useAppSelector(
    state => state.common.selectedLanguage,
  );
  const languageCss = selectedLanguage === "cn" ? "cn" : "en";

  const [screenSize, setScreenSize] = useState(handleResize());
  const screenSizeCss =
    screenSize === ScreenSize.small
      ? "small"
      : screenSize === ScreenSize.medium
        ? "medium"
        : "large";

  const primaryColor: string = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--primary-color");

  const theme: ThemeConfig = {
    token: {
      boxShadow: "none",
    },
    components: {
      Button: {
        colorPrimary: primaryColor,
        borderRadius: 4,
        primaryShadow: "none",
        algorithm: true, // Enable algorithm
      },
      Input: {
        colorPrimary: primaryColor,
        borderRadius: 4,
        algorithm: true, // Enable algorithm
      },
    },
  };

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(setScreenSize));
    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div className="App">
      <ConfigProvider componentSize="large" theme={theme}>
        <div className={`${languageCss} ${screenSizeCss}`}>
          <ModalView />
          <Navbar />
          <MainView />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default App;
