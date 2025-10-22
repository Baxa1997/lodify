import React from "react";
import {Flex, Box, Text} from "@chakra-ui/react";

function ImageMessage({isOwn, content, fileInfo}) {
  const fileName = fileInfo?.name || "Image";

  return (
    <Flex gap="12px" p="10px 14px" alignItems="center">
      <Box
        w="44px"
        h="44px"
        borderRadius="6px"
        border="1px solid #E9EAEB"
        color="#fff"
        bg="#F79009"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="20px">
        📄
      </Box>
      <Box>
        <Text color={isOwn ? "#fff" : "#181D27"} fontWeight="500">
          {fileName}
        </Text>
        <Text color={isOwn ? "#fff" : "#181D27"} fontSize="12px">
          1.2 MB
        </Text>
      </Box>
    </Flex>
  );
}

export default ImageMessage;
