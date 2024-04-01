import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../components/pages/auth/AuthPage";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { Home } from "../components/pages/home/Home";
import { NewCase } from "../components/pages/newCase/NewCase";
import { Checkout } from "../components/payment/Checkout";
import "./MainView.css";

export const PATH = {
  Home: "/",
  SignIn: "/signin",
  SignUp: "/signup",
  ForgotPassword: "/forgotpassword",
  ConfirmCode: "/confirmcode",
  Dashboard: "/dashboard",
  NewCase: "/newcase",
  Checkout: "/checkout",
};

export function MainView() {
  return (
    <div className="mainview-container">
      <Routes>
        <Route path={PATH.Home} element={<Home />} />
        <Route path={PATH.SignIn} element={<AuthPage type="signin" />} />
        <Route path={PATH.SignUp} element={<AuthPage type="signup" />} />
        <Route
          path={PATH.ForgotPassword}
          element={<AuthPage type="forgotpassword" />}
        />
        <Route
          path={PATH.ConfirmCode}
          element={<AuthPage type="confirmcode" />}
        />
        <Route path={PATH.Dashboard} element={<Dashboard />} />
        <Route path={PATH.NewCase} element={<NewCase />} />
        <Route path={PATH.Checkout} element={<Checkout />} />
      </Routes>
    </div>
  );
}
