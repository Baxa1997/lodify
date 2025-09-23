import React from "react";
import {Box, Text, VStack, HStack, Input, Link} from "@chakra-ui/react";

const tableHeadings = [
  {label: "", key: "count"},
  {label: "ORIGIN", key: "origin"},
  {label: "", key: "arrow"},
  {label: "STOP", key: "stop"},
  {label: "DEADHEAD", key: "deadhead"},
  {label: "DESTINATION", key: "destination"},
  {label: "RATE", key: "rate"},
  {label: "ACCESSORIALS", key: "accessorials"},
  {label: "ASSIGNEES", key: "assignees"},
];

const gridTemplate = "35px 1.3fr 35px 1.3fr 1fr 1fr 1fr 1fr 1.2fr";

function DoubleTable() {
  const detailedStopsHeadings = [
    {label: "", key: "counts"},
    {label: "Address", key: "address"},
    {label: "", key: "count"},
    {label: "Appt time", key: "apptTime"},
    {label: "BOL#", key: "bol"},
    {label: "Phone #", key: "phone"},
    {label: "Load/Equipment", key: "loadEquipment"},
    {label: "Weight", key: "weight"},
    {label: "Qty", key: "qty"},
    {label: "Load size", key: "loadSize"},
    {label: "Special Instruction for driver", key: "specialInstruction"},
  ];

  const detailedGridTemplate =
    "35px 1.3fr 35px 1.3fr 0.8fr 0.8fr 1.2fr 0.6fr 0.6fr 0.8fr 1.2fr";

  return (
    <Box
      m="16px"
      borderRadius="12px"
      overflow="hidden"
      border="1px solid #E9EAEB"
      bg="white"
      shadow="sm">
      <Box
        display="grid"
        gridTemplateColumns={gridTemplate}
        borderBottom="1px solid #E9EAEB"
        bg="#FAFAFA"
        px="16px"
        py="10px"
        alignItems="center">
        {tableHeadings.map((heading) => (
          <Text
            key={heading.key}
            fontSize="13px"
            fontWeight="600"
            color="gray.700">
            {heading.label}
          </Text>
        ))}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={gridTemplate}
        borderBottom="1px solid #E9EAEB"
        px="12px"
        py="14px"
        alignItems="center"
        fontSize="14px">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box
            w="20px"
            h="20px"
            bg="#22C55E"
            borderRadius="50%"
            color="white"
            fontSize="12px"
            fontWeight="600"
            display="flex"
            alignItems="center"
            justifyContent="center">
            1
          </Box>
        </Box>

        <VStack align="start" spacing={0}>
          <Text fontWeight="600">Denver, CO US</Text>
          <Text fontSize="12px" color="gray.600">
            Aug 8, 2025, 07:00 MDT
          </Text>
        </VStack>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Text fontSize="16px">→</Text>
        </Box>

        <VStack align="start" spacing={0}>
          <Text fontWeight="600">Ontario, CA US</Text>
          <Text fontSize="12px" color="gray.600">
            Aug 24, 2025 06:30 PDT
          </Text>
        </VStack>

        <Text>15.00 mi</Text>

        <VStack align="start" spacing={0}>
          <Text>987.31 mi</Text>
          <Text fontSize="12px" color="gray.600">
            10h 1m
          </Text>
        </VStack>

        <VStack align="start" spacing={0}>
          <Text fontWeight="600">$1,000.00</Text>
          <Text fontSize="12px" color="gray.600">
            $1.00/mi
          </Text>
        </VStack>

        <Text>$0.00</Text>
        <Text>AMRIDDIN KAMARIDDINOV</Text>
      </Box>

      {/* Second Data Row - Company Info + Inputs */}

      <Box m="16px" borderRadius="12px" border="1px solid #E9EAEB">
        <Box
          display="grid"
          gridTemplateColumns={gridTemplate}
          borderBottom="1px solid #E9EAEB"
          px="12px"
          py="14px"
          alignItems="center"
          fontSize="14px">
          <Box display="flex" alignItems="center">
            <Box
              w="20px"
              h="20px"
              bg="#22C55E"
              borderRadius="50%"
              color="white"
              fontSize="12px"
              fontWeight="600"
              display="flex"
              alignItems="center"
              justifyContent="center">
              1
            </Box>
          </Box>

          <VStack align="start" spacing={0}>
            <Text fontWeight="600">BIMBO BAKERIES</Text>
            <Text fontSize="12px" color="gray.600">
              APT # BBAB20816
            </Text>
          </VStack>

          <Box display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="16px">→</Text>
          </Box>

          <VStack align="start" spacing={0}>
            <Text fontWeight="600">ASPIRE BAKERRY</Text>
            <Text fontSize="12px" color="gray.600">
              APT # BBAB20816
            </Text>
          </VStack>

          <Input
            size="sm"
            defaultValue="15"
            w="70px"
            fontSize="13px"
            borderColor="#E9EAEB"
          />

          <Input
            size="sm"
            defaultValue="987..."
            w="90px"
            fontSize="13px"
            borderColor="#E9EAEB"
          />

          <Input
            size="sm"
            defaultValue="$1000"
            w="90px"
            fontSize="13px"
            borderColor="#E9EAEB"
          />

          <Text color="gray.400">-</Text>
          <Text>AMRIDDIN KAMARIDDINOV</Text>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={detailedGridTemplate}
          borderBottom="1px solid #E9EAEB"
          bg="#FAFAFA"
          px="12px"
          py="13px"
          alignItems="center">
          {detailedStopsHeadings.map((heading) => (
            <Text
              key={heading.key}
              fontSize="11px"
              fontWeight="500"
              color="gray.700">
              {heading.label}
            </Text>
          ))}
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={detailedGridTemplate}
          borderBottom="1px solid #E9EAEB"
          px="12px"
          py="14px"
          alignItems="center"
          fontSize="14px">
          <HStack align="start">
            <Box
              w="20px"
              h="20px"
              bg="#22C55E"
              borderRadius="50%"
              color="white"
              fontSize="12px"
              fontWeight="600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={2}>
              1
            </Box>
          </HStack>

          <HStack align="start">
            <VStack align="start" spacing={0}>
              <Text>4545 East 51st Avenue</Text>
              <Text fontSize="12px" color="gray.600">
                Denver, CO 80216 US
              </Text>
            </VStack>
          </HStack>

          <HStack align="start">
            <Box
              w="20px"
              h="20px"
              bg="#22C55E"
              borderRadius="50%"
              color="white"
              fontSize="12px"
              fontWeight="600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={2}>
              2
            </Box>
          </HStack>

          <HStack align="start">
            <Text>Aug 14, 2025, 07:00 MDT</Text>
          </HStack>

          <Text color="gray.400">-</Text>
          <Text color="gray.400">-</Text>

          <VStack align="start" spacing={0}>
            <Text>Dry Load/Hook & Drop</Text>
            <Text fontSize="12px" color="gray.600">
              53' Dry Van/Required
            </Text>
          </VStack>

          <Text>0</Text>

          <VStack align="start" spacing={0}>
            <Text>0</Text>
            <Text fontSize="12px" color="gray.600">
              Tarps: No
            </Text>
          </VStack>

          <Text color="gray.400">-</Text>
          <Text color="gray.400">-</Text>
        </Box>

        <Box bg="#FAFAFA" p={4}>
          <HStack justify="space-between" align="center" spacing={8}>
            <Text fontSize="13px" color="gray.700">
              Remit payment to{" "}
              <Link color="blue.500" fontSize="13px" fontWeight="500">
                RTS
              </Link>
            </Text>
            <Text fontSize="13px" color="gray.700">
              Created on{" "}
              <Link color="blue.500" fontSize="13px" fontWeight="500">
                Aug 13, 2025, 17:48 EDT
              </Link>
            </Text>
            <Text fontSize="13px" color="gray.700">
              Booked by{" "}
              <Link color="blue.500" fontSize="13px" fontWeight="500">
                John Said
              </Link>
            </Text>
            <Text fontSize="13px" color="gray.700">
              Last Updated{" "}
              <Link color="blue.500" fontSize="13px" fontWeight="500">
                Aug 13, 2025, 17:48 EDT
              </Link>
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default DoubleTable;
