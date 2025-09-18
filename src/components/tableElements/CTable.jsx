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
  w = "100%",
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
        overflowX="auto"
        overflowY="auto"
        position="relative"
        sx={{
          "&::-webkit-scrollbar": {
            height: "3px",
            width: "0px",
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
        <Box as="table" borderCollapse="collapse" w="100%" tableLayout="fixed">
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
