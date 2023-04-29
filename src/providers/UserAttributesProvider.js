// UserAttributesProvider.js
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import UserAttributesContext from "../contexts/UserAttributesContext";

export const UserAttributesProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [twitterId, setTwitterId] = useState(null);
  const [twitterUsername, setTwitterUsername] = useState(null);
  const [twitterName, setTwitterName] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await Auth.currentUserInfo();
      console.log(`userInfo: ${JSON.stringify(userInfo)}`);
      if (userInfo === null) {
        setName(null);
        setEmail(null);
        setTwitterId(null);
        setTwitterName(null);
        setTwitterUsername(null);
      } else {
        setName(userInfo.attributes.name);
        setEmail(userInfo.attributes.email);
        setTwitterId(userInfo.attributes["custom:twitter_id"] ?? null);
        setTwitterName(userInfo.attributes["custom:twitter_name"] ?? null);
        setTwitterUsername(
          userInfo.attributes["custom:twitter_username"] ?? null
        );
      }
    };
    getUserInfo();
  }, []);

  return (
    <UserAttributesContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        twitterId,
        setTwitterId,
        twitterName,
        setTwitterName,
        twitterUsername,
        setTwitterUsername,
      }}
    >
      {children}
    </UserAttributesContext.Provider>
  );
};

// export default UserAttributesProvider;
