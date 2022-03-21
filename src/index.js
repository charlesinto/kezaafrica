import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalWrapper from "./context/global";
ReactDOM.render(
  <GlobalWrapper>
    <App />
  </GlobalWrapper>,
  document.getElementById("root")
);
