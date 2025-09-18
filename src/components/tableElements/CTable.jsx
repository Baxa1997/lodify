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
  w = "",
  ...props
}) => {
  return (
    <Box
      w={w}
      bg="white"
      borderRadius="12px"
      border="1px solid"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      height={height}
      overflow="hidden"
      {...props}>
      <Box
        flex="1"
        overflow="auto"
        position="relative"
        sx={{
          "&::-webkit-scrollbar": {
            height: "8px",
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#c1c1c1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#a8a8a8",
          },
        }}>
        <Box as="table" width="100%" borderCollapse="collapse" minWidth="800px">
          {children}
        </Box>
      </Box>

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
