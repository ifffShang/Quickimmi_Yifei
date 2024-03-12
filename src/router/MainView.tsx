import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Home } from "../pages/home/Home";
import { NewCase } from "../pages/newCase/NewCase";
import { Checkout } from "../components/payment/Checkout";
import "./MainView.css";

export function MainView() {
  return (
    <div className="mainview-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newCase" element={<NewCase />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}
