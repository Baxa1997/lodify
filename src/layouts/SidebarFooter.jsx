import {Box, Flex, Text} from "@chakra-ui/react";
import styles from "./AdminLayout.module.scss";
import React from "react";

const SidebarFooter = () => {
  return (
    <div className={styles.sidebarFooter}>
      <Flex p={"8px 12px"} gap={"8px"} h={"40px"} mb={"16px"}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <img src="/img/setting.svg" alt="" />
        </Flex>
        <Box>
          <Text fontSize={"16px"} fontWeight={"600"} color={"#CECFD2"}>
            Settings
          </Text>
        </Box>
      </Flex>
      <Flex
        position={"relative"}
        bg={"#12161C"}
        alignItems={"center"}
        gap={"8px"}
        borderRadius={"12px"}
        border={"1px solid #22262F"}
        p={"8px 12px"}
        h={"64px"}>
        <Box
          cursor={"pointer"}
          position={"absolute"}
          right={"12px"}
          top={"12px"}>
          <img src="/img/chevron.svg" alt="" />
        </Box>
        <Box
          w={"40px"}
          h={"40px"}
          bg={"#22262F"}
          borderRadius={"50%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          color={"#94979C"}
          fontWeight={"600"}
          fontSize={"16px"}>
          J
        </Box>
        <Flex flexDirection={"column"} gap={"0px"}>
          <Text fontSize={"14px"} fontWeight={"600"} color={"#fff"}>
            Javlon
          </Text>
          <Text fontSize={"14px"} fontWeight={"400"} color={"#94979C"}>
            javlon@lodify.com
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default SidebarFooter;
