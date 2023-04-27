// UserAttributesProvider.js
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import UserAttributesContext from "../contexts/UserAttributesContext";

export const UserAttributesProvider = ({ children }) => {
  const [userAttributes, setUserAttributes] = useState({});

  useEffect(() => {
    const runOnce = async () => {
      const userInfo = await Auth.currentUserInfo();
      console.log(`userInfo: ${JSON.stringify(userInfo)}`);
      setUserAttributes(userInfo.attributes);
    };
    runOnce();
  }, []);

  return (
    <UserAttributesContext.Provider value={userAttributes}>
      {children}
    </UserAttributesContext.Provider>
  );
};

// export default UserAttributesProvider;
