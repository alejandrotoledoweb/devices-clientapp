import { combineReducers } from "redux";
import { deviceReducer } from "./deviceReducer";

export const AppReducer = combineReducers({
  allDevices: deviceReducer,
});

export default AppReducer;
