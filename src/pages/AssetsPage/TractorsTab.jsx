import React from "react";
import FiltersComponent from "../../components/FiltersComponent";
import {Badge, Box} from "@chakra-ui/react";
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableTh,
  CTableTd,
} from "../../components/tableElements";
import {useState} from "react";
import CTableRow from "../../components/tableElements/CTableRow";
import {useQuery} from "@tanstack/react-query";
import assetsService from "../../services/assetsService";

const TractorsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const {data: assets = [], isLoading} = useQuery({
    queryKey: ["GET_ASSETS_LIST"],
    queryFn: () => {
      return assetsService.getList();
    },
    enabled: true,
    select: (res) => res?.data?.response ?? [],
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Inactive":
        return "red";
      case "Available":
        return "green";
      case "In Use":
        return "blue";
      case "Maintenance":
        return "orange";
      default:
        return "gray";
    }
  };

  if (isLoading) {
    return (
      <Box mt={"32px"}>
        <FiltersComponent
          filterButton={true}
          verifySelect={true}
          actionButton={true}
        />
        <Box mt={6} p={4} textAlign="center">
          Loading assets...
        </Box>
      </Box>
    );
  }

  return (
    <Box mt={"32px"}>
      <FiltersComponent
        filterButton={true}
        verifySelect={true}
        actionButton={true}
      />

      <Box mt={6}>
        <CTable
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}>
          <CTableHead>
            <Box as="tr">
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "name" ? sortConfig.direction : null
                }
                onSort={() => handleSort("name")}>
                Asset Name
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "type" ? sortConfig.direction : null
                }
                onSort={() => handleSort("type")}>
                Type
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "vin" ? sortConfig.direction : null
                }
                onSort={() => handleSort("vin")}>
                VIN
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "year" ? sortConfig.direction : null
                }
                onSort={() => handleSort("year")}>
                Year
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "make" ? sortConfig.direction : null
                }
                onSort={() => handleSort("make")}>
                Make
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "model" ? sortConfig.direction : null
                }
                onSort={() => handleSort("model")}>
                Model
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "status" ? sortConfig.direction : null
                }
                onSort={() => handleSort("status")}>
                Status
              </CTableTh>
            </Box>
          </CTableHead>

          <CTableBody>
            {assets.map((asset, index) => (
              <CTableRow
                key={asset.id || asset.guid || index}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}>
                <CTableTd>{asset.name || asset.asset_name || "N/A"}</CTableTd>
                <CTableTd>{asset.type || asset.asset_type || "N/A"}</CTableTd>
                <CTableTd>{asset.vin || "N/A"}</CTableTd>
                <CTableTd>{asset.year || "N/A"}</CTableTd>
                <CTableTd>{asset.make || "N/A"}</CTableTd>
                <CTableTd>{asset.model || "N/A"}</CTableTd>
                <CTableTd>
                  <Badge
                    colorScheme={getStatusColor(asset.status)}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {asset.status || "N/A"}
                  </Badge>
                </CTableTd>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </Box>
    </Box>
  );
};

export default TractorsTab;
