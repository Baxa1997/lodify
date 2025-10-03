import React, {useEffect, useState} from "react";
import {Box, HStack, Button, Text} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useGetLodify} from "@services/lodify-user.service";
import HFTextField from "@components/HFTextField";

const SearchToggle = ({
  onNext = () => {},
  watch,
  control,
  reset,
  getValues,
}) => {
  const [searchType, setSearchType] = useState("US DOT");
  const fmcsa = watch("us_dot");

  const {data, isSuccess} = useGetLodify(fmcsa, {
    enabled: Boolean(fmcsa),
  });

  useEffect(() => {
    if (isSuccess) {
      const responseData = data?.data[0];
      reset({
        ...getValues(),
        us_dot: fmcsa,
        physical_address1: responseData?.phy_street,
        city: responseData?.phy_city,
        state: responseData?.phy_state,
        zip_code: responseData?.phy_zip,
        country: responseData?.phy_country,
        email: responseData?.email_address,
        phone: responseData?.telephone,
      });
    }
  }, [data]);

  return (
    <>
      <Box maxWidth="300px" mb="32px">
        <Text color="#181D27" fontSize="16px" fontWeight="600" mb="8px">
          Broker Details
        </Text>
        <Text fontWeight="400" fontSize="14px" color="#535862">
          Choose your carrier. If you're a dispatch service, start with one for
          now and you can add more later.{" "}
        </Text>
      </Box>
      <HStack spacing={3} mt={4}>
        <HStack
          spacing={0}
          border="1px solid #E5E7EB"
          borderRadius="8px"
          overflow="hidden">
          <Button
            isDisabled={true}
            size="sm"
            variant="ghost"
            bg={searchType === "MC" ? "#F9FAFB" : "white"}
            color="#374151"
            fontSize="14px"
            fontWeight="500"
            onClick={() => setSearchType("MC")}
            _hover={{bg: "#F9FAFB"}}>
            MC
          </Button>
          <Button
            size="sm"
            variant="ghost"
            bg={searchType === "US DOT" ? "#F9FAFB" : "white"}
            color="#374151"
            fontSize="14px"
            fontWeight="500"
            onClick={() => setSearchType("US DOT")}
            _hover={{bg: "#F9FAFB"}}>
            US DOT
          </Button>
        </HStack>

        <Box position="relative" flex="1">
          <HFTextField
            control={control}
            name="us_dot"
            placeholder={`${searchType} Number`}
          />
          <SearchIcon
            w="14px"
            h="14px"
            color="#6B7280"
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            pointerEvents="none"
          />
        </Box>
      </HStack>

      <Button
        _hover={{bg: "#EF6820"}}
        mb="20px"
        width="100%"
        height="40px"
        bg="#EF6820"
        color="white"
        borderRadius="8px"
        fontSize="16px"
        fontWeight="600"
        mt="20px">
        Search
      </Button>

      <Box textAlign="center">
        <Text fontSize="14px" fontWeight="400" color="#535862">
          Don't have a DOT or MC number?
        </Text>
        <Button
          _hover={{bg: "transparent"}}
          bg="transparent"
          border="none"
          p="0"
          m="0"
          onClick={() => onNext(true)}>
          <Text fontSize="14px" fontWeight="400" color="#EF6820">
            Skip this step
          </Text>
        </Button>
      </Box>
    </>
  );
};

export default SearchToggle;
