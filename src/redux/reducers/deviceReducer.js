import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  devices: [],
  loading: true,
  error: "",
  status: ""
};

export const deviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DEVICES:
      return {
        ...state,
        loading: false,
        devices: payload,
        error: "",
        status: "set"
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        status: "error"
      };
    case ActionTypes.DELETE_DEVICE:
      return {
        ...state,
        loading: false,
        error: "",
        status: "deleted"
      };
    case ActionTypes.CREATE_DEVICE:
      return {
        ...state,
        loading: false,
        error: "",
        status: "created"
      };
    case ActionTypes.EDIT_DEVICE:
      return {
        ...state,
        loading: false,
        error: "",
        status: "edited"
      };
    case ActionTypes.FILTER_DEVICES:
      return {
        ...state,
        devices: state.devices.filter((device) => device.type === payload),
        loading: false,
        error: "",
        status: "filtered"
      };
    default:
      return state;
  }
};
