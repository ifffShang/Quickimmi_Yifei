import { ConfigProvider, ThemeConfig } from "antd";
import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { ModalView } from "./components/modals/ModalView";
import { Navbar } from "./components/navbar/Navbar";
import { updateScreenSize } from "./reducers/commonSlice";
import { MainView } from "./router/MainView";
import "./styles/Common.css";
import { handleResize } from "./utils/utils";
import { ScreenSize } from "./model/Models";
import { ChatbotFloating } from "./components/chatbot/ChatbotFloating";

function App() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(
    state => state.common.selectedLanguage,
  );
  const screenSize = useAppSelector(state => state.common.screenSize);

  const languageCss = selectedLanguage === "cn" ? "cn" : "en";

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
    window.addEventListener("resize", () =>
      handleResize(dispatch, updateScreenSize),
    );
    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div className="App">
      <ConfigProvider componentSize="large" theme={theme}>
        <div className={`${languageCss} ${screenSizeCss}`}>
          <ModalView />
          <ChatbotFloating />
          <Navbar />
          <MainView />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default App;
