import React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import styles from "../../styles/tabs.module.scss";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import HistoryTab from "./Tabs/HistoryTab";
import TransitTab from "./Tabs/TransitTab.jsx";
import UpcomingTab from "./Tabs/UpcomingTab";

const Trips = () => {
  return (
    <>
      <Flex flexDir={"column"} gap={"20px"}>
        <HeadBreadCrumb />
        <Box h={"32px"}>
          <Text
            h={"32px"}
            color={"#181D27"}
            fontWeight={"600"}
            fontSize={"24px"}>
            Trips
          </Text>
        </Box>

        <Tabs className={styles.tabsContainer}>
          <TabList>
            <Tab>Upcoming</Tab>
            <Tab>In Transit</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanel>
            <UpcomingTab />
          </TabPanel>
          <TabPanel>
            <TransitTab />
          </TabPanel>
          <TabPanel>
            <HistoryTab />
          </TabPanel>
        </Tabs>
      </Flex>
    </>
  );
};

export default Trips;
