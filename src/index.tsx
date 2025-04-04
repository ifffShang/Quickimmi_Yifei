import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./app/store";
import "./index.css";
import "./locales/i18n";
import reportWebVitals from "./reportWebVitals";
import { pdfjs } from "react-pdf";
import { Amplify } from "aws-amplify";
import { Role } from "./consts/consts";

const userRole = localStorage.getItem("userRole") || Role.LAWYER;
const userPoolId =
  userRole === Role.LAWYER ? process.env.REACT_APP_LAWYER_POOL_ID : process.env.REACT_APP_CUSTOMER_POOL_ID;
const userPoolClientId =
  userRole === Role.LAWYER
    ? process.env.REACT_APP_LAWYER_POOL_APP_CLIENT_ID
    : process.env.REACT_APP_CUSTOMER_POOL_APP_CLIENT_ID;

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: userPoolId!,
      userPoolClientId: userPoolClientId!,
    },
  },
});

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
