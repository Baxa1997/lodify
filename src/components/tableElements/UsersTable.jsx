import React from "react";
import {Badge, Text} from "@chakra-ui/react";
import Table from "./Table";

const UsersTable = ({data = [], loading = false, ...props}) => {
  // Sample data structure matching your image
  const sampleData = [
    {
      id: 1,
      fullName: "Javlon",
      email: "javlon@lodify.com",
      phone: "+1 44035583165",
      roles: "Dispatcher",
      domiciles: "CMH",
      status: "Invite Expired",
    },
    {
      id: 2,
      fullName: "Jamshid",
      email: "jamshid@lodify.com",
      phone: "+1 44035583165",
      roles: "Admin",
      domiciles: "No domiciles selected",
      status: "Active",
    },
    {
      id: 3,
      fullName: "Khurshid",
      email: "khurshid@lodify.com",
      phone: "+1 44035583165",
      roles: "Admin",
      domiciles: "CMH",
      status: "Active",
    },
    {
      id: 4,
      fullName: "Olim",
      email: "olim@lodify.com",
      phone: "+1 44035583165",
      roles: "Primary Admin",
      domiciles: "No domiciles selected",
      status: "Active",
    },
  ];

  // Column definitions
  const columns = [
    {
      key: "fullName",
      title: "Full Name",
      sortable: true,
      width: "20%",
    },
    {
      key: "email",
      title: "Email Address",
      sortable: true,
      width: "25%",
    },
    {
      key: "phone",
      title: "Phone Number",
      sortable: true,
      width: "20%",
    },
    {
      key: "roles",
      title: "Roles",
      sortable: true,
      width: "15%",
    },
    {
      key: "domiciles",
      title: "Domiciles",
      sortable: true,
      width: "15%",
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      width: "15%",
      render: (value) => {
        const getStatusColor = (status) => {
          switch (status) {
            case "Active":
              return "green";
            case "Invite Expired":
              return "orange";
            case "Pending":
              return "yellow";
            case "Inactive":
              return "red";
            default:
              return "gray";
          }
        };

        return (
          <Badge
            colorScheme={getStatusColor(value)}
            variant="subtle"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="12px"
            fontWeight="500">
            {value}
          </Badge>
        );
      },
    },
  ];

  const handleSort = ({key, direction}) => {
    console.log(`Sorting by ${key} in ${direction} direction`);
  };

  const handlePageChange = (page) => {
    console.log(`Page changed to ${page}`);
    // Implement your pagination logic here
  };

  const handlePageSizeChange = (size) => {
    console.log(`Page size changed to ${size}`);
  };

  return (
    <Table
      data={data.length > 0 ? data : sampleData}
      columns={columns}
      loading={loading}
      onSort={handleSort}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      emptyMessage="No users found"
      rowKey="id"
      striped={true}
      hover={true}
      size="md"
      variant="simple"
      {...props}
    />
  );
};

export default UsersTable;
