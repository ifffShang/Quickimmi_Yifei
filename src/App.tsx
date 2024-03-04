import React from "react";
import "./App.css";
import {Navbar} from "./components/navbar/Navbar";
import {MainView} from "./router/MainView";
import { ModalView } from "./modals/ModalView";

function App() {
  return (
    <div className="App">
      <ModalView />
      <Navbar />
      <MainView />
    </div>
  );
}

export default App;
