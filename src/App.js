import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import UserAttributesProvider from "./components/organisms/UserAttributesProvider";
import QuestData from "./components/molecules/QuestData";
import LayoutGrid from "./components/templates/LayoutGrid";

function AppContainer() {
  return (
    <UserAttributesProvider>
      <QuestData>
        {({ questname, runs, lines }) => (
          <Authenticator>
            {({ signOut, user }) => (
              <LayoutGrid
                signOut={signOut}
                questname={questname}
                runs={runs}
                lines={lines}
              />
            )}
          </Authenticator>
        )}
      </QuestData>
    </UserAttributesProvider>
  );
}

export default function App() {
  return <AppContainer />;
}
