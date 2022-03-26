import { ACCESS_TOKEN, PASSWORD_IDENTIFIER } from "../constants";
import * as constants from "../constants/auth";
const authReducer = (user = null, action) => {
  const { type, data } = action;
  switch (type) {
    case constants.LOGIN_USER:
    case constants.RESET_PASSWORD:
      sessionStorage.removeItem(PASSWORD_IDENTIFIER);
      localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data.token));
      window.location.replace("/dashboard");
      return user;
    case constants.FORGOT_PASSWORD:
      sessionStorage.setItem(PASSWORD_IDENTIFIER, data.identifier);
      return user;
    case constants.LOGOUT_USER:
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.replace("/");
      return null;
    default:
      return user;
  }
};

export default authReducer;
