import { Box, Text } from "@chakra-ui/react";

export const StatusText = ({ title, data, status }) => {
  const statusMap = {
    "Active": "success.600",
    "Yes": "success.600",
    "No": "error.600",
    "None": "error.600",
  };

  return <Box
    display="flex"
    gap="8px">
    <Text
      fontSize="14px"
      fontWeight="600"
      color="secondary.700"
    >
      {title}
    </Text>
    <Text
      fontSize="14px"
      fontWeight="400"
      color={statusMap[status] || statusMap[data]}
    >
      {data}
    </Text>
  </Box>;
};
