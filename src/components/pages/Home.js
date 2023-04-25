import { memo } from "react";

// import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import QuestData from "../../components/molecules/QuestData";
import LayoutGrid from "../../components/templates/LayoutGrid";

export const Home = memo(() => {
  return (
    <QuestData>
      {({ questname, runs, lines, note }) => (
        // <Authenticator>
        // {({ signOut, user }) => (
        <LayoutGrid
          // signOut={signOut}
          questname={questname}
          runs={runs}
          lines={lines}
          note={note}
        />
        // )}
        // </Authenticator>
      )}
    </QuestData>
  );
});

// import React, { useState, useEffect } from "react";
// import { Auth } from "aws-amplify";

// const Home = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const currentUser = await Auth.currentAuthenticatedUser();
//         setUser(currentUser);
//       } catch (error) {
//         console.log("User is not authenticated:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <h1>ホーム画面</h1>
//       {user ? (
//         <p>こんにちは、{user.username} さん。ログイン状態です。</p>
//       ) : (
//         <p>こんにちは、ゲストさん。ログインしていません。</p>
//       )}
//     </div>
//   );
// };

// export default Home;
