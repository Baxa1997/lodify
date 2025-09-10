import React from "react";
import styles from "./style.module.scss";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import FiltersComponent from "./FiltersComponent";

const Users = () => {
  const location = useLocation();
  let path = location.pathname.split("/").pop();
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <>
      <Flex flexDir={"column"} gap={"20px"}>
        <Flex h={"28px"} p={"4px"} gap={"4px"} alignItems={"center"}>
          <Button
            width={"20px"}
            maxWidth={"20px"}
            minWidth={"20px"}
            height={"20px"}
            maxHeight={"20px"}
            minHeight={"20px"}
            bg={"none"}>
            <img
              src="/img/sidebar.svg"
              width={"15px"}
              height={"15px"}
              alt="add"
            />
          </Button>

          <Button
            width={"20px"}
            maxWidth={"20px"}
            minWidth={"20px"}
            height={"20px"}
            maxHeight={"20px"}
            minHeight={"20px"}
            bg={"none"}>
            <img src="/img/home.svg" alt="add" width={"15px"} height={"15px"} />
          </Button>

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            w={"16px"}
            h={"16px"}>
            <img src="/img/chevron-right.svg" alt="" />
          </Flex>

          <Flex>
            <Text fontSize={"14px"} fontWeight={"600"} color={"#181D27"}>
              {title}
            </Text>
          </Flex>
        </Flex>
        <Box h={"32px"}>
          <Text
            h={"32px"}
            color={"#181D27"}
            fontWeight={"600"}
            fontSize={"24px"}>
            Users
          </Text>
        </Box>
      </Flex>

      <FiltersComponent />
    </>
  );
};

export default Users;
