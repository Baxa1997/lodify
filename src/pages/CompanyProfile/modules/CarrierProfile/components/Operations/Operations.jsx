import { Box, Text } from "@chakra-ui/react";
import { SectionCard, SectionCardBody, SectionCardHeader } from "../../../../components/SectionCard/SectionCard";
import { CardData } from "../../../../components/CardData";
import { StatusText } from "../../../../components/StatusText";
import { useOperationsProps } from "./useOperationsProps";
import { responseStatuses } from "@utils/getResponseStatuses";

export const Operations = ({ data = {} }) => {

  const { extraData } = useOperationsProps();

  const {
    entity_type,
    us_dot_status,
    operating_status,
    out_of_service_date,
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
          Operations
        </Text>
      </SectionCardHeader>
      <SectionCardBody padding="20px">
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap="20px"
          alignItems="flex-start"
        >
          <CardData
            display="flex"
            flexDirection="column"
            flexGrow={1}
            gap="8px"
          >
            <StatusText
              title="Entity Type:"
              data={entity_type}
            />
            <StatusText
              title="DOT Status:"
              data={us_dot_status}
            />
            <StatusText
              title="DOT Date:"
              data={"None"}
            />
          </CardData>
          <CardData
            display="flex"
            flexDirection="column"
            flexGrow={1}
            gap="8px"
          >
            <StatusText
              title="Operating Status:"
              data={operating_status}
            />
            <StatusText
              title="Out Of Service:"
              data={out_of_service_date}
            />
            <StatusText
              title="Out Of Service Date:"
              data={out_of_service_date}
            />
          </CardData>
          {/* <CardData
            display="flex"
            flexDirection="column"
            flexGrow={1}
            gap="8px"
          >
            <Text
              fontSize="16px"
              fontWeight="600"
              color="secondary.700"
            >
              Operations
            </Text>
            <StatusText
              title="Carrier Operation:"
              data={"Interstate"}
            />
            <StatusText
              title="Shipper Operation:"
              data={"None"}
            />
            <StatusText
              title="Hazmat Indicator:"
              data={"No"}
            />
          </CardData> */}
          <CardData
            display="flex"
            flexDirection="column"
            flexGrow={1}
            gap="8px"
          >
            <Text
              fontSize="16px"
              fontWeight="600"
              color="secondary.700"
            >
              Classification
            </Text>
            <Box
              display="flex"
              gap="8px">
              <Box flexGrow={1}>
                <StatusText
                  title="(A) Authorized for  Hire:"
                  data={responseStatuses(extraData?.authorized_for_hire).label}
                />
                <StatusText
                  title="(B) Exempt for  Hire:"
                  data={responseStatuses(extraData?.exempt_for_hire).label}
                />
                <StatusText
                  title="(C) Private(Property):"
                  data={responseStatuses(extraData?.private_property).label}
                />
                <StatusText
                  title="(D) Private Pass (Business):"
                  data={responseStatuses(extraData?.private_passenger_business).label}
                />
                <StatusText
                  title="(E) Private Pass  (Non-Business):"
                  data={responseStatuses(extraData?.private_passenger_nonbusiness).label}
                />
                <StatusText
                  title="(F) Migrant:"
                  data={responseStatuses(extraData?.migrant).label}
                />
              </Box>
              <Box flexGrow={1}>
                <StatusText
                  title="(G) U.S. Mail:"
                  data={responseStatuses(extraData?.us_mail).label}
                />
                <StatusText
                  title="(H) Federal Government:"
                  data={responseStatuses(extraData?.federal_government).label}
                />
                <StatusText
                  title="(I) State Government:"
                  data={responseStatuses(extraData?.state_government).label}
                />
                <StatusText
                  title="(J) Local Government:"
                  data={responseStatuses(extraData?.local_government).label}
                />
                <StatusText
                  title="(K) Indian Tribe:"
                  data={responseStatuses(extraData?.indian_tribe).label}
                />
              </Box>
            </Box>
          </CardData>
        </Box>
        {/* <Box mt="40px">
          <CardData>
            <Text
              fontSize="16px"
              fontWeight="600"
              color="secondary.700"
            >
              Cargo Type (s)
            </Text>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 1fr)"
              gap="20px"
              mt="8px"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="8px">
                <Text color="secondary.700">Beverages</Text>
                <Text color="secondary.700">Commodities Dry Bulk</Text>
                <Text color="secondary.700">Fresh Produce</Text>
                <Text color="secondary.700">Household Goods</Text>
                <Text color="secondary.700">Logs, Poles, Beams, Lumber</Text>
                <Text color="secondary.700">Mobile Homes</Text>
                <Text color="secondary.700">Passengers</Text>
                <Text color="secondary.700">Water Well</Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px">
                <Text color="secondary.700">Beverages</Text>
                <Text color="secondary.700">Commodities Dry Bulk</Text>
                <Text color="secondary.700">Fresh Produce</Text>
                <Text color="secondary.700">Household Goods</Text>
                <Text color="secondary.700">Logs, Poles, Beams, Lumber</Text>
                <Text color="secondary.700">Mobile Homes</Text>
                <Text color="secondary.700">Passengers</Text>
                <Text color="secondary.700">Water Well</Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px">
                <Text color="secondary.700">Beverages</Text>
                <Text color="secondary.700">Commodities Dry Bulk</Text>
                <Text color="secondary.700">Fresh Produce</Text>
                <Text color="secondary.700">Household Goods</Text>
                <Text color="secondary.700">Logs, Poles, Beams, Lumber</Text>
                <Text color="secondary.700">Mobile Homes</Text>
                <Text color="secondary.700">Passengers</Text>
                <Text color="secondary.700">Water Well</Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px">
                <Text color="secondary.700">Beverages</Text>
                <Text color="secondary.700">Commodities Dry Bulk</Text>
                <Text color="secondary.700">Fresh Produce</Text>
                <Text color="secondary.700">Household Goods</Text>
                <Text color="secondary.700">Logs, Poles, Beams, Lumber</Text>
                <Text color="secondary.700">Mobile Homes</Text>
                <Text color="secondary.700">Passengers</Text>
                <Text color="secondary.700">Water Well</Text>
              </Box>
            </Box>
            <Text
              fontWeight="600"
              fontSize="16px"
              color="secondary.700"
            >
              Other Cargo:
            </Text>
          </CardData>
        </Box> */}
        {/* <Box mt="40px">
          <CardData>
            <Text
              fontSize="16px"
              fontWeight="600"
              color="secondary.700"
              mb="8px"
            >
              Drivers
            </Text>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap="20px"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
              >
                <StatusText
                  title="Total Drivers:"
                  data="320"
                />
                <StatusText
                  title="CDL Employed Drivers:"
                  data="320"
                />
                <StatusText
                  title="Monthly Avarage Leased Drivers:"
                  data="320"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
              >
                <StatusText
                  title="Interstate Drivers:"
                  data="320"
                />
                <StatusText
                  title="Interstate < 100 Miles:"
                  data="320"
                />
                <StatusText
                  title="Interstate < 100 Miles:"
                  data="320"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
              >
                <StatusText
                  title="Interstate Drivers:"
                  data="320"
                />
                <StatusText
                  title="Interstate < 100 Miles:"
                  data="320"
                />
                <StatusText
                  title="Interstate > 100 Miles:"
                  data="320"
                />
              </Box>
            </Box>
          </CardData>
        </Box>
        <Box mt="40px">
          <CardData>
            <Text
              fontSize="16px"
              fontWeight="600"
              color="secondary.700"
              mb="8px"
            >
              Equipment
            </Text>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 1fr)"
              gap="20px"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
              >
                <StatusText
                  title="Fleet Sizw:"
                  data="320"
                />
                <StatusText
                  title="Total Power Units:"
                  data="320"
                />
                <StatusText
                  title="Total Trucks:"
                  data="320"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
              >
                <StatusText
                  title="Tractors Owned:"
                  data="320"
                />
                <StatusText
                  title="Trucks Owned:"
                  data="320"
                />
                <StatusText
                  title="Trailers Owned:"
                  data="320"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
              >
                <StatusText
                  title="Tractors Term Leased:"
                  data="320"
                />
                <StatusText
                  title="Trucks term Leased:"
                  data="320"
                />
                <StatusText
                  title="Trailers Term Leased:"
                  data="320"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="8px"
              >
                <StatusText
                  title="Tractors Trip Leased:"
                  data="320"
                />
                <StatusText
                  title="Trucks Trip Leased:"
                  data="320"
                />
                <StatusText
                  title="Trailers Trip Leased:"
                  data="320"
                />
              </Box>
            </Box>
          </CardData>
        </Box> */}
      </SectionCardBody>
    </SectionCard>
  </Box>;
};
