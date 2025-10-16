import React from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import {ExternalLinkIcon, StarIcon} from "@chakra-ui/icons";

const CarrierElement = ({
  logo,
  companyName = "1st Choise Freighter, LLC",
  status = "Access Enabled",
  rating = "5.0",
  connectionDate = "Connected 7/09/2024",
  email = "m.straightcargollc@gmail.com",
  onView,
}) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      border="1px solid #E2E8F0"
      boxShadow="sm"
      _hover={{boxShadow: "md"}}
      transition="all 0.2s">
      <VStack
        px="20px"
        py={"20px"}
        borderBottom="1px solid #E2E8F0"
        spacing={4}
        align="stretch">
        <HStack justify="space-between" align="flex-start">
          <Box
            w="52px"
            h="52px"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid #E2E8F0">
            <img src="/img/carrierLogo.svg" alt="" width />
          </Box>

          <Flex flexDirection="column" gap="10px">
            <Badge
              bg="green.500"
              color="white"
              px="12px"
              py="2px"
              borderRadius="full"
              fontSize="12px"
              fontWeight="500">
              {status}
            </Badge>
            <HStack mt="6px" spacing={"10px"}>
              <Text fontSize="14px" fontWeight="600" color="gray.700">
                {rating}
              </Text>
              <HStack spacing={1}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    w="14px"
                    h="14px"
                    color="gold"
                    fill="currentColor"
                  />
                ))}
              </HStack>
            </HStack>
          </Flex>
        </HStack>

        <Text fontSize="16px" fontWeight="600" color="#181D27">
          {companyName}
        </Text>

        <Text fontSize="16px" fontWeight="400" color="#535862">
          {connectionDate}
        </Text>

        <HStack spacing={2}>
          <Text fontSize="16px" color="#EF6820" fontWeight="500">
            {email}
          </Text>
          <Icon as={ExternalLinkIcon} w="12px" h="12px" color="#EF6820" />
        </HStack>
      </VStack>

      <Flex justify="flex-end" py="16px" px="24px">
        <Button
          variant="ghost"
          color="#EF6820"
          fontSize="16px"
          fontWeight="500"
          p="0"
          h="auto"
          _hover={{bg: "transparent", textDecoration: "underline"}}
          onClick={onView}>
          View
        </Button>
      </Flex>
    </Box>
  );
};

export default CarrierElement;
