import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {EditIcon, AddIcon} from "@chakra-ui/icons";

const UserRoleTab = ({userId}) => {
  const userRoles = {
    currentRole: "Administrator",
    roleId: "admin-001",
    assignedBy: "System Admin",
    assignedDate: "2023-06-15",
    permissions: [
      "User Management",
      "System Configuration",
      "Data Access",
      "Reports Generation",
      "Settings Management",
    ],
    availableRoles: [
      {id: "admin", name: "Administrator"},
      {id: "manager", name: "Manager"},
      {id: "user", name: "User"},
      {id: "viewer", name: "Viewer"},
    ],
  };

  return (
    <Box>
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between" align="center">
          <Text fontSize="20px" fontWeight="600" color="#1e293b">
            User Role & Permissions
          </Text>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="blue"
            variant="outline"
            size="sm">
            Edit Role
          </Button>
        </HStack>

        <Box>
          <Text fontSize="18px" fontWeight="600" color="#1e293b" mb={4}>
            Current Role
          </Text>
          <Box
            bg="gray.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200">
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Text fontWeight="500" color="gray.600" minW="120px">
                  Role:
                </Text>
                <Badge
                  colorScheme="blue"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="14px">
                  {userRoles.currentRole}
                </Badge>
              </HStack>

              <HStack>
                <Text fontWeight="500" color="gray.600" minW="120px">
                  Role ID:
                </Text>
                <Text color="gray.800">{userRoles.roleId}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500" color="gray.600" minW="120px">
                  Assigned By:
                </Text>
                <Text color="gray.800">{userRoles.assignedBy}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500" color="gray.600" minW="120px">
                  Assigned Date:
                </Text>
                <Text color="gray.800">{userRoles.assignedDate}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Box>
          <Text fontSize="18px" fontWeight="600" color="#1e293b" mb={4}>
            Change Role
          </Text>
          <Box
            bg="gray.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200">
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel color="gray.800">Select New Role</FormLabel>
                <Select placeholder="Choose a role" bg="white">
                  {userRoles.availableRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <HStack justify="flex-end">
                <Button size="sm" variant="outline" colorScheme="gray">
                  Cancel
                </Button>
                <Button size="sm" colorScheme="blue">
                  Update Role
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Box>
          <HStack justify="space-between" align="center" mb={4}>
            <Text fontSize="18px" fontWeight="600" color="#1e293b">
              Current Permissions
            </Text>
            <Button
              leftIcon={<AddIcon />}
              size="sm"
              variant="outline"
              colorScheme="blue">
              Add Permission
            </Button>
          </HStack>
          <Box
            bg="gray.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200">
            <VStack align="stretch" spacing={3}>
              {userRoles.permissions.map((permission, index) => (
                <HStack key={index} justify="space-between">
                  <Text color="gray.800">{permission}</Text>
                  <Button size="xs" variant="outline" colorScheme="red">
                    Remove
                  </Button>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Box>

        <Box>
          <Text fontSize="18px" fontWeight="600" color="#1e293b" mb={4}>
            Role History
          </Text>
          <Box
            bg="gray.50"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200">
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text color="gray.800">Administrator</Text>
                <Text color="gray.600" fontSize="sm">
                  2023-06-15 - Present
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.800">User</Text>
                <Text color="gray.600" fontSize="sm">
                  2023-01-01 - 2023-06-14
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserRoleTab;
