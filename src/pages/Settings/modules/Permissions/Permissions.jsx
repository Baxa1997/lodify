import React, {useState, useEffect} from "react";
import {
  Box,
  Button,
  useToast,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import MainHeading from "@components/MainHeading";
import {DataTable} from "@components/DataTable";
import {
  usePermissionsProps,
  usePermissionsPropsWithForm,
} from "./usePermissionsProps";
import {AddIcon} from "@chakra-ui/icons";
import authService from "@services/auth/authService";
import {useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";

export const Permissions = () => {
  const toast = useToast();
  const [activeRole, setActiveRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const clientTypeId = useSelector((state) => state.auth.clientType?.id);
  const projectId = useSelector((state) => state.auth.projectId);

  const {bodyData} = usePermissionsProps();

  const {data: roles = [], refetch} = useQuery({
    queryKey: ["ROLES"],
    enabled: !!clientTypeId && !!projectId,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: () =>
      authService.getRoles({
        client_type_id: clientTypeId,
        "project-id": projectId,
      }),
    select: (data) => data.data?.response,
  });

  const {data: singleRoleData, isLoading: isLoadingRole} = useQuery({
    queryKey: ["SINGLE_ROLE", activeRole?.guid],
    enabled: Boolean(activeRole?.guid),
    queryFn: () => {
      if (activeRole?.guid) {
        return authService.getRoleById(projectId, activeRole.guid, {
          "project-id": projectId,
        });
      }
      return null;
    },
    select: (data) => data?.data,
  });

  useEffect(() => {
    if (roles && roles.length > 0 && !activeRole) {
      const firstRole = roles[0];
      setActiveRole(firstRole);
    }
  }, [roles, activeRole?.guid]);

  const createDefaultValues = (roleName) => {
    return bodyData.reduce((acc, row, index) => {
      acc[index] = {
        objects: row.objects,
        read: roleName === "DEFAULT ADMIN" ? true : false,
        write: roleName === "DEFAULT ADMIN" ? true : false,
        update: roleName === "DEFAULT ADMIN" ? true : false,
        delete: roleName === "DEFAULT ADMIN" ? true : false,
        public: roleName === "DEFAULT ADMIN" ? true : false,
        field: roleName === "DEFAULT ADMIN" ? true : false,
      };

      if (row.children) {
        row.children.forEach((child, childIndex) => {
          acc[`${index}-child-${childIndex}`] = {
            objects: child.objects,
            read: roleName === "DEFAULT ADMIN" ? true : false,
            write: roleName === "DEFAULT ADMIN" ? true : false,
            update: roleName === "DEFAULT ADMIN" ? true : false,
            delete: roleName === "DEFAULT ADMIN" ? true : false,
            public: roleName === "DEFAULT ADMIN" ? true : false,
            field: roleName === "DEFAULT ADMIN" ? true : false,
          };
        });
      }

      return acc;
    }, {});
  };

  const roleForm = useForm({
    defaultValues: {
      roleName: "",
      status: "active",
    },
  });

  const onRoleSubmit = (data) => {
    const newRole = data.roleName.toUpperCase();

    authService
      .roleCreate(
        {
          name: newRole,
          status: data.status === "active" ? true : false,
          client_type_id: clientTypeId,
          "project-id": projectId,
        },
        {
          "project-id": projectId,
        }
      )
      .then((res) => {
        refetch();
        setIsOpen(false);
        roleForm.reset();
        toast({
          title: "Role Added",
          description: `${newRole} role has been added successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to create role. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
  } = useForm();

  const {headData} = usePermissionsPropsWithForm(register);

  useEffect(() => {
    reset(singleRoleData);
  }, [singleRoleData, activeRole, reset]);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  // const handleReset = () => {
  //   reset({
  //     permissions: createDefaultValues(activeRole?.name || ""),
  //   });
  //   toast({
  //     title: "Permissions Reset",
  //     description: `All permissions for ${
  //       activeRole?.name || "selected role"
  //     } have been reset to default values.`,
  //     status: "info",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <>
      {" "}
      <Box pt="24px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="20px">
          <HStack
            px="10px"
            id="scrollbar_none"
            spacing={1}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            padding="4px"
            width="100%"
            overflow="scroll"
            bg="white">
            {roles?.map((role) => (
              <Button
                minW="fit-content"
                key={role.id || role.name || role.guid}
                variant={activeRole?.guid === role.guid ? "solid" : "ghost"}
                colorScheme={activeRole?.guid === role.guid ? "gray" : "gray"}
                size="sm"
                borderRadius="6px"
                fontWeight={activeRole?.guid === role.guid ? 500 : 400}
                bg={activeRole?.guid === role.guid ? "gray.100" : "transparent"}
                color={activeRole?.guid === role.guid ? "gray.900" : "gray.600"}
                onClick={() => setActiveRole(role)}
                _hover={{
                  bg: activeRole?.guid === role.guid ? "gray.100" : "gray.50",
                }}>
                {role.name}
              </Button>
            ))}
            <IconButton
              mx="6px"
              icon={<AddIcon />}
              size="sm"
              variant="ghost"
              colorScheme="gray"
              borderRadius="6px"
              bg="transparent"
              color="gray.600"
              _hover={{
                bg: "gray.200",
              }}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </HStack>
          <Box display="flex" gap="12px">
            <Button
              h="40px"
              variant="solid"
              colorScheme="blue"
              onClick={handleSave}
              isDisabled={!isDirty}>
              Save
            </Button>
          </Box>
        </Box>
        <Box mt="20px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DataTable
              headData={headData}
              data={bodyData}
              pagination
              isLoading={isLoadingRole}
            />
          </form>
        </Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCentered
        size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" fontWeight="semibold" color="gray.900">
              Add Role
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={roleForm.handleSubmit(onRoleSubmit)}>
            <ModalBody pb={6}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                    Role Name
                  </FormLabel>
                  <Input
                    {...roleForm.register("roleName", {
                      required: "Role name is required",
                      minLength: {
                        value: 2,
                        message: "Role name must be at least 2 characters",
                      },
                    })}
                    placeholder="Enter role name"
                    size="md"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                  />
                  {roleForm.formState.errors.roleName && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {roleForm.formState.errors.roleName.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                    Status
                  </FormLabel>
                  <Select
                    {...roleForm.register("status")}
                    size="md"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack spacing={2}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    roleForm.reset();
                  }}
                  size="md">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="md"
                  isLoading={roleForm.formState.isSubmitting}>
                  Add Role
                </Button>
              </HStack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
