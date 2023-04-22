import { Box, Text, Textarea } from "@chakra-ui/react";

function NoteEditor(props) {
    const handleChange = (event) => {
        console.log(props)
        props.onNoteChange(event.target.value);
    }
    return (
        <Box>
            <Text>コメント</Text>
            <Textarea value={props.note} onChange={handleChange} />
        </Box>
    )
}

export default NoteEditor;
