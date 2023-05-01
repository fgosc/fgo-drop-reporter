// UserAttributesProvider.js
import { useState, useEffect } from "react";
import { Amplify, Auth } from "aws-amplify";
import UserAttributesContext from "../contexts/UserAttributesContext";

export const UserAttributesProvider = ({ children }) => {
  const [cognitoId, setCognitoId] = useState(null);
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
        setCognitoId(null);
        setName(null);
        setEmail(null);
        setTwitterId(null);
        setTwitterName(null);
        setTwitterUsername(null);
        Amplify.configure({
          aws_appsync_authenticationType: "API_KEY",
        });
      } else {
        setCognitoId(userInfo.username);
        setName(userInfo.attributes.name);
        setEmail(userInfo.attributes.email);
        setTwitterId(userInfo.attributes["custom:twitter_id"] ?? null);
        setTwitterName(userInfo.attributes["custom:twitter_name"] ?? null);
        setTwitterUsername(
          userInfo.attributes["custom:twitter_username"] ?? null
        );
        Amplify.configure({
          aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
        });
      }
    };
    getUserInfo();
  }, []);

  return (
    <UserAttributesContext.Provider
      value={{
        cognitoId,
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
