import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./api/Redux/Reducers/rootReducer";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer)}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
