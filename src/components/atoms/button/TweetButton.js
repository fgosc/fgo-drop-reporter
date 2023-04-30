// TweetButton.js
import { memo, useContext } from "react";
import { Button } from "@chakra-ui/react";
import ReportParamContext from "../../../contexts/ReportParamContext";

const TweetButton = memo(function TweetButton({ reportText }) {
  const { isTweetButtonEnabled } = useContext(ReportParamContext);
  const handleClick = () => {
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      reportText
    )}`;
    window.open(tweetURL, "_blank");
  };
  // 報告が投稿されたらツイート可能
  return (
    <Button
      size="sm"
      colorScheme="twitter"
      onClick={handleClick}
      isDisabled={!isTweetButtonEnabled}
    >
      ツイートする
    </Button>
  );
});

export default TweetButton;
