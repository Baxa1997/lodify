import React from "react";
import AllLoadsFiltersComponent from "../../components/Filterscomponent";
import {Box} from "@chakra-ui/react";

function ActiveTrips() {
  return (
    <Box mt={"26px"}>
      <AllLoadsFiltersComponent
        actionButton={true}
        actionButtonText="Add Load"
      />
    </Box>
  );
}

export default ActiveTrips;
