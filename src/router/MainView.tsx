import React from "react";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../pages/dashboard/Dashboard";
import {Home} from "../pages/home/Home";
import "./MainView.css";
import {NewCase} from "../pages/newCase/NewCase";

export function MainView() {
  return (
    <div className="mainview-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newCase" element={<NewCase />} />
      </Routes>
    </div>
  );
}
