import React, {memo} from "react";
import {Box, Flex, Text, HStack} from "@chakra-ui/react";
import {LuChevronUp, LuChevronDown} from "react-icons/lu";

const CTableTh = ({
  children,
  sortable = false,
  sortDirection = null,
  onSort,
  ...props
}) => {
  const getSortIcon = () => {
    if (!sortable) return null;

    return (
      <Flex flexDirection="column" spacing={0} align="center" gap={0}>
        <LuChevronUp
          size={12}
          color={sortDirection === "asc" ? "#6B7280" : "#A4A7AE"}
        />
        <LuChevronDown
          size={12}
          color={sortDirection === "desc" ? "#6B7280" : "#A4A7AE"}
          style={{marginTop: "-2px"}}
        />
      </Flex>
    );
  };

  return (
    <Box
      as="th"
      onClick={sortable ? onSort : undefined}
      cursor={sortable ? "pointer" : "default"}
      userSelect="none"
      py={4}
      px={6}
      fontSize="14px"
      fontWeight="600"
      color="#1E293B"
      borderBottom="1px solid"
      borderColor="gray.200"
      textAlign="left"
      bg="gray.50"
      minWidth="80px"
      width="auto"
      whiteSpace="nowrap"
      _hover={sortable ? {bg: "gray.100"} : {}}
      transition="all 0.2s ease"
      {...props}>
      <Flex align="center" justify="space-between" width="100%">
        <Text fontSize="14px" fontWeight="600" color="#1E293B" noOfLines={1}>
          {children}
        </Text>
        {getSortIcon()}
      </Flex>
    </Box>
  );
};

export default memo(CTableTh);
