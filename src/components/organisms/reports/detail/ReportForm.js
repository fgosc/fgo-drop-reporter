import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ReportTable from "./ReportTable";

const ReportForm = ({
  isAdmin,
  isEditable,
  questType,
  setQuestType,
  warName,
  setWarName,
  questName,
  setQuestName,
  runs,
  setRuns,
  note,
  setNote,
  dropObjects,
  setDropObjects,
}) => {
  return (
    <>
      <Text>クエスト種別:</Text>
      <RadioGroup onChange={setQuestType} value={questType}>
        <HStack>
          <Radio value="normal">通常フリークエスト</Radio>
          <Radio value="event">イベントフリークエスト</Radio>
        </HStack>
      </RadioGroup>
      <FormControl>
        <FormLabel>場所</FormLabel>
        <Input
          value={warName}
          onChange={(e) => setWarName(e.target.value)}
          isReadOnly={!isAdmin}
          isEditable={isAdmin}
        />
      </FormControl>
      <FormControl>
        <FormLabel>クエスト名</FormLabel>
        <Input
          value={questName}
          onChange={(e) => setQuestName(e.target.value)}
          isReadOnly={!isAdmin}
          isEditable={isAdmin}
        />
      </FormControl>
      <FormControl>
        <FormLabel>周回数</FormLabel>
        <NumberInput defaultValue={0} value={runs} min={1} onChange={setRuns}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <ReportTable
        dropObjects={dropObjects}
        setDropObjects={setDropObjects}
        isEditable={isEditable}
      />
      <FormControl>
        <FormLabel>コメント</FormLabel>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          isEditable={isEditable}
        />
      </FormControl>
    </>
  );
};

export default ReportForm;
