import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        // ユーザーが認証されている場合、ホームページにリダイレクトします。
        navigate("/");
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
