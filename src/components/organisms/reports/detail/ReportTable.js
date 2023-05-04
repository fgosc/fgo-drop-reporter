import { Fragment } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const ReportTable = ({ dropObjects, setDropObjects }) => {
  const handleObjectNameChange = (objectIndex, value) => {
    const updatedDropObjects = [...dropObjects];
    updatedDropObjects[objectIndex].objectName = value;
    setDropObjects(updatedDropObjects);
  };
  const handleDropStackChange = (objectIndex, dropIndex, value) => {
    const updatedDropObjects = [...dropObjects];
    updatedDropObjects[objectIndex].drops[dropIndex].stack = value;
    setDropObjects(updatedDropObjects);
  };
  const handleDropNumChange = (objectIndex, dropIndex, value) => {
    const updatedDropObjects = [...dropObjects];
    updatedDropObjects[objectIndex].drops[dropIndex].num = value;
    setDropObjects(updatedDropObjects);
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>表示名</Th>
          <Th>アイテム名</Th>
          <Th>枠数</Th>
          <Th>ドロップ数</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dropObjects.map((dropObject, index) => (
          <Fragment key={index}>
            {dropObject.drops.map((drop, dropIndex) => (
              <Tr key={dropIndex}>
                <Td>
                  {dropObject.objectName}
                  {drop.stack !== null &&
                    drop.stack !== 1 &&
                    `(x${drop.stack})`}
                  {drop.num === -1 ? "NaN" : drop.num}
                </Td>
                <Td>
                  <Input
                    value={dropObject.objectName}
                    onChange={(e) =>
                      handleObjectNameChange(index, e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <NumberInput
                    defaultValue={drop.stack || 1}
                    min={1}
                    onChange={(valueAsString, valueAsNumber) =>
                      handleDropStackChange(index, dropIndex, valueAsNumber)
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <NumberInput
                    defaultValue={drop.num}
                    min={-1}
                    onChange={(valueAsString, valueAsNumber) =>
                      handleDropNumChange(index, dropIndex, valueAsNumber)
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
              </Tr>
            ))}
          </Fragment>
        ))}
      </Tbody>
    </Table>
  );
};

export default ReportTable;
