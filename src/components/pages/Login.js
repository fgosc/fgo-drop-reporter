import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import UserAttributesContext from "../../contexts/UserAttributesContext";

const Login = () => {
  const {
    setName,
    setEmail,
    setTwitterId,
    setTwitterName,
    setTwitterUsername,
  } = useContext(UserAttributesContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        console.log(userInfo);
        // ユーザーが認証されている場合、ホームページにリダイレクトします。
        setName(userInfo.attributes.name);
        setEmail(userInfo.attributes.email);
        setTwitterId(userInfo.attributes["custom:twitter_id"] ?? null);
        setTwitterName(userInfo.attributes["custom:twitter_name"] ?? null);
        setTwitterUsername(
          userInfo.attributes["custom:twitter_username"] ?? null
        );
        navigate("/", { replace: true });
      } catch (error) {
        console.log("User is not authenticated:", error);
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div>
      <h1>ログインページ</h1>
      <p>ログイン後、ホームページにリダイレクトされます。</p>
    </div>
  );
};

export default withAuthenticator(Login, {
  includeGreetings: false,
});
