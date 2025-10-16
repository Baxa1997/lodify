import React from "react";
import CarrierElement from "../../components/CarrierElement";
import {Box, Flex} from "@chakra-ui/react";

const MyCarriers = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      mt="30px"
      gap={"20px"}>
      <CarrierElement />
      <CarrierElement />
      <CarrierElement />

      <CarrierElement />
      <CarrierElement />
      <CarrierElement />
    </Box>
  );
};

export default MyCarriers;
