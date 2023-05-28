// ReportTable.js

import { memo } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import TableLine from "../molecules/TableLine";

const ReportTable = memo(function ReportTable({
  lines,
  onMaterialChange,
  onMaterialReportCountChange,
  onLineDeleteButtonClick,
  onLineUpButtonClick,
  onLineDownButtonClick,
  onAddLineButtonClick,
}) {
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
          {lines.map((e) => {
            return (
              <TableLine
                key={e.id}
                {...e}
                onMaterialChange={onMaterialChange}
                onMaterialReportCountChange={onMaterialReportCountChange}
                onLineDeleteButtonClick={onLineDeleteButtonClick}
                onLineUpButtonClick={onLineUpButtonClick}
                onLineDownButtonClick={onLineDownButtonClick}
              />
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>
              <Button size="sm" mt={1} onClick={onAddLineButtonClick}>
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
});

export default ReportTable;
