import React from "react";
import "./App.css";
import {Navbar} from "./features/navbar";
import {MainView} from "./pages/container/MainView";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainView />
    </div>
  );
}

export default App;
