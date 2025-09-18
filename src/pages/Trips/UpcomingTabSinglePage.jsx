import {Box, Badge, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import FiltersComponent from "../../components/FiltersComponent";
import tripsService from "../../services/tripsService";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import styles from "../../styles/tabs.module.scss";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import GeneralTripsTab from "./GeneralTripsTab";

function UpcomingTabSinglePage() {
  const navigate = useNavigate();

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
