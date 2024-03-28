import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { Home } from "../components/pages/home/Home";
import { NewCase } from "../components/pages/newCase/NewCase";
import { Checkout } from "../components/payment/Checkout";
import "./MainView.css";
import { SignIn } from "../components/pages/auth/SignIn";
import { AuthPage } from "../components/pages/auth/AuthPage";

export function MainView() {
  return (
    <div className="mainview-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<AuthPage type="signin" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newcase" element={<NewCase />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}
