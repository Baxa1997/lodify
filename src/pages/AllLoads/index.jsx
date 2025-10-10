import React from "react";
import {Flex, Text} from "@chakra-ui/react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import tabsStyles from "../../styles/tabs.module.scss";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import ActiveTrips from "./modules/ActiveTrips";
import ClosedTrips from "./modules/ClosedTrips";
import {useSelector} from "react-redux";

const AllLoads = () => {
  const clientType = useSelector((state) => state.auth.clientType);
  console.log("clientTypeclientType", clientType);
  return (
    <>
      <Flex flexDir={"column"} gap={"20px"}>
        <HeadBreadCrumb />

        <Text h={"32px"} color={"#181D27"} fontWeight={"600"} fontSize={"24px"}>
          Tender Invitations
        </Text>

        <Tabs className={tabsStyles.tabsContainer}>
          <TabList>
            <Tab>Active</Tab>
            <Tab>Closed</Tab>
          </TabList>

          <TabPanel>
            <ActiveTrips />
          </TabPanel>
          <TabPanel>
            <ClosedTrips />
          </TabPanel>
        </Tabs>
      </Flex>
    </>
  );
};

export default AllLoads;
