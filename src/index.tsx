import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Redux/Reducers/rootReducer";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initialState } from "./Redux/Reducers/handleBoardList";

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
