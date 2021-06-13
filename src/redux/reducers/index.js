import { combineReducers } from "redux";
import { deviceReducer } from "./deviceReducer";

const AppReducer = combineReducers({
  allDevices: deviceReducer,
});

export default AppReducer;
