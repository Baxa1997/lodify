import { Box, Text } from "@chakra-ui/react";
import { SectionCard, SectionCardBody, SectionCardHeader } from "../../../../components/SectionCard/SectionCard";
import { StatusText } from "../../../../components/StatusText";
import { CardData } from "../../../../components/CardData";

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
          <CardData
            display="flex"
            gap="20px"
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
          </CardData>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            alignItems="flex-start"
            gap="20px"
          >
            <CardData
              display="flex"
              flexDirection="column"
              gap="8px"
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
            </CardData>
            <CardData
              display="flex"
              flexDirection="column"
              gap="8px"
            >
              <StatusText
                title="Authority Granted On:"
                data="12/21/2017"
              />
            </CardData>
          </Box>
        </Box>
      </SectionCardBody>
    </SectionCard>
  </Box>;
};
