// ReportTable.js

import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import TableLine from "../molecules/TableLine";

class ReportTable extends React.Component {
  render() {
    return (
      <Box className="table-container" style={{ marginBottom: 1.5 + "rem" }}>
        <Table className="is-narrow">
          <Thead>
            <Tr>
              <Th width={180}></Th>
              <Th>素材名</Th>
              <Th>報告値</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.props.lines.map((e) => {
              return (
                <TableLine
                  key={e.id}
                  {...e}
                  onMaterialChange={this.props.onMaterialChange}
                  onMaterialReportCountChange={
                    this.props.onMaterialReportCountChange
                  }
                  onLineDeleteButtonClick={this.props.onLineDeleteButtonClick}
                  onLineUpButtonClick={this.props.onLineUpButtonClick}
                  onLineDownButtonClick={this.props.onLineDownButtonClick}
                />
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Button
                  size="sm"
                  mt={1}
                  onClick={this.props.onAddLineButtonClick}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    );
  }
}

export default ReportTable;
