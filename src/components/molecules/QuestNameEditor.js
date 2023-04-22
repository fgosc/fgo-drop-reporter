// QuestNameEditor.js

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const defaultQuestName = "(クエスト名)";

class QuestNameEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onQuestNameChange(event.target.value);
  }

  buildInputNode(questname) {
    if (questname === defaultQuestName || questname.trim().length === 0) {
      return (
        <Box className="control">
          <InputGroup>
            <Input
              isInvalid
              value={questname}
              onChange={this.handleChange}
            />
          </InputGroup>
          <Text color="red" as="b">
              周回場所を入力してください。
          </Text>
        </Box>
      );
    }
    return (
      <Box className="control has-icons-right">
        <InputGroup>
          <Input
            type="text"
            className="input is-small is-success"
            value={questname}
            onChange={this.handleChange}
          />
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        </InputGroup>
      </Box>
    );
  }

  render() {
    const questname = this.props.questname;
    const node = this.buildInputNode(questname);
    return (
      <Box className="field">
        <FormLabel className="label">周回場所</FormLabel>
        {node}
      </Box>
    );
  }
}

export default QuestNameEditor;
