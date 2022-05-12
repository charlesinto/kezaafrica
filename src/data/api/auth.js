import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

export const APP_URI =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "https://kezaafrica.herokuapp.com/v1"
    : process.env.REACT_APP_ENVIRONMENT === "staging"
    ? "https://kezaafrica-staging.herokuapp.com/v1"
    : // : "http://localhost:5000/v1";
      "http://localhost:3003/v1";

const api = axios.create({ baseURL: `${APP_URI}/auth/` });

api.defaults.withCredentials = true;

api.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = async (form) => {
  return api.post("/login-user", form);
};
export const logoutUser = async () => {
  return api.delete("/logout-user");
};

export const forgotPassword = async (identifier) => {
  return api.post("/forgot-password", {
    identifier,
    agent: window.navigator.userAgent,
  });
};

export const verifyOtp = async (otp) => {
  return api.post("/verify-otp", { otp });
};

export const resetPassword = async (form) => {
  return api.post("/reset-password", form);
};
