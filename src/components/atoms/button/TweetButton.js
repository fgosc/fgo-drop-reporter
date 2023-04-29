// TweetButton.js
import { memo } from "react";
import { Button } from "@chakra-ui/react";

const TweetButton = memo(function TweetButton({ reportText, reportPosted }) {
  const handleClick = () => {
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      reportText
    )}`;
    window.open(tweetURL, "_blank");
  };
  // 報告が投稿されたらツイート可能
  const disabled = !reportPosted;
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
});

export default TweetButton;
