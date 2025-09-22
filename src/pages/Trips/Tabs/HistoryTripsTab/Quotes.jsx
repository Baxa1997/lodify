import React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";

function Quotes() {
  return (
    <>
      <Box p="16px">
        <Flex justifyContent={"space-between"}>
          <Text fontWeight={"500"} color={"#000"} fontSize="14px">
            Hauling Rate
          </Text>
          <Text fontWeight={"500"} color={"#000"} fontSize="14px">
            $1,000.00
          </Text>
        </Flex>

        <Flex justifyContent={"space-between"}>
          <Text fontWeight={"500"} color={"#DC6803"} fontSize="14px">
            Trip Service Fee
          </Text>
          <Text fontWeight={"500"} color={"#DC6803"} fontSize="14px">
            $0.00
          </Text>
        </Flex>

        <Flex justifyContent={"space-between"}>
          <Text fontWeight={"500"} color={"#DC6803"} fontSize="14px">
            Accs Service Fee
          </Text>
          <Text fontWeight={"500"} color={"#DC6803"} fontSize="14px">
            $0.00
          </Text>
        </Flex>
      </Box>

      <Box
        background="#FAFAFA"
        mx="16px"
        mb="16px"
        borderRadius="8px"
        border="1px solid #D5D7DA"
        p="16px">
        <Text fontWeight={"600"} color={"#181D27"} fontSize="18px">
          Total Quotes (Rates)
        </Text>

        <Flex mt={"8px"} justifyContent={"space-between"}>
          <Text fontWeight={"500"} color={"#181D27"} fontSize="12px">
            $1,000.00
          </Text>
          <Text fontWeight={"500"} color={"#717680"} fontSize="12px">
            Invoicing Rate
          </Text>
        </Flex>

        <Flex mt={"8px"} justifyContent={"space-between"}>
          <Text fontWeight={"500"} color={"#181D27"} fontSize="12px">
            $0.00
          </Text>
          <Text fontWeight={"500"} color={"#717680"} fontSize="12px">
            Assignment Rate (Quote)
          </Text>
        </Flex>

        <Flex mt={"8px"} justifyContent={"space-between"}>
          <Text fontWeight={"500"} color={"#181D27"} fontSize="12px">
            $0.00
          </Text>
          <Text fontWeight={"500"} color={"#717680"} fontSize="12px">
            Drivers’ Accessorial
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default Quotes;
