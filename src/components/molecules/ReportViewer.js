// ReportViewer.js
import React from "react";
import { Box, HStack, Text, Tag, Textarea } from "@chakra-ui/react";

class ReportViewer extends React.Component {
  computeRows(rows) {
    // TODO あまり洗練された手法とはいえない
    const screenWidth = window.screen.width;

    const overflows = rows.filter((r) => {
      if (screenWidth < 376) {
        return r.length > 30;
      } else if (screenWidth < 414) {
        return r.length > 35;
      }
      return false;
    }).length;

    return rows.length + overflows;
  }

  render() {
    const rows = this.props.reportText.split("\n");
    const numRows = this.computeRows(rows);

    return (
      <Box mt={2}>
        <HStack spacing={2} mb={1}>
          <Text>周回報告テキスト</Text>
          <Tag>直接編集不可</Tag>
        </HStack>
        <Box className="control">
          <Textarea readOnly value={this.props.reportText} rows={numRows} />
        </Box>
      </Box>
    );
  }
}

export default ReportViewer;
