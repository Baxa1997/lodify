import React from "react";
import {Box, Text, Flex, Badge, Button} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {
  CTable,
  CTableHead,
  CTableTh,
  CTableBody,
  CTableTd,
} from "@components/tableElements";
import CTableRow from "@components/tableElements/CTableRow";
import tripsService from "@services/tripsService";
import {parseISO, format} from "date-fns";

const TripRowDetails = ({trip = {}, handleRowClick, isExpanded = true}) => {
  const envId = useSelector((state) => state.auth.environmentId);
  console.log("trip======>", trip);
  const {
    data: detailedTripData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["TRIP_DETAILS", trip.guid, envId],
    queryFn: () => {
      return tripsService.getTripById({
        app_id: "P-oyMjPNZutmtcfQSnv1Lf3K55J80CkqyP",
        environment_id: envId,
        method: "single",
        object_data: {
          trip_id: trip.guid,
        },
        table: "trips_dashboard",
      });
    },
    enabled: !!trip.guid && !!envId && isExpanded,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
    select: (res) => res?.data?.response?.[0] || {},
  });

  function formatScheduleDate(isoString) {
    try {
      const date = parseISO(isoString);
      return `Sch. ${format(date, "dd MMM, HH:mm")}`;
    } catch (error) {
      return "";
    }
  }

  function getLoadTypeColor(loadType) {
    switch (loadType?.toLowerCase()) {
      case "Dry":
        return "#14B8A6";
      case "Refrigerated":
        return "#F59E0B";
      case "Temperature Controlled":
        return "#1E40AF";
      case "Other":
        return "#6B7280";
      case "Preloaded":
        return "#F59E0B";
      case "Drop":
        return "#1E40AF";
      default:
        return "#6B7280";
    }
  }

  if (!trip) {
    return (
      <Box p="8px 20px" bg="#f8f9fa">
        <Text fontSize="14px" color="#6b7280">
          No trip data available
        </Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box p="8px 20px" bg="#f8f9fa">
        <Text fontSize="14px" color="#6b7280">
          Loading trip details...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="8px 20px" bg="#f8f9fa">
        <Text fontSize="14px" color="#red.500">
          Error loading trip details: {error?.message || "Unknown error"}
        </Text>
      </Box>
    );
  }

  const tripData = detailedTripData?.data?.response || detailedTripData || trip;

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

  console.log("tripDatatripData", tripData);

  return (
    <Box bg="#fff" minHeight="200px" position="relative">
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
            {tripData?.pickups?.map((item) => (
              <CTableRow key={item?.guid} hover={false}>
                <CTableTd py="12px" px="20px">
                  <Box>
                    <TripStatus status={item?.index} />
                    <Text
                      my="8px"
                      fontSize="16px"
                      fontWeight="400"
                      color="#181d27">
                      {`${item?.address}, ${item?.state}, ${item?.zip_code}`}
                    </Text>
                    <Text fontSize="12px" color="#6b7280">
                      {formatScheduleDate(item?.arrive_by)}
                    </Text>
                  </Box>
                </CTableTd>

                <CTableTd py="12px" px="20px">
                  <Flex mb={"8px"} fontSize="14px" color="#181d27">
                    <Text color={"#414651"} fontWeight={"500"}>
                      Tractor Unit #
                    </Text>
                    <Text>{item?.tractors?.plate_number}</Text>
                  </Flex>

                  <Flex mb={"8px"} fontSize="14px" color="#181d27">
                    <Text color={"#414651"} fontWeight={"500"}>
                      Tractor ID
                    </Text>
                    <Text>{item?.tractors?.external_id}</Text>
                  </Flex>

                  <Flex alignItems={"center"} gap={"8px"}>
                    <Text color={"#414651"} fontWeight={"500"}>
                      53' Reefer
                    </Text>
                    <TripDriverVerification trip={item} />
                  </Flex>
                </CTableTd>

                <CTableTd py="12px" px="20px">
                  <Box>
                    <Badge
                      bg={getLoadTypeColor(item?.load_type?.[0])}
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="12px"
                      fontWeight="500">
                      {item?.load_type?.[0] || "N/A"}
                    </Badge>
                  </Box>
                </CTableTd>

                <CTableTd py="12px" px="20px">
                  <Box>
                    <Text
                      fontSize="14px"
                      fontWeight="400"
                      color="#181d27"
                      mb={1}>
                      {`${item?.address}, ${item?.state}, ${item?.zip_code}`}
                    </Text>
                    <Text fontSize="12px" color="#6b7280">
                      {formatScheduleDate(item?.arrive_by)}
                    </Text>
                  </Box>
                </CTableTd>

                <CTableTd py="12px" px="20px">
                  <Text fontSize="14px" color="#181d27">
                    {tripData?.duration}
                  </Text>
                </CTableTd>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </Box>

      <Box
        position="sticky"
        bottom={0}
        left={0}
        right={0}
        width="100%"
        bg="#fff"
        px="20px"
        py="10px"
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

const TripStatus = ({
  status,
  onExpand = () => {},
  tripId = "",
  rowClick = () => {},
}) => {
  return (
    <Flex
      onClick={(e) => {
        e.stopPropagation();
        onExpand(tripId, e);
      }}
      alignItems="center"
      justifyContent="center"
      flexDirection="row-reverse"
      w="36px"
      gap="4px"
      p="2px 8px"
      borderRadius="100px"
      border="1px solid #B2DDFF"
      cursor="pointer">
      <Text fontSize="12px" fontWeight="500" color="#175CD3">
        {status || 1}
      </Text>
      {status !== 0 && <img src="/img/statusArrow.svg" alt="" />}
    </Flex>
  );
};

const TripDriverVerification = ({trip = {}}) => {
  return (
    <Flex gap="24px" alignItems="center">
      <Box w="22px" h="22px">
        {trip?.equipment_type === "Power Only" ? (
          trip?.is_truck_verified ? (
            <img
              src="/img/verifiedFullTruck.svg"
              alt="powerOnly"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <img
              src="/img/unverifiedFullTruck.svg"
              alt="powerOnly"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )
        ) : trip?.is_truck_verified ? (
          <img
            src="/img/verifiedEmptyTruck.svg"
            alt="truck"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <img
            src="/img/unverifiedEmptyTruck.svg"
            alt="truck"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        w="44px"
        h="27px"
        p="5px"
        gap="4px"
        bg={trip?.is_driver_verified ? "#DEFFEE" : "#EDEDED"}
        borderRadius="16px">
        <Box w="17px" h="17px">
          {trip?.driver_type?.[0] === "Team" &&
            (trip?.is_driver_verified ? (
              <img
                src="/img/unverifiedSecondDriver.svg"
                alt="driver"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <img
                src="/img/unvSecondDriver.svg"
                alt="driver"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ))}
        </Box>
        <Box w="17px" h="17px">
          {trip?.is_driver_verified ? (
            <img
              src="/img/driverVerified.svg"
              alt="driver"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <img
              src="/img/unverifiedDriver.svg"
              alt="driver"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TripRowDetails;
