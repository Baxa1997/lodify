import {Box, Checkbox, Flex, IconButton} from "@chakra-ui/react";
import {FiTable, FiGitMerge} from "react-icons/fi";
import {VscLink} from "react-icons/vsc";

export const usePermissionsProps = () => {
  const headData = [
    {
      label: "Objects",
      key: "objects",
      render: (data) => {
        return (
          <Box as="label" display="flex" alignItems="center" gap="6px">
            <Checkbox />
            {data}
          </Box>
        );
      },
    },
    {
      label: "Read",
      key: "read",
      render: () => (
        <Flex pl="20px">
          <Checkbox borderColor="#D5D7DA" />
        </Flex>
      ),
    },
    {
      label: "Write",
      key: "write",
      render: () => (
        <Flex pl="20px">
          <Checkbox borderColor="#D5D7DA" />
        </Flex>
      ),
    },
    {
      label: "Update",
      key: "update",
      render: () => (
        <Flex pl="20px">
          <Checkbox borderColor="#D5D7DA" />
        </Flex>
      ),
    },
    {
      label: "Delete",
      key: "delete",
      render: () => (
        <Flex pl="20px">
          <Checkbox borderColor="#D5D7DA" />
        </Flex>
      ),
    },
    {
      label: "Public",
      key: "public",
      render: () => (
        <Flex pl="20px">
          <Checkbox borderColor="#D5D7DA" />
        </Flex>
      ),
    },
    {
      label: "Field",
      key: "field",
      infoText: "Field info",
      render: () => (
        <Box display="flex" gap="8px">
          <IconButton
            variant="transparent"
            icon={<FiTable color="#A4A7AE" size={16} />}
            size="sm"
          />
        </Box>
      ),
    },

    {
      label: "Action",
      key: "action",
      infoText: "Action info",
      render: () => (
        <Box display="flex" gap="8px">
          <FiGitMerge color="#A4A7AE" size={16} />
        </Box>
      ),
    },
    {
      label: "Relation",
      key: "relation",
      infoText: "Relation info",
      render: () => (
        <Box display="flex" gap="8px">
          <IconButton
            variant="transparent"
            icon={<VscLink color="#A4A7AE" size={16} />}
            size="sm"
          />
        </Box>
      ),
    },
  ];

  const bodyData = [
    {
      objects: "Dashboard",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
    },
    {
      objects: "Trips",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
    },
    {
      objects: "User",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
    },
    {
      objects: "Managing Resources",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
      children: [
        {
          objects: "Drivers",
          read: false,
          write: false,
          update: false,
          delete: false,
          public: false,
          field: false,
        },
        {
          objects: "Assets",
          read: false,
          write: false,
          update: false,
          delete: false,
          public: false,
          field: false,
        },
      ],
    },
    {
      objects: "Contracts",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
    },
    {
      objects: "Clients",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
      children: [
        {
          objects: "Shippers",
          read: false,
          write: false,
          update: false,
          delete: false,
          public: false,
          field: false,
        },
        {
          objects: "Representatives",
          read: false,
          write: false,
          update: false,
          delete: false,
          public: false,
          field: false,
        },
      ],
    },
    {
      objects: "Payments",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
    },
    {
      objects: "Company Profile",
      read: false,
      write: false,
      update: false,
      delete: false,
      public: false,
      field: false,
    },
  ];

  return {
    headData,
    bodyData,
  };
};
