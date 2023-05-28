import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
// 既存の API Gateway を追加
config.aws_cloud_logic_custom.push({
  name: "twitter",
  // endpoint: "https://4j8usr5oma.execute-api.ap-northeast-1.amazonaws.com/prod",
  // endpoint: "https://qav1dnxun7.execute-api.ap-northeast-1.amazonaws.com/prod",
  endpoint: process.env.REACT_APP_TWITTER_ENDPOINT,
  region: "ap-northeast-1",
});
Amplify.configure(config);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
