import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
const APP_URI =
  process.env.NODE_ENV === "production"
    ? "https://kezaafrica.herokuapp.com/v1"
    : "http://localhost:5000/v1";

const api = axios.create({ baseURL: `${APP_URI}/applications/` });

api.defaults.withCredentials = true;

api.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export const getApplication = async (agent) => {
  return api.get(`/get-application/${agent}`);
};

export const initiateApplication = async (form) => {
  return api.post("/initiate-application", form);
};

export const uploadApplicationFile = async (form) => {
  return api.post("/upload-application-file", form);
};

export const createApplication = async (form) => {
  return api.post("/create-application", form);
};

export const updateApplication = async (form) => {
  return api.put("/update-application", form);
};

export default api;
