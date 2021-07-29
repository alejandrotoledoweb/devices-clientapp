import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { AppReducer } from "../reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

export const myStore = createStore(
  AppReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default myStore;
