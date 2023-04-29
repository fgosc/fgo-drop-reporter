// TableLine.js

import React from "react";
import { Button, Tr, Td } from "@chakra-ui/react";
import MaterialNameCell from "../atoms/MaterialNameCell";
import ReportCountCell from "../atoms/ReportCountCell";

// テーブル行
class TableLine extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  handleDeleteClick(event) {
    if (window.confirm("この行を削除しますか？")) {
      this.props.onLineDeleteButtonClick(this.props.id);
    }
  }

  handleUpClick(event) {
    this.props.onLineUpButtonClick(this.props.id);
  }

  handleDownClick(event) {
    this.props.onLineDownButtonClick(this.props.id);
  }

  render() {
    return (
      <Tr>
        <Td verticalAlign="top">
          <Button size="sm" bg="gray.300" mr={1} onClick={this.handleDeleteClick}>
            <i className="fas fa-trash"></i>
          </Button>
          <Button size="sm" bg="gray.300" mr={1} onClick={this.handleUpClick}>
            <i className="fas fa-arrow-up"></i>
          </Button>
          <Button size="sm" bg="gray.300" onClick={this.handleDownClick}>
            <i className="fas fa-arrow-down"></i>
          </Button>
        </Td>
        <Td verticalAlign="top">
          <MaterialNameCell
            {...this.props}
            {...this.state}
            onValueChange={this.props.onMaterialChange}
          />
        </Td>
        <Td verticalAlign="top">
          <ReportCountCell
            {...this.props}
            {...this.state}
            onValueChange={this.props.onMaterialReportCountChange}
          />
        </Td>
      </Tr>
    );
  }
}

export default TableLine;
