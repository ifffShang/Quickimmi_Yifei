import React from "react";
import "./App.css";
import {Navbar} from "./components/navbar/Navbar";
import {MainView} from "./router/MainView";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainView />
    </div>
  );
}

export default App;
