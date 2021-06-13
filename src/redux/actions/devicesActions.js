import apiUrl from "../constants/apiUrl";
import ActionTypes from "../constants/actionTypes";

export const requestPending = (actionType) => ({
  type: actionType,
});

export const setError = (actionType, error) => ({
  type: actionType,
  payload: error,
});

export const setDevices = (devices) => ({
  type: ActionTypes.SET_DEVICES,
  payload: devices,
});

export const fetchDevices = () => async (dispatch) => {
  try {
    dispatch(requestPending(ActionTypes.FETCH_DEVICES));
    apiUrl.get("/devices").then((response) => {
      if (response.status === 200) {
        dispatch(setDevices(response.data));
      }
    }).catch((error) => {
      dispatch(setError(ActionTypes.SET_ERROR, error.message));
    })
  } catch (error) {
    dispatch(requestFailure(ActionTypes.SET_ERROR, error.message));
  }
};






export const fetchRestaurantsSuccess = (restaurants) => ({
  type: FETCH_RESTAURANTS_SUCCESS,
  payload: restaurants,
});

export const fetchRestaurants = () => (dispatch) => {
  try {
    dispatch(requestPending(FETCH_RESTAURANTS_PENDING));
    Axios.get(`${API_URL}/restaurants`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchRestaurantsSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(SET_ERROR, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(SET_ERROR, error.message));
  }
};
