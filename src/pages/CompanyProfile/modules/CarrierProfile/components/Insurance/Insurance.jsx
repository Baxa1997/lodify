import { Box, Button, Text } from "@chakra-ui/react";
import { SectionCard, SectionCardBody, SectionCardHeader } from "../../../../components/SectionCard/SectionCard";
import { PiCertificateBold } from "react-icons/pi";
import { BoldLink } from "../../../../components/BoldLink";
import { StatusText } from "../../../../components/StatusText";
import { CardData } from "../../../../components/CardData";

export const Insurance = () => {

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
          Insurance
        </Text>
      </SectionCardHeader>
      <SectionCardBody>
        <Box
          display="grid"
          gridTemplateColumns={"repeat(2, 1fr)"}
          gap="20px"
        >
          <CardData>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Text
                fontSize="16px"
                fontWeight="600"
                color="secondary.700"
              >
                General Liability
              </Text>
              <BoldLink icon={<PiCertificateBold />}>
                View cert
              </BoldLink>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="8px"
              mt="8px"
            >
              <StatusText
                title="Agent:"
                data="Cottingham and Butler"
              />
              <StatusText
                title="Underwriter:"
                data="ARCH INSURANCE COMPANY"
              />
              <StatusText
                title="A.M. Best Rating:"
                data="A+"
              />
              <StatusText
                title="Policy Number:"
                data="ZAGLB618900"
              />
              <StatusText
                title="Expiration Date:"
                data="07/05/2026"
              />
              <StatusText
                title="Cancellation Date:"
                data=""
              />
              <StatusText
                title="Covarage Limit:"
                data="1,000,000"
              />
              <StatusText
                title="Deductible:"
                data=""
              />
            </Box>
          </CardData>
          <CardData>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Text
                fontSize="16px"
                fontWeight="600"
                color="secondary.700"
              >
                Auto Liability
              </Text>
              <BoldLink icon={<PiCertificateBold />}>
                View cert
              </BoldLink>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="8px"
              mt="8px"
            >
              <StatusText
                title="Agent:"
                data="Cottingham and Butler"
              />
              <StatusText
                title="Underwriter:"
                data="ARCH INSURANCE COMPANY"
              />
              <StatusText
                title="A.M. Best Rating:"
                data="A+"
              />
              <StatusText
                title="Policy Number:"
                data="ZAGLB618900"
              />
              <StatusText
                title="Expiration Date:"
                data="07/05/2026"
              />
              <StatusText
                title="Cancellation Date:"
                data=""
              />
              <StatusText
                title="Covarage Limit:"
                data="1,000,000"
              />
              <StatusText
                title="Deductible:"
                data=""
              />
            </Box>
          </CardData>
          <CardData>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Text
                fontSize="16px"
                fontWeight="600"
                color="secondary.700"
              >
                Workers comp
              </Text>
              <BoldLink icon={<PiCertificateBold />}>
                View cert
              </BoldLink>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="8px"
              mt="8px"
            >
              <StatusText
                title="Agent:"
                data="Cottingham and Butler"
              />
              <StatusText
                title="Underwriter:"
                data="ARCH INSURANCE COMPANY"
              />
              <StatusText
                title="A.M. Best Rating:"
                data="A+"
              />
              <StatusText
                title="Policy Number:"
                data="ZAGLB618900"
              />
              <StatusText
                title="Expiration Date:"
                data="07/05/2026"
              />
              <StatusText
                title="Cancellation Date:"
                data=""
              />
              <StatusText
                title="Covarage Limit:"
                data="1,000,000"
              />
              <StatusText
                title="Deductible:"
                data=""
              />
            </Box>
          </CardData>
          <CardData>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Text
                fontSize="16px"
                fontWeight="600"
                color="secondary.700"
              >
                Cargo Liability
              </Text>
              <BoldLink icon={<PiCertificateBold />}>
                View cert
              </BoldLink>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="8px"
              mt="8px"
            >
              <StatusText
                title="Agent:"
                data="Cottingham and Butler"
              />
              <StatusText
                title="Underwriter:"
                data="ARCH INSURANCE COMPANY"
              />
              <StatusText
                title="A.M. Best Rating:"
                data="A+"
              />
              <StatusText
                title="Policy Number:"
                data="ZAGLB618900"
              />
              <StatusText
                title="Expiration Date:"
                data="07/05/2026"
              />
              <StatusText
                title="Cancellation Date:"
                data=""
              />
              <StatusText
                title="Covarage Limit:"
                data="1,000,000"
              />
              <StatusText
                title="Deductible:"
                data=""
              />
            </Box>
          </CardData>
        </Box>
        <Box mt="20px">
          <Button
            variant="solid"
            colorScheme="blue"
          >
            Request Certificate of insurance
          </Button>
        </Box>
        <Box mt="40px">
          <Text
            color="#4E5155"
            fontWeight="600"
            mb="20px"
          >
            Carrier Insurance on File with the FMCSA
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="20px"
          >
            <Box
              width="100%"
              display="flex"
              gap="20px"
            >
              <CardData flexGrow={1}>
                <Text
                  fontSize="16px"
                  fontWeight="600"
                  color="secondary.700"
                  mb="8px"
                >
                BIPD Insurance
                </Text>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="8px"
                >
                  <StatusText
                    title="BIPD Required:"
                    data="$1,000,000"
                  />
                  <StatusText
                    title="BIPD On File:"
                    data="$1,000,000"
                  />
                </Box>
              </CardData>
              <CardData flexGrow={1}>
                <Text
                  fontSize="16px"
                  fontWeight="600"
                  color="secondary.700"
                  mb="8px"
                >
                HHG Cargo Insurance
                </Text>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="8px"
                >
                  <StatusText
                    title="Cargo Required:"
                    data="No"
                  />
                  <StatusText
                    title="Cargo On File:"
                    data="No"
                  />
                </Box>
              </CardData>
              <CardData flexGrow={1}>
                <Text
                  fontSize="16px"
                  fontWeight="600"
                  color="secondary.700"
                  mb="8px"
                >
                General Liability
                </Text>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="8px"
                >
                  <StatusText
                    title="Bond Surety Required:"
                    data="No"
                  />
                  <StatusText
                    title="Bond Surety On File:"
                    data="No"
                  />
                </Box>
              </CardData>
            </Box>
            <Box>
              <CardData flexGrow={1}>
                <Text
                  fontSize="16px"
                  fontWeight="600"
                  color="secondary.700"
                  mb="8px"
                >
              BIPD/Primary
                </Text>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="8px"
                >
                  <StatusText
                    title="Underwriter:"
                    data="AMERICAN ALTERNATIVE INSURANCE CORPORATION"
                  />
                  <StatusText
                    title="Policy Number:"
                    data="3RA2TP0000042"
                  />
                  <StatusText
                    title="Posted Date:"
                    data="07/05/2026"
                  />
                  <StatusText
                    title="Effective Date:"
                    data="07/05/2026"
                  />
                  <StatusText
                    title="Cancel Date:"
                    data=""
                  />
                  <StatusText
                    title="Covarage Amount:"
                    data="$1,000,000"
                  />
                </Box>
              </CardData>
            </Box>
          </Box>
        </Box>
      </SectionCardBody>
    </SectionCard>
  </Box>;
};
