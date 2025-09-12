import React, {useState} from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Checkbox,
  Button,
  Divider,
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

const PermissionsTab = ({userId}) => {
  const [permissions, setPermissions] = useState({
    userManagement: {
      view: true,
      create: true,
      edit: true,
      delete: false,
    },
    systemSettings: {
      view: true,
      edit: false,
    },
    dataAccess: {
      view: true,
      export: true,
      import: false,
    },
    reports: {
      view: true,
      generate: true,
      schedule: false,
    },
    notifications: {
      view: true,
      send: false,
      configure: false,
    },
  });

  const handlePermissionChange = (category, permission, value) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: value,
      },
    }));
  };

  const permissionCategories = [
    {
      id: "userManagement",
      name: "User Management",
      description: "Manage users, roles, and permissions",
      permissions: [
        {id: "view", label: "View Users"},
        {id: "create", label: "Create Users"},
        {id: "edit", label: "Edit Users"},
        {id: "delete", label: "Delete Users"},
      ],
    },
    {
      id: "systemSettings",
      name: "System Settings",
      description: "Configure system-wide settings",
      permissions: [
        {id: "view", label: "View Settings"},
        {id: "edit", label: "Edit Settings"},
      ],
    },
    {
      id: "dataAccess",
      name: "Data Access",
      description: "Access and manage data",
      permissions: [
        {id: "view", label: "View Data"},
        {id: "export", label: "Export Data"},
        {id: "import", label: "Import Data"},
      ],
    },
    {
      id: "reports",
      name: "Reports",
      description: "Generate and manage reports",
      permissions: [
        {id: "view", label: "View Reports"},
        {id: "generate", label: "Generate Reports"},
        {id: "schedule", label: "Schedule Reports"},
      ],
    },
    {
      id: "notifications",
      name: "Notifications",
      description: "Manage notifications and alerts",
      permissions: [
        {id: "view", label: "View Notifications"},
        {id: "send", label: "Send Notifications"},
        {id: "configure", label: "Configure Notifications"},
      ],
    },
  ];

  return (
    <Box>
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between" align="center">
          <Text fontSize="20px" fontWeight="600" color="#1e293b">
            Permissions Management
          </Text>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="blue"
            variant="outline"
            size="sm">
            Save Changes
          </Button>
        </HStack>

        {/* Permissions List */}
        <VStack align="stretch" spacing={6}>
          {permissionCategories.map((category, categoryIndex) => (
            <Box key={category.id}>
              <Box
                bg="gray.50"
                p={6}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200">
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Text
                      fontSize="16px"
                      fontWeight="600"
                      color="#1e293b"
                      mb={1}>
                      {category.name}
                    </Text>
                    <Text fontSize="14px" color="gray.600">
                      {category.description}
                    </Text>
                  </Box>

                  <Divider />

                  <VStack align="stretch" spacing={3}>
                    {category.permissions.map((permission) => (
                      <HStack key={permission.id} justify="space-between">
                        <Text color="gray.800" fontSize="14px">
                          {permission.label}
                        </Text>
                        <Checkbox
                          isChecked={permissions[category.id][permission.id]}
                          onChange={(e) =>
                            handlePermissionChange(
                              category.id,
                              permission.id,
                              e.target.checked
                            )
                          }
                          colorScheme="blue"
                        />
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            </Box>
          ))}
        </VStack>

        {/* Action Buttons */}
        <HStack justify="flex-end" spacing={3}>
          <Button variant="outline" colorScheme="gray">
            Reset to Default
          </Button>
          <Button colorScheme="blue">Save Permissions</Button>
        </HStack>

        {/* Permission Summary */}
        <Box>
          <Text fontSize="18px" fontWeight="600" color="#1e293b" mb={4}>
            Permission Summary
          </Text>
          <Box
            bg="blue.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="blue.200">
            <VStack align="stretch" spacing={2}>
              <Text fontSize="14px" color="blue.800" fontWeight="500">
                Total Permissions:{" "}
                {
                  Object.values(permissions).flatMap((cat) =>
                    Object.values(cat).filter(Boolean)
                  ).length
                }
              </Text>
              <Text fontSize="14px" color="blue.700">
                This user has access to{" "}
                {
                  Object.values(permissions).flatMap((cat) =>
                    Object.values(cat).filter(Boolean)
                  ).length
                }{" "}
                out of{" "}
                {
                  Object.values(permissions).flatMap((cat) =>
                    Object.values(cat)
                  ).length
                }{" "}
                available permissions.
              </Text>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default PermissionsTab;
