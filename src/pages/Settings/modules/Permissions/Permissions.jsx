import React from "react";
import {Box, Button, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import MainHeading from "@components/MainHeading";
import {DataTable} from "@components/DataTable";
import {usePermissionsProps} from "./usePermissionsProps";

export const Permissions = () => {
  const toast = useToast();
  const {headData, bodyData} = usePermissionsProps();

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      permissions: {},
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const handleReset = () => {
    reset();
    toast({
      title: "Permissions Reset",
      description: "All permissions have been reset to default values.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Box pt="32px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <MainHeading size="18px">Permissions</MainHeading>
        <Box display="flex" gap="12px">
          <Button
            variant="outline"
            colorScheme="gray"
            onClick={handleReset}
            isDisabled={!isDirty}>
            Reset
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={handleSave}
            isDisabled={!isDirty}>
            Save Changes
          </Button>
        </Box>
      </Box>
      <Box mt="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DataTable headData={headData} data={bodyData} pagination />
        </form>
      </Box>
    </Box>
  );
};
