import { Grid, GridItem } from "@chakra-ui/react";
import HeaderComponent from "../organisms/HeaderComponent";
import MainContent from "../organisms/MainContent";
import FooterComponent from "../organisms/FooterComponent";

function LayoutGrid({ signOut, questname, runs, lines }) {
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.800"
      fontWeight="bold"
      maxWidth="800px"
      margin="auto"
    >
      <GridItem pl="2" area={"header"}>
        <HeaderComponent />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        <MainContent
          signOut={signOut}
          questname={questname}
          runs={runs}
          lines={lines}
        />
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        <FooterComponent />
      </GridItem>
    </Grid>
  );
}

export default LayoutGrid;
