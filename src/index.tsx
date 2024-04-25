import { Amplify } from "aws-amplify";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./app/store";
import awsExports from "./aws-exports";
import "./index.css";
import "./locales/i18n";
import reportWebVitals from "./reportWebVitals";

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: awsExports.USER_POOL_ID,
      userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID,
    },
  },
});

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
