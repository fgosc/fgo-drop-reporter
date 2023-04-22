// RunCountEditor.js
import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

class RunCountEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addValue = this.addValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.props.onRunCountChange(event.target.value);
  }

  addValue(delta) {
    let runcount = parseInt(this.props.runcount);
    // ブランクなど数値でない場合に NaN になる可能性がある。
    // その場合は強制的に 0 にする。
    if (isNaN(runcount)) {
      runcount = 0;
    }
    let v = runcount + delta;
    if (v < 0) {
      v = 0;
    }
    this.props.onRunCountChange(v);
  }

  buildInputNode() {
    const _runcount = parseInt(this.props.runcount);
    if (_runcount <= 0 || isNaN(_runcount)) {
      return (
        <Box>
          <Input
            type="number"
            isInvalid
            min="0"
            value={this.props.runcount}
            onChange={this.handleChange}
          />
          <Text color="red" as="b">
            周回数を設定してください。
          </Text>
        </Box>
      );
    }
    return (
      <Box className="control has-icons-right">
        <InputGroup>
          <Input
            type="number"
            min="0"
            value={this.props.runcount}
            onChange={this.handleChange}
          />
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        </InputGroup>
      </Box>
    );
  }

  handleClick(event) {
    this.addValue(parseInt(event.target.textContent));
  }

  render() {
    const inputNode = this.buildInputNode();
    return (
      <Box>
        <Box>
          <FormLabel>周回数</FormLabel>
          {inputNode}
        </Box>
        <Box mt={1}>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -1000
          </Button>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -100
          </Button>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -10
          </Button>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -1
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            mr={1}
            onClick={this.handleClick}
          >
            +1
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            mr={1}
            onClick={this.handleClick}
          >
            +10
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            mr={1}
            onClick={this.handleClick}
          >
            +100
          </Button>
          <Button size="sm" colorScheme="blue" onClick={this.handleClick}>
            +1000
          </Button>
        </Box>
      </Box>
    );
  }
}

export default RunCountEditor;
