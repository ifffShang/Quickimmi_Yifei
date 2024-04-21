import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../components/pages/auth/AuthPage";
import { CaseDetails } from "../components/pages/case/CaseDetails";
import { Dashboard } from "../components/pages/dashboard/Dashboard";
import { Home } from "../components/pages/home/Home";
import { SinglePageView } from "../components/pages/singlePage/SinglePageView";
import { TestPageView } from "../components/pages/singlePage/Test";
import { Checkout } from "../components/payment/Checkout";
import "./MainView.css";

export const PATH = {
  Home: "/",
  SignIn: "/signin",
  SignUp: "/signup",
  ForgotPassword: "/forgotpassword",
  ConfirmCode: "/confirmcode",
  AuthSuccess: "/authsuccess",
  Dashboard: "/dashboard",
  CaseDetails: "/casedetails",
  Checkout: "/checkout",
  TermsOfService: "/termsofservice",
  PrivacyPolicy: "/privacypolicy",
  ContactUs: "/contactus",
  Test: "/test",
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
        <Route
          path={PATH.AuthSuccess}
          element={<AuthPage type="authsuccess" />}
        />
        <Route path={PATH.Dashboard} element={<Dashboard />} />
        <Route path={PATH.CaseDetails} element={<CaseDetails />} />
        <Route path={PATH.Checkout} element={<Checkout />} />
        <Route
          path={PATH.TermsOfService}
          element={<SinglePageView type="termsofservice" />}
        />
        <Route
          path={PATH.PrivacyPolicy}
          element={<SinglePageView type="privacypolicy" />}
        />
        <Route
          path={PATH.ContactUs}
          element={<SinglePageView type="contactus" />}
        />
        <Route path={PATH.Test} element={<TestPageView />} />
      </Routes>
    </div>
  );
}
