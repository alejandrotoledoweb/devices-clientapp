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
        status: "set",
        filter: "All"
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
    case ActionTypes.POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        status: "requested"
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
        devices: state.devices.filter((device) => device.id !== payload),
        loading: false,
        error: "",
        status: "filtered",
        filter: "All"
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        devices: state.devices.filter((device) => device.type === payload),
        loading: false,
        error: "",
        status: "filtered",
        filter: payload
      };
    case ActionTypes.SET_SORT: {
      if (payload === "Sorted by: All") {
        return {
          ...state,
        devices: state.devices,
        loading: false,
        error: "",
        status: "sorted",
        sort: payload
        }
      } else if (payload === 'system_name') {
        return {
          ...state,
          devices: state.devices.sort((a, b) =>
          a.system_name > b.system_name ? 1 : -1),
          loading: false,
          error: "",
          status: "sorted",
          sort: payload
        };
      } else {
        return {
          ...state,
          devices: state.devices.sort((a, b) =>
          parseInt(a.hdd_capacity) > parseInt(b.hdd_capacity) ? 1 : -1),
          loading: false,
          error: "",
          status: "sorted",
          sort: payload
        };
      }
    }
    default:
      return state;
  }
};
