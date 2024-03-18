import "./App.css";
import { ModalView } from "./components/modals/ModalView";
import { Navbar } from "./components/navbar/Navbar";
import { MainView } from "./router/MainView";
import { useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import { ScreenSize, handleResize } from "./utils/utils";

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

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(setScreenSize));
    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div className="App">
      <div className={`${languageCss} ${screenSizeCss}`}>
        <ModalView />
        <Navbar />
        <MainView />
      </div>
    </div>
  );
}

export default App;
