import React, { useMemo, useState } from "react";
import styles from "../style.module.scss";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import StopsRoute from "./StopsRoute";

function StopsComponent({ tripData = {} }) {
  return (
    <>
      <Flex
        w="100%"
        borderBottom={"1px solid #D5D7DA"}
        p={"20px"}>
        <Flex
          w="100%"
          h={"28px"}
          alignItems={"center"}
          gap={"10px"}
          justifyContent={"space-between"}>
          <Text
            color={"#181D27"}
            fontSize={"16px"}
            fontWeight={"600"}>
            Stop
          </Text>
          <Button
            minW={"20px"}
            h={"20px"}
            p="0"
            bg={"none"}
            _hover={{ bg: "none" }}>
            <img
              src="/img/threeDots.svg"
              alt="menu" />
          </Button>
        </Flex>
      </Flex>

      <Flex
        m={"20px"}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Button className={styles.stepsButton}>
          <img
            src="/img/datepicker.svg"
            alt="calendar" />
          <Text>Select dates</Text>
        </Button>
        <Button className={styles.stepsButton}>
          <img
            src="/img/filter-lines.svg"
            alt="" />
          <Text>Filters</Text>
        </Button>
      </Flex>

      <Box overflowX="hidden">
        {tripData?.trips_logs?.map((stop, index) => (
          <StopsRoute
            initialStops={tripData?.trips_logs}
            index={index}
            stop={stop}
          />
        ))}
      </Box>
    </>
  );
}

export default StopsComponent;
