import { Box, Checkbox, IconButton } from "@chakra-ui/react";
import { FiTable, FiGitMerge } from "react-icons/fi";
import { VscLink } from "react-icons/vsc";

export const usePermissionsProps = () => {

  const headData = [
    {
      label: "Objects",
      key: "objects",
      render: (data) => {
        return  <Box
          as="label"
          display="flex"
          alignItems="center"
          gap="12px"
        >
          <Checkbox />
          {data}
        </Box>;
      },
    },
    {
      label: "Read",
      key: "read",
      render: () => <Checkbox />,
    },
    {
      label: "Write",
      key: "write",
      render: () => <Checkbox />,
    },
    {
      label: "Update",
      key: "update",
      render: () => <Checkbox />,
    },
    {
      label: "Delete",
      key: "delete",
      render: () => <Checkbox />,
    },
    {
      label: "Public",
      key: "public",
      render: () => <Checkbox />,
    },
    {
      label: "Field",
      key: "field",
      infoText: "Field info",
      render: () => <IconButton
        variant="transparent"
        icon={
          <FiTable
            color="#A4A7AE"
            size={16}
          />
        }
      />,
    },
    {
      label: "Action",
      key: "action",
      infoText: "Action info",
      render: () => <IconButton
        variant="transparent"
        icon={
          <FiGitMerge
            color="#A4A7AE"
            size={16}
          />
        }
      />,
    },
    {
      label: "Relation",
      key: "relation",
      infoText: "Relation info",
      render: () => <IconButton
        variant="transparent"
        icon={
          <VscLink
            color="#A4A7AE"
            size={16}
          />
        }
      />,
    },
  ];

  const bodyData = [
    {
      objects: "Role",
      read: "Read",
      write: "Write",
      update: "Update",
      delete: "Delete",
      public: "Public",
      field: "Field",
      action: "Action",
      relation: "Relation",
    },
    {
      objects: "Role1",
      read: "Read1",
      write: "Write1",
      update: "Update1",
      delete: "Delete1",
      public: "Public1",
      field: "Field1",
      action: "Action1",
      relation: "Relation1",
    },
  ];

  return {
    headData,
    bodyData,
  };
};
