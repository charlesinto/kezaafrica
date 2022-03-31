import * as api from "../api/application";
import * as constants from "../constants/application";

export const getApplication = (agent) => async (dispatch) => {
  try {
    const { data } = await api.getApplication(agent);
    if (data.ok) {
      dispatch({
        type: constants.FETCH_APPLICATION,
        data: data.data,
      });
    }
  } catch ({ response, message }) {
    console.log(response ? response.data.message : message);
  }
};

export const initiateApplication = (form) => async (dispatch) => {
  try {
    const { data } = await api.initiateApplication(form);
    if (data.ok) {
      dispatch({
        type: constants.INITIATE_APPLICATION,
        data: data.data,
      });
    }
  } catch ({ response, message }) {
    console.log(response ? response.data.message : message);
  }
};

export const uploadApplicationFile =
  (form, proceedAction, setInfo, setLoading, setLoadingValue) =>
  async (dispatch) => {
    try {
      const { data } = await api.uploadApplicationFile(form, setLoadingValue);
      if (data.ok) {
        dispatch({
          type: constants.UPLOAD_APPLICATION_FILE,
          data: data.data,
        });
        proceedAction && proceedAction();
        setLoading(false);
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

export const createApplication =
  (form, setLoading, setSuccess, setInfo) => async (dispatch) => {
    try {
      const { data } = await api.createApplication(form);
      if (data.ok) {
        setLoading(false);
        setSuccess(true);
        dispatch({
          type: constants.CREATE_APPLICATION,
          data: data.data,
        });
      }
    } catch ({ response, message }) {
      setInfo({
        message: response ? response.data.message : message,
        status: "error",
      });
    }
  };

export const updateApplication =
  (form, setLoading, proceedAction) => async (dispatch) => {
    try {
      const { data } = await api.updateApplication(form);
      if (data.ok) {
        setLoading && setLoading(false);
        dispatch({
          type: constants.UPDATE_APPLICATION,
          data: data.data,
        });
        proceedAction && proceedAction(true, data.message);
      }
    } catch ({ response, message }) {
      setLoading && setLoading(false);
      proceedAction
        ? proceedAction(false, response ? response.data.message : message)
        : console.log(response ? response.data.message : message);
    }
  };
