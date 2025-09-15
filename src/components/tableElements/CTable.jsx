import React from "react";
import {Box} from "@chakra-ui/react";
import CTablePagination from "./CTablePagination";

const CTable = ({
  children,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  height = "400px",
  ...props
}) => {
  return (
    <Box
      bg="white"
      borderRadius="12px"
      border="1px solid"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      height={height}
      {...props}>
      {/* Scrollable table body */}
      <Box flex="1" overflow="auto" position="relative">
        <Box as="table" width="100%" borderCollapse="collapse">
          {children}
        </Box>
      </Box>

      {/* Fixed pagination at bottom */}
      <CTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </Box>
  );
};

export default CTable;
