import {Box, Button, Flex, Text} from "@chakra-ui/react";
import React from "react";

function HistoryTripsTab() {
  return (
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
            Ref # <span style={{fontWeight: "400", color: "#414651"}}>115</span>
          </Text>
          <Text fontWeight={"500"} fontSize={"14px"} color={"#181D27"}>
            PO#{" "}
            <span style={{fontWeight: "400", color: "#414651"}}>11591857</span>
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

      <Flex>
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
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              margin="0px 14px"
              p="14px 0px"
              border="1px solid #fff">
              <Flex gap={"8px"}>
                <img src="/img/filePhoto.svg" alt="" />
                <Box>
                  <Text fontWeight={"500"} fontSize={"13px"} color={"#414651"}>
                    Rate Confirmation.pdf
                  </Text>
                  <Text fontWeight={"400"} fontSize={"12px"} color={"#414651"}>
                    Rate Confirmation
                  </Text>
                </Box>
              </Flex>

              <Button
                w="34px"
                h="20px"
                bg="none"
                _hover={{bg: "none"}}
                color="#175CD3"
                fontSize={"14px"}
                fontWeight={"600"}>
                View
              </Button>
            </Flex>

            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              margin="12px 14px"
              p="0px 0px"
              border="1px solid #fff">
              <Flex gap={"8px"}>
                <img src="/img/filePhoto.svg" alt="" />
                <Box>
                  <Text fontWeight={"500"} fontSize={"13px"} color={"#414651"}>
                    Rate Confirmation.pdf
                  </Text>
                  <Text fontWeight={"400"} fontSize={"12px"} color={"#414651"}>
                    Rate Confirmation
                  </Text>
                </Box>
              </Flex>

              <Button
                w="34px"
                h="20px"
                bg="none"
                _hover={{bg: "none"}}
                color="#175CD3"
                fontSize={"14px"}
                fontWeight={"600"}>
                View
              </Button>
            </Flex>

            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              margin="0px 14px"
              p="14px 0px"
              border="1px solid #fff">
              <Flex gap={"8px"}>
                <img src="/img/filePhoto.svg" alt="" />
                <Box>
                  <Text fontWeight={"500"} fontSize={"13px"} color={"#414651"}>
                    Rate Confirmation.pdf
                  </Text>
                  <Text fontWeight={"400"} fontSize={"12px"} color={"#414651"}>
                    Rate Confirmation
                  </Text>
                </Box>
              </Flex>

              <Button
                w="34px"
                h="20px"
                bg="none"
                _hover={{bg: "none"}}
                color="#175CD3"
                fontSize={"14px"}
                fontWeight={"600"}>
                View
              </Button>
            </Flex>

            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              margin="0px 14px"
              p="14px 0px"
              border="1px solid #fff">
              <Flex gap={"8px"}>
                <img src="/img/filePhoto.svg" alt="" />
                <Box>
                  <Text fontWeight={"500"} fontSize={"13px"} color={"#414651"}>
                    Rate Confirmation.pdf
                  </Text>
                  <Text fontWeight={"400"} fontSize={"12px"} color={"#414651"}>
                    Rate Confirmation
                  </Text>
                </Box>
              </Flex>

              <Button
                w="34px"
                h="20px"
                bg="none"
                _hover={{bg: "none"}}
                color="#175CD3"
                fontSize={"14px"}
                fontWeight={"600"}>
                View
              </Button>
            </Flex>
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

          <Box id="scrollbar_none" h="280px" overflowY={"scroll"}>
            <Box p="16px">
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
                C2C R4C Dispatcher number: (440) 358-3165 Issue: dispatch
                requesting BOL Resolution: created 17979956771, adv to standby
                for case updates
              </Box>
            </Box>

            <Box p="16px">
              <Flex
                mb="6px"
                alignItems={"center"}
                justifyContent={"space-between"}>
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
                C2C R4C Dispatcher number: (440) 358-3165 Issue: dispatch
                requesting BOL Resolution: created 17979956771, adv to standby
                for case updates
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default HistoryTripsTab;
