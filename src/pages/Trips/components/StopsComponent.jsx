import React, {useMemo, useState} from "react";
import styles from "../style.module.scss";
import {Box, Text, Button, Flex} from "@chakra-ui/react";
import StopsRoute from "./StopsRoute";

const initialStops = [
  {
    address: "asdf dsaf sdfa asdf ",
    city: "qattadur",
    country: "qatdur ",
    date_time: "2025-09-01T03:45:00",
    files: null,
    images: [
      "https://cdn.u-code.io/3cab0a2e-1d20-40a1-8b46-8b4d1a66f2f1/media/4989a90b-b7f4-4470-886d-a98b5b6f488e_Screenshotfrom2025-09-1707-53-58.png",
    ],
    location: null,
    note: "asdfasdfda dfas dfasd ",
    status: ["Arrival"],
  },
  {
    address: "asdf",
    city: "asdf",
    country: "asdf",
    date_time: "2025-09-02T02:50:00",
    files: [
      "https://cdn.u-code.io/3cab0a2e-1d20-40a1-8b46-8b4d1a66f2f1/media/112b6e70-1cc7-4ca8-8ddf-106f9e3b3ed2_Screenshotfrom2025-09-1516-12-20.png",
    ],
    images: null,
    location: null,
    note: "nma",
    status: ["Stopped"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-03T03:51:00",
    files: null,
    images: null,
    location: null,
    note: "asdfdf",
    status: ["Departure"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-04T04:32:00",
    files: null,
    images: null,
    location: null,
    note: "asdfasdfsadfsad dsfa dsf sdfa ",
    status: ["Stopped"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-05T04:34:00",
    files: null,
    images: null,
    location: null,
    note: null,
    status: ["Arrival"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-06T04:34:00",
    files: null,
    images: null,
    location: null,
    note: "nmadur note nmadur note 111",
    status: null,
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-07T04:35:00",
    files: null,
    images: null,
    location: null,
    note: "note note note 22",
    status: null,
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-08T04:35:00",
    files: null,
    images: null,
    location: null,
    note: "",
    status: ["Departure"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-09T04:35:00",
    files: null,
    images: null,
    location: null,
    note: "",
    status: ["Stopped"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-10T04:36:00",
    files: null,
    images: null,
    location: null,
    note: null,
    status: ["Arrival"],
  },
  {
    address: "dd",
    city: "dddddd",
    country: "ddd",
    date_time: "2025-09-19T03:51:00",
    files: null,
    images: null,
    location: null,
    note: "kimdur",
    status: ["Completed"],
  },
];

function StopsComponent() {
  return (
    <>
      <Flex w="100%" borderBottom={"1px solid #D5D7DA"} p={"20px"}>
        <Flex
          w="100%"
          h={"28px"}
          alignItems={"center"}
          gap={"10px"}
          justifyContent={"space-between"}>
          <Text color={"#181D27"} fontSize={"16px"} fontWeight={"600"}>
            Stop
          </Text>
          <Button
            minW={"20px"}
            h={"20px"}
            p="0"
            bg={"none"}
            _hover={{bg: "none"}}>
            <img src="/img/threeDots.svg" alt="menu" />
          </Button>
        </Flex>
      </Flex>

      <Flex m={"20px"} alignItems={"center"} justifyContent={"space-between"}>
        <Button className={styles.stepsButton}>
          <img src="/img/datepicker.svg" alt="calendar" />
          <Text>Select dates</Text>
        </Button>
        <Button className={styles.stepsButton}>
          <img src="/img/filter-lines.svg" alt="" />
          <Text>Filters</Text>
        </Button>
      </Flex>

      <Box overflowX="hidden">
        {initialStops.map((stop, index) => (
          <StopsRoute initialStops={initialStops} index={index} stop={stop} />
        ))}
      </Box>
    </>
  );
}

export default StopsComponent;
