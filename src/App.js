import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// import UserAttributesProvider from "./components/organisms/UserAttributesProvider";
// import QuestData from "./components/molecules/QuestData";
// import LayoutGrid from "./components/templates/LayoutGrid";

// function AppContainer() {
//   return (
//     <UserAttributesProvider>
//       <QuestData>
//         {({ questname, runs, lines, note }) => (
//           <Authenticator>
//             {({ signOut, user }) => (
//               <LayoutGrid
//                 signOut={signOut}
//                 questname={questname}
//                 runs={runs}
//                 lines={lines}
//                 note={note}
//               />
//             )}
//           </Authenticator>
//         )}
//       </QuestData>
//     </UserAttributesProvider>
//   );
// }

// export default function App() {
//   return <AppContainer />;
// }

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import theme from "./thema/thema";
import { Router } from "./router/Router";
import { ReportParamProvider } from "./providers/ReportParamProvider";

export default function App() {
  return (
    <ReportParamProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </ReportParamProvider>
  );
}
