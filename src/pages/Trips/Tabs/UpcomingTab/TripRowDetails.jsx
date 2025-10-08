import React from "react";
import {Box, Text, Flex, Badge, Button} from "@chakra-ui/react";
import {
  CTable,
  CTableHead,
  CTableTh,
  CTableBody,
  CTableTd,
} from "@components/tableElements";
import CTableRow from "@components/tableElements/CTableRow";
import {formatDate} from "@utils/dateFormats";

const TripRowDetails = ({trip = {}, handleRowClick}) => {
  if (!trip) {
    return (
      <Box p="8px 20px" bg="#f8f9fa">
        <Text fontSize="14px" color="#6b7280">
          No trip data available
        </Text>
      </Box>
    );
  }

  const tableHeads = [
    {
      index: 0,
      label: "Pick Up",
      key: "pick_up",
    },
    {
      index: 1,
      label: "Equipment",
      key: "equipment",
    },
    {
      index: 2,
      label: "Load Type",
      key: "load_type",
    },
    {
      index: 3,
      label: "Arrival",
      key: "arrival",
    },
    {
      index: 4,
      label: "ETA",
      key: "eta",
    },
  ];

  const getMinHeight = () => {
    const baseHeight = 60;
    const rowHeight = 50;
    const minRows = 1;
    const padding = 16;

    return `${baseHeight + minRows * rowHeight + padding}px`;
  };

  const getTripData = () => {
    return {
      pickup: {
        address:
          `${trip.origin?.[0]?.address || ""} ${
            trip?.origin?.[0]?.address_2 || ""
          }`.trim() || "N/A",
        date: trip?.origin?.[0]?.depart_at
          ? formatDate(trip.origin[0].depart_at)
          : "N/A",
      },
      equipment: trip?.origin?.[0]?.equipment_type || "N/A",
      loadType: trip?.origin?.[0]?.load_type?.[0] || "N/A",
      arrival: {
        address:
          `${trip.stop?.[0]?.address || ""} ${
            trip?.stop?.[0]?.address_2 || ""
          }`.trim() || "N/A",
        date: trip?.stop?.[0]?.arrive_by
          ? formatDate(trip.stop[0].arrive_by)
          : "N/A",
      },
      eta: trip?.duration || "N/A",
    };
  };

  const tripData = getTripData();

  return (
    <Box
      bg="#fff"
      borderTop="1px solid #e5e7eb"
      minHeight="200px"
      position="relative">
      <Box
        p="8px 20px"
        pb="0px"
        overflowX="auto"
        sx={{
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#c1c1c1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#a8a8a8",
          },
        }}>
        <CTable
          minHeight={getMinHeight()}
          isPagination={false}
          width="100%"
          overflow="visible"
          borderColor="#fff"
          borderRadius="8px"
          bg="white">
          <CTableHead borderRadius="8px 8px 0 0" bg="#fff">
            <CTableRow>
              {tableHeads?.map((head) => (
                <CTableTh
                  maxW="334px"
                  width="334px"
                  minW="334px"
                  key={head.index}
                  bg="#fff"
                  py="6px"
                  px="20px"
                  fontSize="14px"
                  fontWeight="600"
                  color="#181d27"
                  borderBottom="1px solid #e5e7eb">
                  {head.label}
                </CTableTh>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow hover={false}>
              <CTableTd py="12px" px="20px">
                <Box>
                  <Text fontSize="14px" fontWeight="500" color="#181d27" mb={1}>
                    {tripData.pickup.address}
                  </Text>
                  <Text fontSize="12px" color="#6b7280">
                    {tripData.pickup.date}
                  </Text>
                </Box>
              </CTableTd>
              <CTableTd py="12px" px="20px">
                <Text fontSize="14px" color="#181d27">
                  {tripData.equipment}
                </Text>
              </CTableTd>
              <CTableTd py="12px" px="20px">
                <Badge
                  colorScheme="blue"
                  variant="subtle"
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="12px">
                  {tripData.loadType}
                </Badge>
              </CTableTd>
              <CTableTd py="12px" px="20px">
                <Box>
                  <Text fontSize="14px" fontWeight="500" color="#181d27" mb={1}>
                    {tripData.arrival.address}
                  </Text>
                  <Text fontSize="12px" color="#6b7280">
                    {tripData.arrival.date}
                  </Text>
                </Box>
              </CTableTd>
              <CTableTd py="12px" px="20px">
                <Text fontSize="14px" color="#181d27">
                  {tripData.eta}
                </Text>
              </CTableTd>
            </CTableRow>
          </CTableBody>
        </CTable>
      </Box>

      {/* SUB ACTIONS - Fixed at bottom, Full Width, Not Scrollable */}
      <Box
        position="sticky"
        bottom={0}
        left={0}
        right={0}
        width="100%"
        bg="#fff"
        px="20px"
        zIndex={10}>
        <Flex
          maxWidth="1275px"
          gap="12px"
          justifyContent="space-between"
          alignItems="center">
          <Button
            bg="#fff"
            color="#EF6820"
            border="1px solid #f7b27a"
            borderRadius="8px"
            fontSize="14px"
            fontWeight="600"
            px="16px"
            py="8px">
            View Shipment Details
          </Button>

          <Flex gap="8px">
            <Button
              h="40px"
              variant="outline"
              leftIcon={
                <img src="/img/collab.svg" alt="" width="16" height="16" />
              }
              fontSize="14px"
              border="1px solid #f2b27a"
              color="#EF6820"
              fontWeight="600">
              Collaboration
            </Button>
            <Button
              _hover={{bg: "#EF6820"}}
              onClick={(e) => {
                e.stopPropagation();
                handleRowClick(trip.guid, trip);
              }}
              variant="outline"
              h="40px"
              fontSize="14px"
              fontWeight="600"
              bg="#EF6820"
              color="white">
              More details
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default TripRowDetails;
