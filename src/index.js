import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
export default ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
