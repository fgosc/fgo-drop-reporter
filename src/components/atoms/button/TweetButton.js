// TweetButton.js
import React from "react";
import { Box, Button } from "@chakra-ui/react";

class TweetButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      this.props.reportText
    )}`;
    window.open(tweetURL, "_blank");
  }

  render() {
    const tweetButton = (
      <Button size="sm" colorScheme="twitter" onClick={this.handleClick}>
        ツイートする
      </Button>
    );
    return <Box mt={1}>{tweetButton}</Box>;
  }
}

export default TweetButton;
