// EditBox.js
import { useContext } from "react";
import { Box, Stack } from "@chakra-ui/react";
import ReportTable from "../organisms/ReportTable";
import QuestNameEditor from "../molecules/QuestNameEditor";
import ReportViewer from "../molecules/ReportViewer";
import RunCountEditor from "../molecules/RunCountEditor";
import NoteEditor from "../molecules/NoteEditor";
import TweetButton from "../atoms/button/TweetButton";
import { ReportButton } from "../atoms/button/ReportButton";
import ReportParamContext from "../../contexts/ReportParamContext";
import { useEditBox } from "../../hooks/useEditBox";

const EditBox = () => {
  const {
    handleQuestNameChange,
    handleRunCountChange,
    handleMaterialChange,
    handleMaterialReportCountChange,
    handleNoteChange,
    handleLineDeleteButtonClick,
    handleLineUpButtonClick,
    handleLineDownButtonClick,
    handleAddLineButtonClick,
  } = useEditBox();

  const { questname, runs, lines, note, reportText } =
    useContext(ReportParamContext);

  return (
    <Box mb={2}>
      <QuestNameEditor
        questname={questname}
        onQuestNameChange={handleQuestNameChange}
      />
      <RunCountEditor
        mb={1}
        runcount={runs}
        onRunCountChange={handleRunCountChange}
      />
      <Box mt={1}>
        <ReportTable
          lines={lines}
          onMaterialChange={handleMaterialChange}
          onMaterialReportCountChange={handleMaterialReportCountChange}
          onLineDeleteButtonClick={handleLineDeleteButtonClick}
          onLineUpButtonClick={handleLineUpButtonClick}
          onLineDownButtonClick={handleLineDownButtonClick}
          onAddLineButtonClick={handleAddLineButtonClick}
        />
      </Box>
      <NoteEditor note={note} onNoteChange={handleNoteChange} />
      <ReportViewer reportText={reportText} />
      <Stack spacing={2} direction="row" mt={2}>
        <ReportButton
          questname={questname}
          runcount={runs}
          lines={lines}
          note={note}
        />
        <TweetButton reportText={reportText} />
      </Stack>
    </Box>
  );
};

export default EditBox;
