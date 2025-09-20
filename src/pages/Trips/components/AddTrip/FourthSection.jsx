import React from "react";
import {Box, Flex, Text, Radio, Checkbox, Switch} from "@chakra-ui/react";
import HFSwitch from "@/components/HFSwitch";
import HFRadio from "@/components/HFRadio";

function FourthSection({control}) {
  return (
    <Box mt={"20px"} border="1px solid #E9EAEB" borderRadius="12px" p="24px">
      <Flex gap={"24px"}>
        <Box
          pr="30px"
          borderRight="1px solid #E9EAEB"
          flexDirection="column"
          gap={"16px"}
          w="300px">
          <Flex id="tripRadio" gap={"12px"}>
            <HFRadio control={control} name="oneWay" />
            <Text fontSize={"16px"} fontWeight={"500"} color={"#414651"}>
              One Way
            </Text>
          </Flex>
          <Flex mt="16px" id="tripRadio" gap={"12px"}>
            <HFRadio control={control} name="roundTrip" />
            <Text fontSize={"16px"} fontWeight={"500"} color={"#414651"}>
              Round Trip
            </Text>
          </Flex>
        </Box>

        <Box
          pr="30px"
          w="300px"
          borderRight="1px solid #E9EAEB"
          flexDirection="column"
          gap={"16px"}>
          <Flex id="tripRadio" gap={"12px"}>
            <HFRadio control={control} name="solo" />
            <Text fontSize={"16px"} fontWeight={"500"} color={"#414651"}>
              Solo
            </Text>
          </Flex>
          <Flex mt="16px" id="tripRadio" gap={"12px"}>
            <HFRadio control={control} name="team" />
            <Text fontSize={"16px"} fontWeight={"500"} color={"#414651"}>
              Team
            </Text>
          </Flex>
        </Box>

        <Box w="344px" flexDirection="column" gap={"16px"}>
          <Flex id="tripRadio" gap={"12px"} alignItems="center">
            <HFSwitch control={control} name="lostBlack" />
            <Text fontSize={"16px"} fontWeight={"500"} color={"#414651"}>
              Lost Black
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default FourthSection;
