// RunCountEditor.js
import { memo, useCallback } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  FormLabel,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const RunCountEditor = memo(({ onRunCountChange, runcount }) => {
  const handleChange = useCallback(
    (value) => {
      onRunCountChange(value);
    },
    [onRunCountChange]
  );

  const addValue = useCallback(
    (delta) => {
      let runcountInt = parseInt(runcount);
      if (isNaN(runcountInt)) {
        runcountInt = 0;
      }
      let v = runcountInt + delta;
      if (v < 0) {
        v = 0;
      }
      onRunCountChange(v);
    },
    [onRunCountChange, runcount]
  );

  const handleClick = useCallback(
    (event) => {
      addValue(parseInt(event.target.textContent));
    },
    [addValue]
  );

  const buildInputNode = useCallback(() => {
    const _runcount = parseInt(runcount);
    if (_runcount <= 0 || isNaN(_runcount)) {
      return (
        <Box>
          <NumberInput
            isInvalid
            min={0}
            value={runcount}
            onChange={handleChange}
          >
            <NumberInputField />
          </NumberInput>
          <Text color="red" as="b">
            周回数を設定してください。
          </Text>
        </Box>
      );
    }
    return (
      <Box>
        <NumberInput min={0} value={runcount} onChange={handleChange}>
          <InputGroup>
            <NumberInputField />
            <InputRightElement className="NumberCheckIcon">
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>
        </NumberInput>
      </Box>
    );
  }, [handleChange, runcount]);

  const inputNode = buildInputNode();
  return (
    <Box>
      <Box>
        <FormLabel>周回数</FormLabel>
        {inputNode}
      </Box>
      <Box mt={1}>
        <Button size="sm" colorScheme="red" mr={1} onClick={handleClick}>
          -1000
        </Button>
        <Button size="sm" colorScheme="red" mr={1} onClick={handleClick}>
          -100
        </Button>
        <Button size="sm" colorScheme="red" mr={1} onClick={handleClick}>
          -10
        </Button>
        <Button size="sm" colorScheme="red" mr={1} onClick={handleClick}>
          -1
        </Button>
        <Button size="sm" colorScheme="blue" mr={1} onClick={handleClick}>
          +1
        </Button>
        <Button size="sm" colorScheme="blue" mr={1} onClick={handleClick}>
          +10
        </Button>
        <Button size="sm" colorScheme="blue" mr={1} onClick={handleClick}>
          +100
        </Button>
        <Button size="sm" colorScheme="blue" onClick={handleClick}>
          +1000
        </Button>
      </Box>
    </Box>
  );
});

export default RunCountEditor;
