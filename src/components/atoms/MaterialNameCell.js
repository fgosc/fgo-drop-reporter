// MaterialNameCell.js
import React from "react";
import { Text, Input } from "@chakra-ui/react";

// "素材" フィールド
class MaterialNameCell extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    this.props.onValueChange(this.props.id, event.target.value);
  }

  isValidMaterialValue(v) {
    if (v === "") {
      return "BLANK";
    }
    if (v === "!") {
      return "BLANK";
    }
    if (/[0-9]/.test(v[v.length - 1])) {
      return "TAILNUM";
    }
    return "OK";
  }

  makeComponent() {
    const value = this.props.material;
    const validationResult = this.isValidMaterialValue(value.trim());

    if (validationResult === "BLANK") {
      return (
        <>
          <Input
            type="text"
            className="input is-small is-danger"
            value={value}
            onChange={this.handleValueChange}
          />
          <Text className="help is-danger">入力必須</Text>
        </>
      );
    } else if (validationResult === "TAILNUM") {
      return (
        <>
          <Input
            type="text"
            className="input is-small"
            value={value}
            onChange={this.handleValueChange}
          />
          <Text className="help is-danger">末尾は数字以外</Text>
        </>
      );
    }
    return (
      <Input
        type="text"
        className="input is-small"
        value={value}
        onChange={this.handleValueChange}
      />
    );
  }

  render() {
    return this.makeComponent();
  }
}

export default MaterialNameCell;
