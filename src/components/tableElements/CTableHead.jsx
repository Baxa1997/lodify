import React, { memo } from "react";
import { Box } from "@chakra-ui/react";

const CTableHead = ({ children, ...props }) => {
  return (
    <Box
      as="thead"
      bg="gray.50"
      {...props}>
      {children}
    </Box>
  );
};

export default memo(CTableHead);
