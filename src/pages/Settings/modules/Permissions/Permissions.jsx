import { Box, Button } from "@chakra-ui/react";
import MainHeading from "@components/MainHeading";
import { DataTable } from "@components/DataTable";
import { usePermissionsProps } from "./usePermissionsProps";

export const Permissions = () => {

  const { headData, bodyData } = usePermissionsProps();

  return (
    <Box pt="32px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MainHeading size="18px">Permissions</MainHeading>
        <Button
          variant="solid"
          colorScheme="blue"
        >
          Action
        </Button>
      </Box>
      <Box mt="20px">
        <DataTable
          headData={headData}
          data={bodyData}
          pagination
        />
      </Box>
    </Box>
  );
};
