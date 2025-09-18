import {Badge, Box, Button, Flex, Text, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import FiltersComponent from "../../components/FiltersComponent";
import tripsService from "../../services/tripsService";
import styles from "./style.module.scss";
import StopsComponent from "./components/StopsComponent";
import RouteInfoComponent from "./components/RouteInfoComponent";
import LiveMapComponent from "./components/LiveMapComponent";

function GeneralTripsTab() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [showTripDetail, setShowTripDetail] = useState(true);

  const {
    data: tripData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip-details", id],
    queryFn: () => tripsService.getTripDetails(id),
    enabled: !!id,
    select: (data) => data?.data?.response || data || {},
    refetchOnWindowFocus: false,
  });

  const handleNavigation = () => {
    console.log("Navigation clicked for trip:", id);
  };

  const handleTimeline = () => {
    console.log("Timeline clicked for trip:", id);
  };

  const handleFullScreen = () => {
    console.log("Full screen clicked for trip:", id);
  };

  return (
    <Box>
      <Button
        onClick={() => navigate("/admin/trips")}
        display={"flex"}
        alignItems={"center"}
        gap={"10px"}
        my={"20px"}
        h={"20px"}
        bg={"none"}
        p="0 0"
        border={"none"}
        _hover={{bg: "none"}}>
        <img src="/img/backArrow.svg" alt="edit" />
        <Text>Back to trips</Text>
      </Button>

      <FiltersComponent filterButton={true} actionButton={true} />

      <Flex
        mt="24px"
        gridTemplateColumns={"1fr 1fr 1fr"}
        borderRadius={"10px"}
        border={"1px solid #D5D7DA"}
        w={"100%"}>
        <Box borderRight={"1px solid #D5D7DA"} w="32%">
          <RouteInfoComponent />
        </Box>

        <Box w="32%" borderRight={"1px solid #D5D7DA"}>
          <StopsComponent tripData={tripData} isLoading={isLoading} />
        </Box>

        <Box w="36%" p="12px">
          <LiveMapComponent />
        </Box>
      </Flex>
    </Box>
  );
}

export default GeneralTripsTab;
