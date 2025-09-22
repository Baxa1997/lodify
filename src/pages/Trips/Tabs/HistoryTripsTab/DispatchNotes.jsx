import React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";

function DispatchNotes() {
  return (
    <>
      <Box id="scrollbar_none" h="280px" overflowY={"scroll"}>
        <Box p="16px" pb="0">
          <Flex mb="6px" justifyContent={"space-between"}>
            <Text fontWeight={"500"} fontSize={"12px"} color={"#414651"}>
              111T5NSZ1
            </Text>
            <Text fontWeight={"500"} fontSize={"10px"} color={"#535862"}>
              Amazon Jun 25 2025 03:54 GMT+5
            </Text>
          </Flex>

          <Box
            fontSize={"14px"}
            color="#181D27"
            border="1px solid #E9EAEB"
            p="10px 12px"
            borderRadius="8px">
            C2C R4C Dispatcher number: (440) 358-3165 Issue: dispatch requesting
            BOL Resolution: created 17979956771, adv to standby for case updates
          </Box>
        </Box>

        <Box p="16px">
          <Flex mb="6px" alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={"500"} fontSize={"12px"} color={"#414651"}>
              111T5NSZ1
            </Text>
            <Text fontWeight={"500"} fontSize={"10px"} color={"#535862"}>
              Amazon Jun 25 2025 03:54 GMT+5
            </Text>
          </Flex>

          <Box
            fontSize={"14px"}
            color="#181D27"
            border="1px solid #E9EAEB"
            p="10px 12px"
            borderRadius="8px">
            C2C R4C Dispatcher number: (440) 358-3165 Issue: dispatch requesting
            BOL Resolution: created 17979956771, adv to standby for case updates
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DispatchNotes;
