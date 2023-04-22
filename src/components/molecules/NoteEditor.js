import { Box, Text, Textarea } from "@chakra-ui/react";

function NoteEditor(props) {
  const handleChange = (event) => {
    props.onNoteChange(event.target.value);
  };
  return (
    <Box mt={2}>
      <Text>コメント</Text>
      <Textarea value={props.note} onChange={handleChange} />
    </Box>
  );
}

export default NoteEditor;
