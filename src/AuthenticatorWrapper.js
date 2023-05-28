import React, { useState, useEffect } from "react";
import { Authenticator, SignIn, SignUp, Greetings } from "aws-amplify-react";
import { Hub } from "aws-amplify";
import "./AuthenticatorWrapper.css";

const AuthenticatorWrapper = (props) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          setSignedIn(true);
          break;
        case "signOut":
          setSignedIn(false);
          break;
        default:
          break;
      }
    });

    return () => Hub.remove("auth");
  }, []);

  return (
    <Authenticator hide={[SignIn, SignUp, Greetings]}>
      {signedIn ? (
        <Greetings inGreeting="" outGreeting="" />
      ) : (
        <div className="auth-buttons">
          <SignIn />
          <SignUp />
        </div>
      )}
      {props.children}
    </Authenticator>
  );
};

export default AuthenticatorWrapper;
