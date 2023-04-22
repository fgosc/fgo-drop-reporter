// QuestNameEditor.js

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FormLabel, Input } from "@chakra-ui/react";

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
          <Input
            type="text"
            isInvalid
            value={questname}
            onChange={this.handleChange}
          />
          <Text color="red" as="b">
            周回場所を入力してください。
          </Text>
        </Box>
      );
    }
    const pos = questname.replace(/　/g, " ").trim().indexOf(" ");
    if (pos < 0) {
      return (
        <Box className="control">
          <Input
            type="text"
            className="input is-small is-info"
            value={questname}
            onChange={this.handleChange}
          />
          <Text className="help is-info">
            「剣の修練場 超級」「オケアノス
            豊かな海」のようにスペースで区切る記述を推奨します。
          </Text>
        </Box>
      );
    }
    return (
      <Box className="control has-icons-right">
        <Input
          type="text"
          className="input is-small is-success"
          value={questname}
          onChange={this.handleChange}
        />
        <Text size="small">
          <i className="fas fa-check"></i>
        </Text>
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
