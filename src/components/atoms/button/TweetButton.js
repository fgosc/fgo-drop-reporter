// TweetButton.js
import React from "react";
import { Button } from "@chakra-ui/react";

function TweetButton(props) {
  const handleClick = () => {
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      props.reportText
    )}`;
    window.open(tweetURL, "_blank");
  };
  // 報告が投稿されたらツイート可能
  const disabled = !props.reportPosted;
  return (
    <Button
      size="sm"
      colorScheme="twitter"
      onClick={handleClick}
      isDisabled={disabled}
    >
      ツイートする
    </Button>
  );
}

export default TweetButton;
