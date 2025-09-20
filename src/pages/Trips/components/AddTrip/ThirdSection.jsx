import React from "react";
import {Flex} from "@chakra-ui/react";
import {Box} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import HFTextField from "../../../../components/HFTextField";
import HFMultiSelect from "../../../../components/HFMultiSelect";

function ThirdSection({control}) {
  return (
    <Box
      mt={"20px"}
      border="1px solid #E9EAEB"
      gap="24px"
      borderRadius="12px"
      p="24px">
      <Flex flexDirection="row" gap={"24px"}>
        <Flex w={"100%"} alignItems="center" gap="24px" flexDirection="column">
          <Text
            width={"100%"}
            textAlign="left"
            fontSize={"18px"}
            fontWeight={"600"}
            color={"#181D27"}>
            Reference #’s
          </Text>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              Reference # <span>*</span>
            </Text>
            <HFTextField
              border={"1px solid #D5D7DA"}
              size="md"
              control={control}
              name="reference"
              placeholder="Enter Reference #"
            />
          </Box>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              PO # <span>*</span>
            </Text>
            <HFTextField
              border={"1px solid #D5D7DA"}
              size="md"
              control={control}
              name="reference_po"
              placeholder="Enter PO #"
            />
          </Box>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              Other # <span>*</span>
            </Text>
            <HFTextField
              border={"1px solid #D5D7DA"}
              size="md"
              control={control}
              name="reference_other"
              placeholder="Enter Other #"
            />
          </Box>
        </Flex>
        <Flex w={"100%"} alignItems="center" gap="24px" flexDirection="column">
          <Text
            width={"100%"}
            textAlign="left"
            fontSize={"18px"}
            fontWeight={"600"}
            color={"#181D27"}>
            Payments
          </Text>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              Hauling Rate <span>*</span>
            </Text>
            <HFTextField
              border={"1px solid #D5D7DA"}
              size="md"
              control={control}
              name="hauling_rate"
              placeholder="Enter Payment"
            />
          </Box>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              Accessorials <span>*</span>
            </Text>
            <HFMultiSelect
              size="md"
              width={"100%"}
              control={control}
              name="accessorials"
              options={[]}
            />
          </Box>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              Service Fee <span>*</span>
            </Text>
            <HFTextField
              size="md"
              border={"1px solid #D5D7DA"}
              control={control}
              name="service_fee"
              placeholder="Enter ServiceFee"
            />
          </Box>
        </Flex>
        <Flex w={"100%"} alignItems="center" gap="24px" flexDirection="column">
          <Text
            width={"100%"}
            textAlign="left"
            fontSize={"18px"}
            fontWeight={"600"}
            color={"#181D27"}>
            Documents
          </Text>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              Rate Confirmation <span>*</span>
            </Text>
            <HFMultiSelect
              size="md"
              control={control}
              name="rate_confirmation"
              options={[
                {label: "Load-0000001", value: "Load-0000001"},
                {label: "Load-0000002", value: "Load-0000002"},
              ]}
            />
          </Box>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              BOL/POD <span>*</span>
            </Text>
            <HFTextField
              size="md"
              border={"1px solid #D5D7DA"}
              control={control}
              name="bold_pod"
              placeholder="Enter BOL/POD"
            />
          </Box>
          <Box w={"100%"}>
            <Text
              mb={"6px"}
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#414651"}>
              Other Files <span>*</span>
            </Text>
            <HFTextField
              size="md"
              border={"1px solid #D5D7DA"}
              control={control}
              name="other_files"
              placeholder="Enter Other Files"
            />
          </Box>
        </Flex>
      </Flex>
      <Box width="100%" mt={"24px"}>
        <Text
          width={"100%"}
          fontSize={"14px"}
          fontWeight={"600"}
          color={"#181D27"}
          borderBottom={"1px solid #E9EAEB"}
          pb={"12px"}>
          Total Rates
        </Text>

        <Text mt={"16px"} fontSize={"14px"} color={"#414651"} fontWeight="400">
          <span style={{fontWeight: "600"}}>$6,800.00</span> Invoicing
        </Text>
        <Text mt={"6px"} fontSize={"14px"} fontWeight={"400"} color={"#414651"}>
          <span style={{fontWeight: "600"}}>$6,800.00</span> Assignees
        </Text>
      </Box>
    </Box>
  );
}

export default ThirdSection;
