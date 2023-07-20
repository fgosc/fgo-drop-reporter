import "@aws-amplify/ui-react/styles.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import theme from "./thema/thema";
import { Router } from "./router/Router";
import { UserAttributesProvider } from "./providers/UserAttributesProvider";
import { ReportParamProvider } from "./providers/ReportParamProvider";

export default function App() {
  return (
    <UserAttributesProvider>
      <ReportParamProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ChakraProvider>
      </ReportParamProvider>
    </UserAttributesProvider>
  );
}
