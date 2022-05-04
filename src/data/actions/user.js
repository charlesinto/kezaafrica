import * as api from "../api/user";
import * as constants from "../constants/user";

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.getUser();
    if (data.ok) {
      dispatch({ type: constants.FETCH_USER, data: data.data });
    }
  } catch ({ response, message }) {
    console.log(response ? response.data.message : message);
  }
};

export const getUserApplications = (id, setIsLoaded) => async (dispatch) => {
  try {
    const { data } = await api.getUserApplications(id);
    if (data.ok) {
      dispatch({
        type: constants.FETCH_USER_APPLICATIONS,
        data: data.data,
      });
      setIsLoaded(true);
    }
  } catch ({ response, message }) {
    setIsLoaded(true);
    console.log(response ? response.data.message : message);
  }
};

export const connectMono =
  (form, setInfo, setLoading, setProgress) => async (dispatch) => {
    try {
      const { data } = await api.connectMono(form);
      if (data.ok) {
        setLoading(false);
        dispatch({ type: constants.CONNECT_MONO, data: data.data });
        setInfo({ message: data.message, status: "success" });
        if (setProgress)
          setProgress((state) => ({ ...state, bankStatement: 100 }));
      }
    } catch ({ response, message }) {
      setLoading(false);
      setInfo({
        message: response ? response.data.message : message,
        status: "error",
      });
    }
  };

export const updateUser = (form, setInfo, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(form);
    if (data.ok) {
      setLoading(false);
      dispatch({ type: constants.UPDATE_USER, data: data.data });
      setInfo({ message: data.message, status: "success" });
    }
  } catch ({ response, message }) {
    setLoading(false);
    setInfo({
      message: response ? response.data.message : message,
      status: "error",
    });
  }
};

export const deleteApplication =
  (id, setLoading, setIsLoaded) => async (dispatch) => {
    try {
      await api.deleteApplication(id);
      setLoading && setLoading(false);
      dispatch({
        type: constants.DELETE_APPLICATION,
        data: { id },
      });
      setIsLoaded && setIsLoaded(true);
    } catch ({ response, message }) {
      setLoading && setLoading(false);
      setIsLoaded && setIsLoaded(true);
      console.log(response ? response.data.message : message);
    }
  };
