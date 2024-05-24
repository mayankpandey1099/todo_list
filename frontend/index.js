import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./components/style.css";
// import { AuthProvider } from "./components/AuthContext";

import { Provider } from "react-redux";
import { store } from "./utils/Store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
