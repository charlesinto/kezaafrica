import React, { createContext, useContext } from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "../data/reducers";
import Analytics from "react-ga";
const GlobalContext = createContext();
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
export const useGlobalContext = () => useContext(GlobalContext);

export default function GlobalWrapper({ children }) {
  const APP_URI =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? "https://kezaafrica.herokuapp.com/v1"
      : process.env.REACT_APP_ENVIRONMENT === "staging"
      ? "https://kezaafrica-staging.herokuapp.com/v1"
      : // : "http://localhost:5000/v1";
        "http://localhost:3003/v1";

  const key =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? process.env.REACT_APP_MONO_PUBLIC_KEY
      : process.env.REACT_APP_ENVIRONMENT === "staging"
      ? process.env.REACT_APP_MONO_PUBLIC_KEY_TEST
      : "live_pk_WTmkgxtGC4D7GOI3OrYi";
  const conveneNumber = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "NGN",
  }).format;
  const reportAction = (category, action) => {
    if (process.env.NODE_ENV === "production") {
      Analytics.event({
        category,
        action,
      });
    }
  };
  const APP_SECRET = process.env.REACT_APP_PAYSTACK_APP_SECRET;
  return (
    <Provider store={store}>
      <GlobalContext.Provider
        value={{
          APP_URI,
          APP_SECRET,
          key,
          conveneNumber,
          reportAction,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </Provider>
  );
}
