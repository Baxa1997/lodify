import { Box, Text } from "@chakra-ui/react";
import { SectionCard, SectionCardBody, SectionCardHeader } from "../../../../components/SectionCard/SectionCard";

const StatusText = ({ title, data, status }) => {
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

export const Authority = () => {

  return <Box>
    <SectionCard
      isAccordion
      padding="0 !important"
      variant="card"
      overflow="hidden"
    >
      <SectionCardHeader
        bgColor="gray.200"
        borderBottom="1px solid"
        borderColor="gray.border-main"
        padding="20px 24px"
        borderTopLeftRadius="12px"
        borderTopRightRadius="12px">
        <Text
          fontSize="18px"
          fontWeight="600"
          color="primary.500"
        >Authority</Text>
      </SectionCardHeader>
      <SectionCardBody>
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Box
            display="flex"
            gap="20px"
            border="1px solid"
            borderColor="gray.border-main"
            borderRadius="12px"
            p="20px"
          >
            <Box
              flexGrow={1}
              display="flex"
              flexDirection="column"
              gap="8px"
            >
              <StatusText
                title="Common Authority:"
                data="Active"
              />
              <StatusText
                title="Common Authority Application Pending:"
                data="No"
              />
              <StatusText
                title="Common Authority Pending Recovation:"
                data="No"
              />
            </Box>
            <Box
              flexGrow={1}
              display="flex"
              flexDirection="column"
              gap="8px"
            >
              <StatusText
                title="Contract Authority:"
                data="None"
              />
              <StatusText
                title="Contract Authority Application Pending:"
                data="No"
              />
              <StatusText
                title="Contract Authority Pending Revocation:"
                data="No"
              />
            </Box>
            <Box
              flexGrow={1}
              display="flex"
              flexDirection="column"
              gap="8px"
            >
              <StatusText
                title="Broker Authority:"
                data="None"
              />
              <StatusText
                title="Broker Authority Application Pending:"
                data="No"
              />
              <StatusText
                title="Broker Authority Pending Revocation:"
                data="No"
              />
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            alignItems="flex-start"
            gap="20px"
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="8px"
              border="1px solid"
              borderColor="gray.border-main"
              borderRadius="12px"
              p="20px"
            >
              <Text
                fontSize="16px"
                fontWeight="600"
                color="secondary.700"
              >
              Cargo Authorization
              </Text>
              <StatusText
                title="Freight:"
                data="Yes"
              />
              <StatusText
                title="Passenger:"
                data="No"
              />
              <StatusText
                title="Household Goods::"
                data="No"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="8px"
              border="1px solid"
              borderColor="gray.border-main"
              borderRadius="12px"
              p="20px"
            >
              <StatusText
                title="Authority Granted On:"
                data="12/21/2017"
              />
            </Box>
          </Box>
        </Box>
      </SectionCardBody>
    </SectionCard>
  </Box>;
};
