import apiUrl from "../constants/apiUrl";
import ActionTypes from "../constants/actionTypes";

export const set_Error = (actionType, error) => ({
  type: actionType,
  payload: error.message
});

export const setDevices = (devices) => ({
  type: ActionTypes.SET_DEVICES,
  payload: devices
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
    dispatch({ type: ActionTypes.POST_REQUEST });
    const response = await apiUrl.post("/devices", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    dispatch({ type: ActionTypes.CREATE_DEVICE, payload: response.data });
  } catch (error) {
    dispatch(set_Error(ActionTypes.SET_ERROR, error));
  }
};

export const editDevice = (data) => async (dispatch) => {
  try {
    const body = {
      system_name: data.system_name,
      type: data.type,
      hdd_capacity: data.hdd_capacity
    };

    const headers = {
      "Content-Type": "application/json"
    };
    const response = await apiUrl.put(`/devices/${data.id}`, body, { headers });
    dispatch({ type: ActionTypes.EDIT_DEVICE, payload: response.data });
    try {
      const response = await apiUrl.get("/devices");
      dispatch({ type: ActionTypes.SET_DEVICES, payload: response.data });
    } catch (error) {
      dispatch(set_Error(ActionTypes.SET_ERROR, error));
    }
  } catch (error) {
    dispatch(set_Error(ActionTypes.SET_ERROR, error));
  }
};

export const set_filter = (filter) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_FILTER, payload: filter });
}
export const set_sort = (sort) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_DEVICES, payload: sort });
}
