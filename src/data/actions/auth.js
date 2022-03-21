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
