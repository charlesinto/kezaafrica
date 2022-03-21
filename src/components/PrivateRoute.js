import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN } from "../data/constants";
const PrivateRoute = ({ children }) => {
  const history = useHistory();
  const payload = localStorage.getItem(ACCESS_TOKEN);
  const token = payload ? JSON.parse(payload) : null;
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token, history]);
  return <>{children}</>;
};

export default PrivateRoute;
