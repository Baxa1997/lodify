import React from "react";
import {Box, Button, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import MainHeading from "@components/MainHeading";
import {DataTable} from "@components/DataTable";
import {
  usePermissionsProps,
  usePermissionsPropsWithForm,
} from "./usePermissionsProps";
import {Tabs, TabList, Tab} from "react-tabs";
import styles from "../../style.module.scss";

export const Permissions = () => {
  const toast = useToast();

  const {bodyData} = usePermissionsProps();

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
      permissions: bodyData.reduce((acc, row, index) => {
        acc[index] = {
          objects: row.objects,
          read: row.read,
          write: row.write,
          update: row.update,
          delete: row.delete,
          public: row.public,
          field: row.field,
        };

        if (row.children) {
          row.children.forEach((child, childIndex) => {
            acc[`${index}-child-${childIndex}`] = {
              objects: child.objects,
              read: child.read,
              write: child.write,
              update: child.update,
              delete: child.delete,
              public: child.public,
              field: child.field,
            };
          });
        }

        return acc;
      }, {}),
    },
  });

  const {headData} = usePermissionsPropsWithForm(register);
  console.log("watchwatchwatch", watch());

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
        <Tabs defaultValue="permissions" className={styles.react_tab}>
          <TabList className={styles.tabList}>
            <Tab className={`${styles.reactTabIteActive}`}>Permissions</Tab>
          </TabList>
        </Tabs>
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
