import React from "react";
import { Box, Text, Divider } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const TotalRatesSection = ({ control }) => {
  return (
    <Box
      w="100%"
      mb="32px"
      mt="24px">
      <Controller
        name="total_rates"
        control={control}
        defaultValue="7915.00"
        render={({ field }) => (
          <Box
            bg="white"
            borderRadius="12px"
            p="20px"
            border="1px solid"
            borderColor="#E9EAEB"
            w="100%">
            <Text
              fontSize="14px"
              fontWeight="500"
              color="#717680"
              mb="12px">
              Total Rates
            </Text>

            <Divider
              borderColor="#E9EAEB"
              mb="12px" />

            <Text
              fontSize="20px"
              fontWeight="700"
              color="#181D27">
              ${field.value}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
};

export default TotalRatesSection;
