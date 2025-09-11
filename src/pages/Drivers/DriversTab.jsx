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

const DriversTab = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filteredUsers, setFilteredUsers] = useState([
    {
      id: "1",
      name: "Khurshid Rakhmatov",
      cdlClass: "Class A",
      licenseNumber: "261915590",
      region: "NY",
      status: "Active",
      loadEligibility: "Eligible",
      medicalCard: "Yes (exp. Aug 31, 2025)",
    },
    {
      id: "2",
      name: "John Smith",
      cdlClass: "Class B",
      licenseNumber: "872334115",
      region: "NJ",
      status: "Active",
      loadEligibility: "Pending",
      medicalCard: "Yes (exp. Aug 31, 2025)",
    },
    {
      id: "3",
      name: "Maria Lopez",
      cdlClass: "Class A",
      licenseNumber: "452118229",
      region: "TX",
      status: "Inactive",
      loadEligibility: "Not Eligible",
      medicalCard: "NO",
    },
    {
      id: "4",
      name: "David Johnson",
      cdlClass: "Class C",
      licenseNumber: "993217700",
      region: "CA",
      status: "Active",
      loadEligibility: "Eligible",
      medicalCard: "Yes (exp. Aug 31, 2025)",
    },
    {
      id: "3",
      name: "Maria Lopez",
      cdlClass: "Class A",
      licenseNumber: "452118229",
      region: "TX",
      status: "Inactive",
      loadEligibility: "Not Eligible",
      medicalCard: "NO",
    },
    {
      id: "4",
      name: "David Johnson",
      cdlClass: "Class C",
      licenseNumber: "993217700",
      region: "CA",
      status: "Active",
      loadEligibility: "Eligible",
      medicalCard: "Yes (exp. Aug 31, 2025)",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

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
            {filteredUsers.map((user, index) => (
              <CTableRow
                key={user.id}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleRowClick(user.id)}>
                <CTableTd>{user.name}</CTableTd>
                <CTableTd>{user.cdlClass}</CTableTd>
                <CTableTd>{user.licenseNumber}</CTableTd>
                <CTableTd>{user.region}</CTableTd>
                <CTableTd>
                  <Badge
                    colorScheme={getStatusColor(user.status)}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {user.status}
                  </Badge>
                </CTableTd>
                <CTableTd>
                  <Badge
                    colorScheme={getLoadEligibilityColor(user.loadEligibility)}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {user.loadEligibility}
                  </Badge>
                </CTableTd>
                <CTableTd>{user.medicalCard}</CTableTd>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </Box>
    </Box>
  );
};

export default DriversTab;
