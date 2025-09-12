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
import {useNavigate} from "react-router-dom";
import CTableRow from "../../components/tableElements/CTableRow";
import {useQuery} from "@tanstack/react-query";
import driversService from "../../services/driversService";

const DriversTab = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const {data: drivers = [], isLoading} = useQuery({
    queryKey: ["GET_DRIVERS_LIST"],
    queryFn: () => {
      return driversService.getList();
    },
    enabled: true,
    select: (res) => res?.data?.response ?? [],
  });
  console.log(drivers);
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

  const handleRowClick = (driverId) => {
    navigate(`/admin/drivers/${driverId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Inactive":
        return "red";
      default:
        return "gray";
    }
  };

  const getLoadEligibilityColor = (eligibility) => {
    switch (eligibility) {
      case "Eligible":
        return "green";
      case "Pending":
        return "orange";
      case "Not Eligible":
        return "red";
      default:
        return "gray";
    }
  };
  if (isLoading) {
    return (
      <Box mt={"32px"}>
        <FiltersComponent filterButton={true} actionButton={true} />
        <Box mt={6} p={4} textAlign="center">
          Loading drivers...
        </Box>
      </Box>
    );
  }

  return (
    <Box mt={"32px"}>
      <FiltersComponent filterButton={true} actionButton={true} />

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
                Name
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "cdlClass" ? sortConfig.direction : null
                }
                onSort={() => handleSort("cdlClass")}>
                CDL Class
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "licenseNumber"
                    ? sortConfig.direction
                    : null
                }
                onSort={() => handleSort("licenseNumber")}>
                License #
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "region" ? sortConfig.direction : null
                }
                onSort={() => handleSort("region")}>
                Region
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "status" ? sortConfig.direction : null
                }
                onSort={() => handleSort("status")}>
                Status
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "loadEligibility"
                    ? sortConfig.direction
                    : null
                }
                onSort={() => handleSort("loadEligibility")}>
                Load eligibility
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "medicalCard" ? sortConfig.direction : null
                }
                onSort={() => handleSort("medicalCard")}>
                Medical card
              </CTableTh>
            </Box>
          </CTableHead>

          <CTableBody>
            {drivers.map((driver, index) => (
              <CTableRow
                key={driver.id || driver.guid || index}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleRowClick(driver.id || driver.guid)}>
                <CTableTd>{driver.full_name || driver.name || "N/A"}</CTableTd>
                <CTableTd>
                  {driver.cdl_class || driver.cdlClass || "N/A"}
                </CTableTd>
                <CTableTd>
                  {driver.license_number || driver.licenseNumber || "N/A"}
                </CTableTd>
                <CTableTd>{driver.region || "N/A"}</CTableTd>
                <CTableTd>
                  <Badge
                    colorScheme={getStatusColor(driver.status)}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {driver.status || "N/A"}
                  </Badge>
                </CTableTd>
                <CTableTd>
                  <Badge
                    colorScheme={getLoadEligibilityColor(
                      driver.load_eligibility || driver.loadEligibility
                    )}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {driver.load_eligibility || driver.loadEligibility || "N/A"}
                  </Badge>
                </CTableTd>
                <CTableTd>
                  {driver.medical_card || driver.medicalCard || "N/A"}
                </CTableTd>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </Box>
    </Box>
  );
};

export default DriversTab;
