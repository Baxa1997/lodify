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
import CTableRow from "../../components/tableElements/CTableRow";
import FiltersComponent from "../../components/FiltersComponent";
import AddUserModal from "../../components/AddUserModal";
import usersService from "../../services/usersService";
import {useQuery} from "@tanstack/react-query";
import {tableHeading, getStatusColor} from "./components/mockElements";

const Users = () => {
  const navigate = useNavigate();
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
              {tableHeading?.map((heading) => (
                <CTableTh
                  key={heading.key}
                  sortable={heading?.sortable}
                  sortDirection={
                    sortConfig.key === heading?.key
                      ? sortConfig.direction
                      : null
                  }
                  onSort={() => handleSort(heading?.key)}>
                  {heading?.label}
                </CTableTh>
              ))}
            </Box>
          </CTableHead>

          <CTableBody>
            {users?.map((user) => (
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
                    colorScheme={getStatusColor(user?.status?.[0])}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {user?.status?.[0]}
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
