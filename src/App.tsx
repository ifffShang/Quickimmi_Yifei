import { ConfigProvider } from "antd";
import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { ModalView } from "./components/modals/ModalView";
import { ScreenSize } from "./model/commonModels";
import { updateScreenSize } from "./reducers/commonSlice";
import { MainView } from "./components/router/MainView";
import "./styles/Common.css";
import { getAntTheme } from "./utils/theme";
import { handleResize } from "./utils/screenSizeUtil";
import { signOutCurrentUser } from "./utils/authUtils";

function App() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(state => state.common.selectedLanguage);
  const screenSize = useAppSelector(state => state.common.screenSize);
  const tokenRefreshCountDownSeconds = useAppSelector(state => state.auth.tokenRefreshCountDownSeconds);

  const languageCss = selectedLanguage === "cn" ? "cn" : "en";

  const screenSizeCss =
    screenSize === ScreenSize.xsmall
      ? "xsmall"
      : screenSize === ScreenSize.small
        ? "small"
        : screenSize === ScreenSize.medium
          ? "medium"
          : "large";

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(dispatch, updateScreenSize));
    return () => window.removeEventListener("resize", () => {});
  }, []);

  useEffect(() => {
    if (tokenRefreshCountDownSeconds === 0) {
      signOutCurrentUser(dispatch);
    }
  }, [tokenRefreshCountDownSeconds]);

  return (
    <div className="App">
      <ConfigProvider componentSize="large" theme={getAntTheme()}>
        <div className={`appview ${languageCss} ${screenSizeCss}`}>
          <ModalView />
          {/* <ChatbotFloating /> */}
          {/* <Navbar /> */}
          <MainView />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default App;
