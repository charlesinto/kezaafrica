import * as api from "../api/auth";
import * as constants from "../constants/auth";

export const loginUser = (form, setInfo, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(form);
    if (data.ok) {
      setLoading(false);
      dispatch({
        type: constants.LOGIN_USER,
        data: data.data,
      });
    }
  } catch ({ response, message }) {
    setLoading(false);
    setInfo({
      message: response ? response.data.message : message,
      status: "error",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await api.logoutUser();
    dispatch({ type: constants.LOGOUT_USER });
  } catch ({ response, message }) {
    console.log(response ? response.data.message : message);
  }
};

export const forgotPassword =
  (identifier, setInfo, setLoading) => async (dispatch) => {
    try {
      const { data } = await api.forgotPassword(identifier);
      dispatch({ type: constants.FORGOT_PASSWORD, data: data.data });
      setLoading(false);
      setInfo({ message: data.message, status: "success" });
    } catch ({ response, message }) {
      setLoading(false);
      setInfo({
        message: response ? response.data.message : message,
        status: "error",
      });
    }
  };

export const verifyOtp =
  (otp, setInfo, setLoading, setIsVerified) => async (dispatch) => {
    try {
      const { data } = await api.verifyOtp(otp);
      dispatch({ type: constants.VERIFY_OTP, data: data.data });
      setLoading(false);
      setInfo({ message: data.message, status: "success" });
      setIsVerified(true);
    } catch ({ response, message }) {
      setLoading(false);
      setInfo({
        message: response ? response.data.message : message,
        status: "error",
      });
    }
  };

export const resetPassword =
  (form, setInfo, setLoading) => async (dispatch) => {
    try {
      const { data } = await api.resetPassword(form);
      setLoading(false);
      dispatch({ type: constants.RESET_PASSWORD, data: data.data });
    } catch ({ response, message }) {
      setLoading(false);
      setInfo({
        message: response ? response.data.message : message,
        status: "error",
      });
    }
  };
