import { Box, Text } from "@chakra-ui/react";
import { SectionCard, SectionCardBody, SectionCardHeader } from "../../../../components/SectionCard/SectionCard";
import { StatusText } from "../../../../components/StatusText";
import { CardData } from "../../../../components/CardData";

export const Authority = ({ data }) => {

  const {
    common_stat,
    common_app_pend,
    common_rev_pend,
    contract_stat,
    contract_app_pend,
    contract_rev_pend,
    broker_stat,
    broker_app_pend,
    broker_rev_pend,
    property_chk,
    passenger_chk,
    hhg_chk,
  } = data;

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
        >
          Authority
        </Text>
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
                data={common_stat}
              />
              <StatusText
                title="Common Authority Application Pending:"
                data={common_app_pend}
              />
              <StatusText
                title="Common Authority Pending Recovation:"
                data={common_rev_pend}
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
                data={contract_stat}
              />
              <StatusText
                title="Contract Authority Application Pending:"
                data={contract_app_pend}
              />
              <StatusText
                title="Contract Authority Pending Revocation:"
                data={contract_rev_pend}
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
                data={broker_stat}
              />
              <StatusText
                title="Broker Authority Application Pending:"
                data={broker_app_pend}
              />
              <StatusText
                title="Broker Authority Pending Revocation:"
                data={broker_rev_pend}
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
                data={property_chk}
              />
              <StatusText
                title="Passenger:"
                data={passenger_chk}
              />
              <StatusText
                title="Household Goods:"
                data={hhg_chk}
              />
            </CardData>
            <CardData
              display="flex"
              flexDirection="column"
              gap="8px"
            >
              <StatusText
                title="Authority Granted On:"
                data="None"
              />
            </CardData>
          </Box>
        </Box>
      </SectionCardBody>
    </SectionCard>
  </Box>;
};
