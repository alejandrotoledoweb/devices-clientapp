import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnahncer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const myStore = createStore(composeEnahncer(applyMiddleware(thunk)));

export default myStore;
