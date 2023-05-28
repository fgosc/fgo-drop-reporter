// ReportCountCell.js
import React from "react";
import { Text, Input } from "@chakra-ui/react";

// "報告値" フィールド
class ReportCountCell extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    this.props.onValueChange(this.props.id, event.target.value);
  }

  isValidReportValue(v) {
    const s = String(v).trim();
    if (s === "NaN") {
      return true;
    }
    if (!/^[0-9]+$/.test(s)) {
      return false;
    }
    if (s !== "0" && s.startsWith("0")) {
      // 012 のような記述を排除する目的
      return false;
    }
    return true;
  }

  makeComponent() {
    const reportValue = this.props.report;

    if (this.isValidReportValue(reportValue)) {
      return (
        <Input
          type="text"
          className="input is-small"
          value={reportValue}
          onChange={this.handleValueChange}
        />
      );
    }
    return (
      <>
        <Input
          type="text"
          className="input is-small is-danger"
          value={reportValue}
          onChange={this.handleValueChange}
        />
        <Text className="help is-danger">整数または NaN</Text>
      </>
    );
  }

  render() {
    return this.makeComponent();
  }
}

export default ReportCountCell;
