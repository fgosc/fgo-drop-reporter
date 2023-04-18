import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import { useEffect, useState } from "react";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// NOTE: サンプルプロジェクトなのですべての属性を表示しているが、
// 実運用においては必要な属性のみを利用、表示すること。
function UserAttributes(props) {
  const [userAttributes, setUserAttributes] = useState({});
  useEffect(() => {
    const runOnce = async () => {
      // このチェックを入れないと Auth.currentUserInfo() が
      // 何度も呼ばれて throttling されてしまう。
      if (!isEmpty(userAttributes)) {
        return;
      }

      // 基本属性であれば user.username のように user オブジェクトの
      // 属性として参照可能だが、カスタム属性については
      // Auth.currentUserInfo() で取得する必要がある。
      // https://aws.amazon.com/jp/blogs/mobile/aws-amplify-adds-support-for-custom-attributes-in-amazon-cognito-user-pools/
      const userInfo = await Auth.currentUserInfo();
      console.log(`userInfo: ${JSON.stringify(userInfo)}`);
      setUserAttributes(userInfo.attributes);
    };
    runOnce();
  });
  return (
    <ul>
      {Object.keys(userAttributes).map((key) => (
        <li key={key}>
          <b>{key}</b> {userAttributes[key]}
        </li>
      ))}
    </ul>
  );
}

function TwitterAccount(props) {
  async function handleClick() {
    try {
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      // /preauth の認証のため cognito の idToken を渡す
      const options = {
        headers: {
          Authorization: idToken,
        },
        queryStringParameters: {
          callback: window.location.href,
        },
      };
      const resp = await API.get("twitter", "/preauth", options);
      console.log(`resp: ${JSON.stringify(resp)}`);
      if (resp.token) {
        // redirect to oauth handler
        const endpoint = await API.endpoint("twitter");
        const oauth_url = `${endpoint}/twitter_auth?token=${encodeURIComponent(
          resp.token
        )}`;
        console.log(oauth_url);
        window.location.href = oauth_url;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Twitter 連携</button>
    </div>
  );
}

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <UserAttributes />
          <TwitterAccount />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
