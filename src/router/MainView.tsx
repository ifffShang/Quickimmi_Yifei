import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { Home } from "../components/pages/home/Home";
import { NewCase } from "../components/pages/newCase/NewCase";
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
