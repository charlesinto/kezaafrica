import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import applicationsApi from "../api/application";
const APP_URI =
  process.env.NODE_ENV === "production"
    ? "https://kezaafrica.herokuapp.com/v1"
    : "http://localhost:5000/v1";

const api = axios.create({ baseURL: `${APP_URI}/users/` });

api.defaults.withCredentials = true;

api.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const getUser = async () => {
  return api.get("/get-user");
};

export const getUserApplications = async (id) => {
  return applicationsApi.get(`get-user-applications/${id}`);
};

export const deleteApplication = async (id) => {
  return applicationsApi.delete(`delete-application/${id}`);
};

export const connectMono = async (form) => {
  return api.post("/connect-mono", form);
};

export const updateUser = async (form) => {
  return api.put("/update-user", form);
};
