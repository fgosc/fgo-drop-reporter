import { memo } from "react";
import { Box, Text, Textarea } from "@chakra-ui/react";

const NoteEditor = memo(function NoteEditor({ onNoteChange, note }) {
  const handleChange = (event) => {
    onNoteChange(event.target.value);
  };

  return (
    <Box mt={2}>
      <Text>コメント</Text>
      <Textarea value={note} onChange={handleChange} />
    </Box>
  );
});

export default NoteEditor;
