import React, {useState, useCallback} from "react";
import {Box, Flex, Text, Badge} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {
  CTable,
  CTableHead,
  CTableTh,
  CTableBody,
  CTableTd,
} from "../../components/tableElements";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import {useTablePagination} from "../../hooks";
import {USER_STATUS} from "../../constants";
import CTableRow from "../../components/tableElements/CTableRow";
import FiltersComponent from "../../components/FiltersComponent";
import AddUserModal from "../../components/AddUserModal";
import usersService from "../../services/usersService";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const Users = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sortConfig, setSortConfig] = useState({key: null, direction: "asc"});
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const {data: users = []} = useQuery({
    queryKey: ["GET_USERS_LIST"],
    queryFn: () => {
      return usersService.getList();
    },
    enabled: true,
    select: (res) => res?.data?.response ?? [],
  });

  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedData: paginatedUsers,
    handlePageChange,
    handlePageSizeChange,
  } = useTablePagination(users, 10);

  const handleSort = useCallback(
    (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({key, direction});
    },
    [sortConfig]
  );

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case USER_STATUS.ACTIVE:
        return "green";
      case USER_STATUS.INVITE_EXPIRED:
        return "orange";
      case USER_STATUS.PENDING:
        return "yellow";
      case USER_STATUS.INACTIVE:
        return "red";
      default:
        return "gray";
    }
  }, []);

  const handleUserClick = useCallback(
    (user) => {
      navigate(`/admin/users/${user.guid}`, {state: {user}});
    },
    [navigate]
  );

  const handleAddUserClick = useCallback(() => {
    setIsAddUserModalOpen(true);
  }, []);

  return (
    <>
      <Flex flexDir={"column"} gap={"20px"}>
        <HeadBreadCrumb />
        <Box mb={"20px"} h={"32px"}>
          <Text
            h={"32px"}
            color={"#181D27"}
            fontWeight={"600"}
            fontSize={"24px"}>
            Users
          </Text>
        </Box>
      </Flex>

      <FiltersComponent
        filterByDomicile={true}
        addButton={true}
        verifySelect={true}
        onAddUserClick={handleAddUserClick}
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
                  sortConfig.key === "full_Name" ? sortConfig.direction : null
                }
                onSort={() => handleSort("full_Name")}>
                Full Name
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "email" ? sortConfig.direction : null
                }
                onSort={() => handleSort("email")}>
                Email Address
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "phone" ? sortConfig.direction : null
                }
                onSort={() => handleSort("phone")}>
                Phone Number
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "roles" ? sortConfig.direction : null
                }
                onSort={() => handleSort("roles")}>
                Roles
              </CTableTh>
              <CTableTh
                sortable={true}
                sortDirection={
                  sortConfig.key === "domiciles" ? sortConfig.direction : null
                }
                onSort={() => handleSort("domiciles")}>
                Domiciles
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
            {users?.map((user, index) => (
              <CTableRow
                key={user?.id}
                onClick={() => handleUserClick(user)}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                _hover={{
                  backgroundColor: "gray.50",
                }}>
                <CTableTd>{user?.full_name}</CTableTd>
                <CTableTd>{user?.email}</CTableTd>
                <CTableTd>{user?.phone}</CTableTd>
                <CTableTd>{user?.role_id_data?.name}</CTableTd>
                <CTableTd>{user?.domiciles}</CTableTd>
                <CTableTd>
                  <Badge
                    colorScheme={getStatusColor(user?.status)}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {user?.status}
                  </Badge>
                </CTableTd>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </Box>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
    </>
  );
};

export default Users;
