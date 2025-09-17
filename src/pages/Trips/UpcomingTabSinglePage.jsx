import {Box, Badge, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import FiltersComponent from "../../components/FiltersComponent";
import tripsService from "../../services/tripsService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import styles from "../../styles/tabs.module.scss";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import GeneralTripsTab from "./GeneralTripsTab";

function UpcomingTabSinglePage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({key: "name", direction: "asc"});
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    const statusColors = {
      Active: "green",
      Pending: "yellow",
      Completed: "blue",
      Cancelled: "red",
      "In Progress": "orange",
    };
    return statusColors[status?.trim()] || "gray";
  };

  const getLoadEligibilityColor = (equipment) => {
    const equipmentColors = {
      Available: "green",
      "In Use": "red",
      Maintenance: "yellow",
      "Out of Service": "gray",
    };
    return equipmentColors[equipment?.trim()] || "gray";
  };

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
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
        search: searchTerm,
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

  const handleRowClick = (id) => {
    console.log("Trip clicked:", id);
    navigate(`/admin/trips/${id}`);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const totalPages = tripsData?.total
    ? Math.ceil(tripsData.total / pageSize)
    : 0;
  const trips = tripsData?.data || tripsData || [];

  return (
    <Box>
      <HeadBreadCrumb />

      <Box my={"20px"} h={"32px"}>
        <Text h={"32px"} color={"#181D27"} fontWeight={"600"} fontSize={"24px"}>
          Trips
        </Text>
      </Box>

      <Tabs className={styles.tabsContainer}>
        <TabList>
          <Tab>General Details</Tab>
          <Tab>History</Tab>
        </TabList>

        <TabPanel>
          <GeneralTripsTab />
        </TabPanel>
      </Tabs>
    </Box>
  );
}

export default UpcomingTabSinglePage;
