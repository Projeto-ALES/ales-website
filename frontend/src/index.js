import React from "react";
import ReactDOM from "react-dom";

import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { Store } from "./store/store.js";

import ReactGA from "react-ga";

ReactGA.initialize("UA-174464399-1");
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
