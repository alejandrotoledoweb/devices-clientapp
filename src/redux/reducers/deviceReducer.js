import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  devices: [],
  loading: true,
  error: "",
  status: "",
};

export const deviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DEVICES:
      return {
        ...state,
        loading: false,
        devices: payload,
        error: "",
        status: "set",
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        status: "error",
      };
    case ActionTypes.DELETE_DEVICE:
      return {
        ...state,
        loading: false,
        error: "",
        status: "deleted",
      };
    case ActionTypes.FILTER_DEVICES:
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== payload),
        loading: false,
        error: "",
        status: "filtered",
      };
    case ActionTypes.CREATE_DEVICE:
      return {
        ...state,
        loading: false,
        error: "",
        status: "created",
      };
    default:
      return state;
  }
};
