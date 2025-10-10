import React from "react";
import {Box, Flex, Text, Button} from "@chakra-ui/react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import styles from "../../styles/tabs.module.scss";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import HistoryTab from "./Tabs/HistoryTab";
import TransitTab from "./Tabs/TransitTab.jsx";
import UpcomingTab from "./Tabs/UpcomingTab";
import AddTripMenu from "./modules/AddTripMenu";
import ActionsNeeded from "./Tabs/ActionsNeeded";
import {useSelector} from "react-redux";

const Trips = () => {
  const clientType = useSelector((state) => state.auth.clientType);

  return (
    <>
      <Flex flexDir={"column"} gap={"20px"}>
        <HeadBreadCrumb />
        {clientType?.id === "96ef3734-3778-4f91-a4fb-d8b9ffb17acf" && (
          <AddTripMenu />
        )}

        <Tabs className={styles.tabsContainer}>
          <TabList>
            <Tab>Actions Needed</Tab>
            <Tab>Upcoming</Tab>
            <Tab>In Transit</Tab>
            <Tab>Completed</Tab>
          </TabList>

          <TabPanel>
            <ActionsNeeded />
          </TabPanel>
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
