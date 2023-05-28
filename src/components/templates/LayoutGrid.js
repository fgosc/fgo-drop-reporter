import { useContext } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import MainContent from "../organisms/MainContent";
import ReportParamContext from "../../contexts/ReportParamContext";

function LayoutGrid() {
  const { questname, runs, lines, note } = useContext(ReportParamContext);
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"`}
      gridTemplateRows={"1px 1fr"}
      gridTemplateColumns={"150px 1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.800"
      fontWeight="bold"
      maxWidth="800px"
      margin="auto"
      minHeight="calc(100vh - 64px)"
    >
      <GridItem pl="2" area={"main"}>
        <Box overflowY="auto" maxHeight="calc(100vh - 64px)">
          <MainContent
            questname={questname}
            runs={runs}
            lines={lines}
            note={note}
          />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default LayoutGrid;
