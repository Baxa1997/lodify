import {Box} from "@chakra-ui/react";
import React from "react";
import FiltersComponent from "../../components/FiltersComponent";

function UpcomingTab() {
  return (
    <Box mt={"26px"}>
      <FiltersComponent filterButton={true} actionButton={true} />
    </Box>
  );
}

export default UpcomingTab;
