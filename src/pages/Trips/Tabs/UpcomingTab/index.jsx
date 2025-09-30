import {Box, Badge, Text, Flex} from "@chakra-ui/react";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {format, isValid} from "date-fns";
import tripsService from "@services/tripsService";
import tableElements from "../../components/mockElements";
import {
  CTable,
  CTableHead,
  CTableTh,
  CTableBody,
  CTableTd,
} from "@components/tableElements";
import CTableRow from "@components/tableElements/CTableRow";
import TripsFiltersComponent from "../../modules/TripsFiltersComponent";

function UpcomingTab() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({key: "name", direction: "asc"});
  const [searchTerm, setSearchTerm] = useState("");
  const envId = useSelector((state) => state.auth.environmentId);

  const getLoadTypeColor = (loadType) => {
    const loadTypeColors = {
      Preloaded: "orange",
      Live: "green",
      Drop: "blue",
    };

    return loadTypeColors[loadType?.trim()] || "gray";
  };

  const {
    data: tripsData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["TRIPS_LIST", currentPage, pageSize, sortConfig, searchTerm],
    queryFn: () =>
      tripsService.getList({
        app_id: "P-oyMjPNZutmtcfQSnv1Lf3K55J80CkqyP",
        environment_id: envId,
        method: "list",
        object_data: {
          search: searchTerm,
          limit: pageSize,
          page: (currentPage - 1) * pageSize,
        },
        table: "trips",
      }),
    select: (data) => data?.data?.response || [],
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const handleRowClick = (id, trip) => {
    navigate(`/admin/trips/${id}`, {
      state: {
        label: `${trip?.drivers?.first_name?.[0]}.${trip?.drivers?.last_name}`,
      },
    });
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  function formatToLongWeekday(dateInput) {
    const date = new Date(dateInput);

    if (!isValid(date)) {
      return null;
    }

    return format(date, "EEEE, d MMMM");
  }

  const totalPages = tripsData?.total
    ? Math.ceil(tripsData.total / pageSize)
    : 0;
  const trips = tripsData?.data || tripsData || [];

  return (
    <Box mt={"26px"}>
      <TripsFiltersComponent
        filterButton={true}
        actionButton={true}
        actionButtonText="Add Trip"
        onActionButtonClick={() => navigate("/admin/trips/add-trip")}
        onSearch={handleSearch}
        searchValue={searchTerm}
      />

      <Box mt={6}>
        <CTable
          width="100%"
          height="calc(100vh - 320px)"
          overflow="auto"
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}>
          <CTableHead>
            <Box as={"tr"}>
              {tableElements.map((element) => (
                <CTableTh
                  sortable={element.sortable}
                  sortDirection={
                    sortConfig.key === element.key ? sortConfig.direction : null
                  }
                  key={element.id}
                  onSort={() => handleSort(element.key)}>
                  {element.name}
                </CTableTh>
              ))}
            </Box>
          </CTableHead>

          <CTableBody>
            {isLoading ? (
              <CTableRow>
                <CTableTd
                  colSpan={tableElements.length}
                  textAlign="center"
                  py={8}>
                  Loading trips...
                </CTableTd>
              </CTableRow>
            ) : error ? (
              <CTableRow>
                <CTableTd
                  colSpan={tableElements.length}
                  textAlign="center"
                  py={8}
                  color="red.500">
                  Error loading trips: {error?.message || "Unknown error"}
                </CTableTd>
              </CTableRow>
            ) : trips.length === 0 ? (
              <CTableRow>
                <CTableTd
                  colSpan={tableElements.length}
                  textAlign="center"
                  py={8}>
                  No trips found
                </CTableTd>
              </CTableRow>
            ) : (
              trips?.map((trip, index) => (
                <CTableRow
                  key={trip.id || index}
                  style={{
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(trip.guid, trip)}>
                  <CTableTd>{trip.customer || ""}</CTableTd>
                  <CTableTd minWidth="180px">
                    <Flex gap="24px" alignItems="center">
                      <Text color="#181D27">{trip.id || ""}</Text>
                      <TripStatus status="1" />
                    </Flex>
                  </CTableTd>
                  <CTableTd>
                    <Flex alignItems="center" gap="16px">
                      <Box>
                        <Text
                          h="20px"
                          fontSize="14px"
                          fontWeight="500"
                          color="#181D27">
                          {" "}
                          {`${trip.origin?.[0]?.address ?? ""} / ${
                            trip?.origin?.[0]?.address_2 ?? ""
                          }` || ""}
                        </Text>
                        <Text h="20px">
                          {(() => {
                            const rawDate = trip?.origin?.[0]?.date;
                            const time = trip?.origin?.[0]?.time ?? "";
                            const formattedDate = rawDate
                              ? formatToLongWeekday(rawDate, "en-US")
                              : null;

                            return formattedDate
                              ? `${formattedDate}, ${time}`
                              : "";
                          })()}
                        </Text>
                      </Box>
                      <TripStatus status="1" />
                    </Flex>
                  </CTableTd>
                  <CTableTd>
                    <Box>
                      <Flex gap="16px" alignItems="center">
                        <Box>
                          <Text
                            h="20px"
                            fontSize="14px"
                            fontWeight="500"
                            color="#181D27">
                            {" "}
                            {`${trip.stops?.[0]?.address ?? ""} / ${
                              trip?.stops?.[0]?.address_2 ?? ""
                            }` || ""}
                          </Text>
                          <Text h="20px">
                            {(() => {
                              const rawDate = trip?.stops?.[0]?.date;
                              const time = trip?.stops?.[0]?.time ?? "";
                              const formattedDate = rawDate
                                ? formatToLongWeekday(rawDate, "en-US")
                                : null;

                              return formattedDate
                                ? `${formattedDate}, ${time}`
                                : "";
                            })()}
                          </Text>
                        </Box>
                        <TripStopStatus status="1" />
                      </Flex>
                    </Box>
                  </CTableTd>
                  <CTableTd>{trip?.assets?.external_id ?? ""}</CTableTd>
                  <CTableTd>
                    <Box>
                      <Text h="20px">
                        {trip?.destination_miles
                          ? `${trip?.destination_miles} mi`
                          : "0 mi"}
                      </Text>
                      <Text h="20px">{trip?.destination_time ?? ""}</Text>
                    </Box>
                  </CTableTd>
                  <CTableTd>
                    <Text
                      h="20px"
                      fontSize="14px"
                      fontWeight="500"
                      color="#535862">
                      {trip?.assets?.type?.[0] ?? ""}
                    </Text>
                  </CTableTd>
                  <CTableTd>
                    <Badge
                      colorScheme={getLoadTypeColor(trip.load_type?.[0] ?? "")}
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="12px"
                      fontWeight="500">
                      {trip.load_type?.[0] ?? ""}
                    </Badge>
                  </CTableTd>
                  <CTableTd>
                    <Flex alignItems="center" justifyContent="center" gap="4px">
                      <Box
                        w="13px"
                        h="13px"
                        borderRadius="50%"
                        bg="#FF5B04"></Box>
                      <Box
                        w="13px"
                        h="13px"
                        borderRadius="50%"
                        bg="#00707A"></Box>
                      <Box
                        w="13px"
                        h="13px"
                        borderRadius="50%"
                        bg="#003B63"></Box>
                    </Flex>
                  </CTableTd>
                  <CTableTd>
                    <Text color="#EF6820" fontWeight="600">
                      Assign
                    </Text>
                  </CTableTd>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </Box>
    </Box>
  );
}

const TripStatus = ({status}) => {
  return (
    <Flex
      flexDirection="row-reverse"
      w="36px"
      gap="4px"
      p="2px 8px"
      borderRadius="100px"
      border="1px solid #B2DDFF">
      <Text fontSize="12px" fontWeight="500" color="#175CD3">
        1
      </Text>
      <img src="/img/statusArrow.svg" alt="" />
    </Flex>
  );
};

const TripStopStatus = ({status = "active"}) => {
  const statusColors = {
    active: {bg: "#DEFFEE", icon: "#079455"},
    inactive: {bg: "#EDEDED", icon: "#079455"},
    warning: {bg: "#FFF5E5", icon: "#079455"},
  };

  const {bg, icon} = statusColors[status] || statusColors.active;

  return (
    <Flex gap="24px" alignItems="center">
      <Box w="22px" h="22px">
        <img
          src="/img/truck.svg"
          alt="truck"
          style={{
            width: "100%",
            height: "100%",
            filter: `drop-shadow(0 0 0 ${icon}) saturate(1000%)`,
          }}
        />
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        w="44px"
        h="27px"
        p="5px"
        gap="4px"
        bg={bg}
        borderRadius="16px">
        <Box w="17px" h="17px">
          <img
            src="/img/driverVerified.svg"
            alt="driver"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box w="17px" h="17px">
          <img
            src="/img/driverVerified.svg"
            alt="driver"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default UpcomingTab;
