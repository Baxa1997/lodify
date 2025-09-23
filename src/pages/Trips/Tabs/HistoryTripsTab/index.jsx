import {Box, Button, Flex, Text} from "@chakra-ui/react";
import React from "react";
import DispatchNotes from "./DispatchNotes";
import Documents from "./Documents";
import Quotes from "./Quotes";
import DoubleTable from "./DoubleTable";
import Activities from "./Activities";

function HistoryTripsTab() {
  return (
    <>
      {" "}
      <Box mt="24px" borderRadius={"12px"} border="1px solid #E9EAEB">
        <Flex
          p="8px 16px"
          mb="6px"
          borderBottom="1px solid #E9EAEB"
          w="100%"
          justifyContent={"space-between"}>
          <Text
            pl="8px"
            w="100%"
            fontWeight={"600"}
            fontSize={"14px"}
            color={"#181D27"}>
            Bill to (Booked From)
          </Text>
          <Text w="100%" fontWeight={"600"} fontSize={"14px"} color={"#181D27"}>
            Reference #’s
          </Text>
          <Text w="100%" fontWeight={"600"} fontSize={"14px"} color={"#181D27"}>
            Remit Payment To
          </Text>
          <Text w="100%" fontWeight={"600"} fontSize={"14px"} color={"#181D27"}>
            Payable Method
          </Text>
          <Text w="100%" fontWeight={"600"} fontSize={"14px"} color={"#181D27"}>
            Shipment Type
          </Text>
          <Text w="100%" fontWeight={"600"} fontSize={"14px"} color={"#181D27"}>
            Booked By
          </Text>
        </Flex>

        <Flex p="0px 16px" borderBottom="1px solid #E9EAEB">
          <Box w="100%" p="16px 8px 16px 8px">
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              Corporate Traffic
            </Text>
          </Box>

          <Box w="100%" p="16px 8px 16px 8px">
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              Ref #{" "}
              <span style={{fontWeight: "400", color: "#414651"}}>115</span>
            </Text>
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              PO#{" "}
              <span style={{fontWeight: "400", color: "#414651"}}>
                11591857
              </span>
            </Text>
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              Other #{" "}
              <span style={{fontWeight: "400", color: "#414651"}}>910725</span>
            </Text>
          </Box>

          <Box w="100%" p="16px 8px 16px 8px">
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              RTS
            </Text>
          </Box>

          <Box w="100%" p="16px 8px 16px 8px">
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              N/A
            </Text>
          </Box>

          <Box w="100%" p="16px 8px 16px 8px">
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              Full Truckload
            </Text>
          </Box>

          <Box w="100%" p="16px 8px 16px 8px">
            <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
              John Said
            </Text>
          </Box>
        </Flex>

        <Flex borderBottom="1px solid #E9EAEB">
          <Box borderRight="1px solid #E9EAEB" w="25%" p="12px"></Box>

          <Box borderRight="1px solid #E9EAEB" w="25%">
            <Text
              p="18px 16px"
              fontWeight={"600"}
              fontSize={"18px"}
              color={"#181D27"}
              borderBottom="1px solid #E9EAEB">
              Quotes (Rates)
            </Text>
            <Quotes />
          </Box>

          <Box w="25%" borderRight="1px solid #E9EAEB">
            <Text
              p="18px 20px"
              fontWeight={"600"}
              fontSize={"18px"}
              color={"#181D27"}
              borderBottom="1px solid #E9EAEB">
              Documents
            </Text>

            <Box
              id="scrollbar_none"
              h="280px"
              scrollbarWidth={"none"}
              scrollbarColor={"none"}
              overflowY={"scroll"}>
              <Documents />
            </Box>
          </Box>

          <Box w="25%">
            <Text
              p="18px 20px"
              fontWeight={"600"}
              fontSize={"18px"}
              color={"#181D27"}
              borderBottom="1px solid #E9EAEB"
              borderRight="1px solid #E9EAEB">
              Dispatch Notes
            </Text>

            <DispatchNotes />
          </Box>
        </Flex>

        <DoubleTable />
      </Box>
      <Activities />
    </>
  );
}

export default HistoryTripsTab;
