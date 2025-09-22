import {Box, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import styles from "../../styles/tabs.module.scss";
import HistoryTripsTab from "./Tabs/HistoryTripsTab";
import HeadBreadCrumb from "@components/HeadBreadCrumb";
import GeneralTripsTab from "./Tabs/GeneralsTripTab";

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

        <TabPanel>
          <HistoryTripsTab />
        </TabPanel>
      </Tabs>
    </Box>
  );
}

export default UpcomingTabSinglePage;
