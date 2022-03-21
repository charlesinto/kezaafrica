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
    process.env.NODE_ENV === "production"
      ? "https://kezaafrica.herokuapp.com/v1"
      : "http://localhost:5000/v1";
  const key = process.env.MONO_PUBLIC_KEY || "test_pk_pFD3ozQvEqK5KgBBWrjm";
  const conveneNumber = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "NGN",
  }).format;
  const reportAction = (category, action) => {
    Analytics.event({
      category,
      action,
    });
  };
  const APP_SECRET =
    process.env.PAYSTACK_APP_SECRET ||
    "sk_test_8a0695a67eaaa2dfe8761d81cf0a1acd7122dd8a";
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
