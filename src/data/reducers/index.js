import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import application from "./application";

export default combineReducers({
  user,
  auth,
  application,
});
