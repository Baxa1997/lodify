import {Button, Flex, Text} from "@chakra-ui/react";
import React, {memo} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const HeadBreadCrumb = ({customPath = null}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderBreadcrumb = () => {
    if (customPath && Array.isArray(customPath)) {
      return customPath.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              w={"16px"}
              h={"16px"}>
              <img src="/img/chevron-right.svg" alt="" />
            </Flex>
          )}
          <Flex>
            <Text
              fontSize={"14px"}
              fontWeight={"600"}
              color={"#181D27"}
              cursor={item.path ? "pointer" : "default"}
              onClick={item.path ? () => navigate(item.path) : undefined}>
              {item.label}
            </Text>
          </Flex>
        </React.Fragment>
      ));
    }

    let path = location.pathname.split("/").pop();
    const title = path.charAt(0).toUpperCase() + path.slice(1);

    return (
      <>
        <Button
          width={"24px"}
          maxWidth={"24px"}
          minWidth={"24px"}
          height={"28px"}
          maxHeight={"28px"}
          minHeight={"28px"}
          padding={"4px"}
          bg={"none"}>
          <img src="/img/sidebar.svg" alt="add" />
        </Button>

        <Button
          width={"24px"}
          maxWidth={"24px"}
          minWidth={"24px"}
          height={"28px"}
          maxHeight={"28px"}
          minHeight={"28px"}
          padding={"4px"}
          bg={"none"}>
          <img src="/img/home.svg" alt="add" />
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
      </>
    );
  };

  return (
    <Flex h={"28px"} p={"4px"} gap={"4px"} alignItems={"center"}>
      {renderBreadcrumb()}
    </Flex>
  );
};

export default memo(HeadBreadCrumb);
