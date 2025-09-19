import { Checkbox } from "@chakra-ui/react";

export const usePermissionsProps = () => {

  const headData = [
    {
      label: "Objects",
      key: "objects",
      render: (data, row) => {
        console.log({  });
        return  <Checkbox />;
      },
    },
    {
      label: "Read",
      key: "read",
    },
    {
      label: "Write",
      key: "write",
    },
    {
      label: "Update",
      key: "update",
    },
    {
      label: "Delete",
      key: "delete",
    },
    {
      label: "Public",
      key: "public",
    },
    {
      label: "Field",
      key: "field",
      infoText: "Field info",
    },
    {
      label: "Action",
      key: "action",
      infoText: "Action info",
    },
    {
      label: "Relation",
      key: "relation",
      infoText: "Relation info",
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
