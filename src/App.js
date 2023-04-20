import { Authenticator } from "@aws-amplify/ui-react";
import { Box, Button, Grid, GridItem, Heading } from "@chakra-ui/react"
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { EditBox } from "./component";

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
    <Box>
      <Button colorScheme="twitter" onClick={handleClick}>Twitter 連携</Button>
    </Box>
  );
}

function AppContainer() {
  const lines = []
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h='200px'
      gap='1'
      color='blackAlpha.800'
      fontWeight='bold'
      maxWidth='800px'
      margin='auto'
    >
      <GridItem pl='2' area={'header'}>
        <Heading>FGO 周回報告</Heading>
      </GridItem>
      <GridItem pl='2' area={'main'}>
        <Authenticator>
          {({ signOut, user }) => (
            <>
              <h1>Hello {user.username}</h1>
              <UserAttributes />
              <TwitterAccount />
              <EditBox questname="" runcount="0" lines={lines} />
              <Button mt={1} onClick={signOut}>Sign out</Button>
            </>
          )}
        </Authenticator>
      </GridItem>
      <GridItem pl='2' area={'footer'}>
        fgosc project
      </GridItem>
    </Grid>
  )
}

export default function App() {
  return (
    <AppContainer />
  );
}
