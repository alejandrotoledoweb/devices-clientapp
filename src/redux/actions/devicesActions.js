import apiUrl from "../constants/apiUrl";
import ActionTypes from "../constants/actionTypes";

export const set_Error = (actionType, error) => ({
  type: actionType,
  payload: error.message,
});

export const setDevices = (devices) => ({
  type: ActionTypes.SET_DEVICES,
  payload: devices,
});

export const fetchDevices = () => async (dispatch) => {
  try {
    const response = await apiUrl.get("/devices");
    dispatch({ type: ActionTypes.SET_DEVICES, payload: response.data });
  } catch (error) {
    dispatch(set_Error(ActionTypes.SET_ERROR, error));
  }
};

export const deleteDevice = (id) => async (dispatch) => {
  try {
    const response = await apiUrl.delete(`/devices/${id}`);
    dispatch({ type: ActionTypes.DELETE_DEVICE, payload: response.data });
    dispatch({ type: ActionTypes.FILTER_DEVICES, payload: id });
  } catch (error) {
    dispatch(set_Error(ActionTypes.SET_ERROR, error));
  }
};

export const addDevice = (data) => async (dispatch) => {
  try {
    const response = await apiUrl.post("/devices", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: ActionTypes.CREATE_DEVICE, payload: response.data });
  } catch (error) {
    dispatch(set_Error(ActionTypes.SET_ERROR, error));
  }
};
