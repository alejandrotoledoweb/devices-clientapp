import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Routes from "./routes";
import { Provider } from "react-redux";
import { myStore } from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
