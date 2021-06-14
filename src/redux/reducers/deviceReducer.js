import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  devices: [],
  loading: true,
  error: "",
  deleteDevice: {},
};

export const deviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DEVICES:
      return {
        ...state,
        loading: false,
        devices: payload,
        error: "",
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ActionTypes.DELETE_DEVICE:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case ActionTypes.FILTER_DEVICES:
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== payload),
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};
