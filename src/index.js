import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
// 既存の API Gateway を追加
config.API = {
  endpoints: [
    {
      name: "twitter",
      endpoint:
        "https://4j8usr5oma.execute-api.ap-northeast-1.amazonaws.com/prod",
    },
  ],
};
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
