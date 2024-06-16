import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AuthPage } from "../pages/auth/AuthPage";
import { CaseDetails } from "../pages/dashboard/CaseDetails";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Home } from "../pages/home/Home";
import { SinglePageView } from "../pages/singlePage/SinglePageView";
import { Checkout } from "../payment/Checkout";
import { FormFlow } from "../form/FormFlow";
import { LawyerPreForm } from "../form/LawyerPreForm";
import "./MainView.css";
import CaseStatusLayout from "../pages/casestatus/CaseStatusLayout";

export const PATH = {
  Home: "/",
  TermsOfService: "/termsofservice",
  PrivacyPolicy: "/privacypolicy",
  ContactUs: "/contactus",
  SignIn: "/signin",
  SignUp: "/signup",
  ForgotPassword: "/forgotpassword",
  ConfirmCode: "/confirmcode",
  AuthSuccess: "/authsuccess",
  Dashboard: "/dashboard",
  CaseStatus: "/casestatus/:id",
  CaseDetails: "/case/:id",
  Checkout: "/checkout",
  LawyerPreForm: "/lawyerNewCase",
  Others: "*",
};

export const RouterConfig = [
  {
    path: PATH.Home,
    element: <Home />,
    needLogin: false,
  },
  {
    path: PATH.TermsOfService,
    element: <SinglePageView type="termsofservice" />,
    needLogin: false,
  },
  {
    path: PATH.PrivacyPolicy,
    element: <SinglePageView type="privacypolicy" />,
    needLogin: false,
  },
  {
    path: PATH.ContactUs,
    element: <SinglePageView type="contactus" />,
    needLogin: false,
  },
  {
    path: PATH.SignIn,
    element: <AuthPage type="signin" />,
    needLogin: false,
  },
  {
    path: PATH.SignUp,
    element: <AuthPage type="signup" />,
    needLogin: false,
  },
  {
    path: PATH.ForgotPassword,
    element: <AuthPage type="forgotpassword" />,
    needLogin: false,
  },
  {
    path: PATH.ConfirmCode,
    element: <AuthPage type="confirmcode" />,
    needLogin: false,
  },
  {
    path: PATH.AuthSuccess,
    element: <AuthPage type="authsuccess" />,
    needLogin: false,
  },
  {
    path: PATH.Dashboard,
    element: <Dashboard />,
    needLogin: true,
  },
  {
    path: PATH.CaseStatus,
    element: <CaseStatusLayout />,
    needLogin: true,
  },
  {
    path: PATH.CaseDetails,
    element: <CaseDetails />,
    needLogin: true,
  },
  {
    path: PATH.Checkout,
    element: <Checkout />,
    needLogin: true,
  },
  {
    path: PATH.LawyerPreForm,
    element: <FormFlow isLawyer={true} lawyerNewCase={true} />,
    needLogin: true,
  },
  {
    path: PATH.Others,
    element: <Dashboard />,
    needLogin: true,
  },
];

export function MainView() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <div className="mainview-container">
      <Routes>
        {RouterConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.needLogin && !isLoggedIn ? (
                <AuthPage type="signin" />
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}
