import React from "react";
import CarrierElement from "../../components/CarrierElement";
import {Box, Flex, Spinner} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import tripsService from "@services/tripsService";
import {useSelector} from "react-redux";

const MyCarriers = () => {
  const envId = useSelector((state) => state.auth.environmentId);
  const brokersId = useSelector((state) => state.auth.user_data?.brokers_id);
  const {
    data: carriersData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["MY_CARRIERS"],
    queryFn: () =>
      tripsService.getList({
        app_id: "P-oyMjPNZutmtcfQSnv1Lf3K55J80CkqyP",
        environment_id: envId,
        method: "list",
        object_data: {
          broker_id: brokersId,
          own_carriers: true,
        },
        table: "carriers",
      }),
    select: (data) => data?.data?.response || [],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="calc(100vh - 100px)">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="#fff"
          color="#EF6820"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      mt="30px"
      gap={"20px"}>
      {carriersData.map((carrier) => (
        <CarrierElement key={carrier.guid} carrier={carrier} />
      ))}
    </Box>
  );
};

export default MyCarriers;
