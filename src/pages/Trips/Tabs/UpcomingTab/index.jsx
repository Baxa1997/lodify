import {Box, Badge, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {format, isValid} from "date-fns";
import tripsService from "@services/tripsService";
import FiltersComponent from "@components/FiltersComponent";
import tableElements from "../../components/mockElements";
import {
  CTable,
  CTableHead,
  CTableTh,
  CTableBody,
  CTableTd,
} from "@components/tableElements";
import CTableRow from "@components/tableElements/CTableRow";

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
      <FiltersComponent
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
                  <CTableTd>{trip.id || ""}</CTableTd>
                  <CTableTd>
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
                  </CTableTd>
                  <CTableTd>
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
                  <CTableTd>{trip.rate || 0}</CTableTd>
                  <CTableTd>{trip.drivers?.first_name || ""}</CTableTd>
                  <CTableTd>{trip.loads || 0}</CTableTd>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </Box>
    </Box>
  );
}

export default UpcomingTab;
