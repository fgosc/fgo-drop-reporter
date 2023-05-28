// QuestNameEditor.js

import { memo, useCallback } from "react";
import {
  Box,
  Text,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const defaultQuestName = "(クエスト名)";

const QuestNameEditor = memo(({ onQuestNameChange, questname }) => {
  const handleChange = useCallback(
    (event) => {
      onQuestNameChange(event.target.value);
    },
    [onQuestNameChange]
  );

  const buildInputNode = (questname) => {
    if (questname === defaultQuestName || questname.trim().length === 0) {
      return (
        <Box className="control">
          <InputGroup>
            <Input isInvalid value={questname} onChange={handleChange} />
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
            onChange={handleChange}
          />
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        </InputGroup>
      </Box>
    );
  };

  const node = buildInputNode(questname);
  return (
    <Box className="field">
      <FormLabel className="label">周回場所</FormLabel>
      {node}
    </Box>
  );
});

export default QuestNameEditor;
