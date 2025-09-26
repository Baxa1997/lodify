import {Box, Checkbox, Flex, IconButton} from "@chakra-ui/react";
import {FiTable} from "react-icons/fi";

export const usePermissionsPropsWithForm = (
  register,
  setValue,
  watch,
  onFieldModalOpen
) => {
  const headData = [
    {
      label: "Objects",
      key: "objects",
      render: (data, row, head, rowIndex) => {
        return (
          <Box as="label" display="flex" alignItems="center" gap="6px">
            {/* <Checkbox {...register(`permissions.${rowIndex}.objects`)} /> */}
            {data}
          </Box>
        );
      },
    },
    {
      label: "Read",
      key: "read",
      render: (
        data,
        row,
        head,
        rowIndex,
        isChild = false,
        parentIndex = null
      ) => {
        const fieldName =
          isChild && parentIndex !== null
            ? `${parentIndex}.children.${rowIndex}.read`
            : `${rowIndex}.read`;
        return (
          <Flex pl="20px">
            <Checkbox
              borderColor="#D5D7DA"
              onChange={(e) => setValue(fieldName, e.target.checked)}
              {...register(fieldName)}
            />
          </Flex>
        );
      },
    },
    {
      label: "Write",
      key: "write",
      render: (
        data,
        row,
        head,
        rowIndex,
        isChild = false,
        parentIndex = null
      ) => {
        const fieldName =
          isChild && parentIndex !== null
            ? `${parentIndex}.children.${rowIndex}.write`
            : `${rowIndex}.write`;
        return (
          <Flex pl="20px">
            <Checkbox
              borderColor="#D5D7DA"
              onChange={(e) => setValue(fieldName, e.target.checked)}
              {...register(fieldName)}
            />
          </Flex>
        );
      },
    },
    {
      label: "Update",
      key: "update",
      render: (
        data,
        row,
        head,
        rowIndex,
        isChild = false,
        parentIndex = null
      ) => {
        const fieldName =
          isChild && parentIndex !== null
            ? `${parentIndex}.children.${rowIndex}.update`
            : `${rowIndex}.update`;
        return (
          <Flex pl="20px">
            <Checkbox
              borderColor="#D5D7DA"
              onChange={(e) => setValue(fieldName, e.target.checked)}
              {...register(fieldName)}
            />
          </Flex>
        );
      },
    },
    {
      label: "Delete",
      key: "delete",
      render: (
        data,
        row,
        head,
        rowIndex,
        isChild = false,
        parentIndex = null
      ) => {
        const fieldName =
          isChild && parentIndex !== null
            ? `${parentIndex}.children.${rowIndex}.delete`
            : `${rowIndex}.delete`;
        return (
          <Flex pl="20px">
            <Checkbox
              borderColor="#D5D7DA"
              onChange={(e) => setValue(fieldName, e.target.checked)}
              {...register(fieldName)}
            />
          </Flex>
        );
      },
    },
    {
      label: "Public",
      key: "public",
      render: (
        data,
        row,
        head,
        rowIndex,
        isChild = false,
        parentIndex = null
      ) => {
        const fieldName =
          isChild && parentIndex !== null
            ? `${parentIndex}.children.${rowIndex}.public`
            : `${rowIndex}.public`;
        return (
          <Flex pl="20px">
            <Checkbox
              borderColor="#D5D7DA"
              onChange={(e) => setValue(fieldName, e.target.checked)}
              {...register(fieldName)}
            />
          </Flex>
        );
      },
    },
    {
      label: "Field",
      key: "field",
      infoText: "Field info",
      render: (data, row, head, rowIndex) => (
        <Box display="flex" gap="8px">
          <IconButton
            variant="transparent"
            icon={<FiTable color="#A4A7AE" size={16} />}
            size="sm"
            onClick={() => onFieldModalOpen?.(row.tableData?.slug)}
            isDisabled={!row.tableData?.slug}
            _hover={{
              bg: "gray.100",
            }}
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
