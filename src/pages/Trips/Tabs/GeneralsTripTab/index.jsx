import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import tripsService from "@services/tripsService";
import FiltersComponent from "@components/FiltersComponent";
import RouteInfoComponent from "../../components/RouteInfoComponent";
import StopsComponent from "../../components/StopsComponent";
import LiveMapComponent from "../../components/LiveMapComponent";

function GeneralTripsTab({ tripData = {}, isLoading = false }) {
  const navigate = useNavigate();

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
        _hover={{ bg: "none" }}>
        <img
          src="/img/backArrow.svg"
          alt="edit" />
        <Text>Back to trips</Text>
      </Button>

      <FiltersComponent
        filterButton={true}
        actionButton={true} />

      <Flex
        mt="24px"
        gridTemplateColumns={"1fr 1fr 1fr"}
        borderRadius={"10px"}
        border={"1px solid #D5D7DA"}
        w={"100%"}>
        <Box
          borderRight={"1px solid #D5D7DA"}
          w="32%">
          <RouteInfoComponent tripData={tripData || {}} />
        </Box>

        <Box
          w="32%"
          borderRight={"1px solid #D5D7DA"}>
          <StopsComponent
            tripData={tripData || {}}
            isLoading={isLoading || false}
          />
        </Box>

        <Box
          w="36%"
          p="12px">
          <LiveMapComponent tripData={tripData || {}} />
        </Box>
      </Flex>
    </Box>
  );
}

export default GeneralTripsTab;
