import { Grid, GridItem } from "@chakra-ui/react";
import MainContent from "../organisms/MainContent";
import FooterComponent from "../organisms/FooterComponent";

function LayoutGrid({ questname, runs, lines, note }) {
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      // gridTemplateRows={"50px 1fr 30px"}
      gridTemplateRows={"1px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.800"
      fontWeight="bold"
      maxWidth="800px"
      margin="auto"
    >
      <GridItem pl="2" area={"main"}>
        <MainContent
          questname={questname}
          runs={runs}
          lines={lines}
          note={note}
        />
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        <FooterComponent />
      </GridItem>
    </Grid>
  );
}

export default LayoutGrid;
