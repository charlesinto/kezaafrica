import React from "react";
import Analytics from "react-ga";
import { useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../data/constants";
import { useDispatch } from "react-redux";
import { getUser } from "../data/actions/user";
const Wrapper = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const payload = localStorage.getItem(ACCESS_TOKEN);
  const token = payload ? JSON.parse(payload) : null;
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Analytics.initialize(process.env.REACT_APP_TRACKING_CODE);
      Analytics.pageview(`${location.pathname}${location.search}`);
    }
  }, [location]);
  React.useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token, dispatch]);
  return <>{children}</>;
};

export default Wrapper;
