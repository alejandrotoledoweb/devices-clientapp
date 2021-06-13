import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  devices: [],
  loading: true,
  error: "",
};

export const deviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_DEVICES:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SET_DEVICE:
      return {
        ...state,
        loading: false,
        devices: payload,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
