import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { API, Auth } from "aws-amplify";

function TwitterAccount(props) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
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
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Box>
      <Button colorScheme="twitter" onClick={handleClick} isLoading={loading}>
        Twitter 連携
      </Button>
    </Box>
  );
}

export default TwitterAccount;
