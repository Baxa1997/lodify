import { Box, Text } from "@chakra-ui/react";
import { InfoAccordionItem, InfoAccordionButton, InfoAccordionPanel, InfoAccordionTitle } from "../../../../components/InfoAccordion";
import { DataTable } from "@components/DataTable";
import { useActiveAndPendingInsuranceProps } from "./useActiveAndPendingInsuranceProps";
import { StatusBadge } from "@components/StatusBadge";

export const ActiveAndPendingInsurance = () => {

  const { headData, bodyData, onAccordionChange } = useActiveAndPendingInsuranceProps();

  return <Box>
    <InfoAccordionItem
      onChange={onAccordionChange}
    >
      <InfoAccordionButton>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <InfoAccordionTitle>
            Insurance
          </InfoAccordionTitle>
        </Box>
      </InfoAccordionButton>
      <InfoAccordionPanel>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap="20px"
        >
          <InsuranceCard />
          <InsuranceCard />
          <InsuranceCard />
          <InsuranceCard />
        </Box>
      </InfoAccordionPanel>
    </InfoAccordionItem>
  </Box>;
};

const InsuranceCard = () => {
  return <Box
    padding="20px"
    border="1px solid"
    borderColor="gray.border-main"
    borderRadius="12px"
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="24px"
    >
      <Text
        fontSize="16px"
        fontWeight="600"
        color="primary.500"
      >General Liability</Text>
      <StatusBadge status="active">Active</StatusBadge>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      gap="24px"
    >
      <Box>
        <Text
          color="tertiary.600"
          fontWeight="400"
          fontSize="14px"
          mb="4px"
        >Insurance name</Text>
        <Text
          fontWeight="500"
          fontSize="16px"
          color="primary.500"
        >The Burlington Insurance Company</Text>
      </Box>
      <Box>
        <Text
          color="tertiary.600"
          fontWeight="400"
          fontSize="14px"
          mb="4px"
        >Policy number</Text>
        <Text
          fontWeight="500"
          fontSize="16px"
          color="primary.500"
        >277B513423</Text>
      </Box>
      <Box
        display="flex"
        gap="24px"
      >
        <Box>
          <Text
            color="tertiary.600"
            fontWeight="400"
            fontSize="14px"
            mb="4px"
          >Effective date</Text>
          <Text
            fontWeight="500"
            fontSize="16px"
            color="primary.500"
          >04/01/2025</Text>
        </Box>
        <Box>
          <Text
            color="tertiary.600"
            fontWeight="400"
            fontSize="14px"
            mb="4px"
          >Expiration date</Text>
          <Text
            fontWeight="500"
            fontSize="16px"
            color="primary.500"
          >04/01/2025</Text>
        </Box>
      </Box>
      <Box>
        <Text
          color="tertiary.600"
          fontWeight="400"
          fontSize="14px"
          mb="4px"
        >Cancellation date</Text>
        <Text
          fontWeight="500"
          fontSize="16px"
          color="primary.500"
        >10/01/2025</Text>
      </Box>
      <Box
        display="flex"
        gap="24px"
      >
        <Box>
          <Text
            color="tertiary.600"
            fontWeight="400"
            fontSize="14px"
            mb="4px"
          >Each Occurrence</Text>
          <Text
            fontWeight="500"
            fontSize="16px"
            color="primary.500"
          >$1,000,000.00</Text>
        </Box>
        <Box>
          <Text
            color="tertiary.600"
            fontWeight="400"
            fontSize="14px"
            mb="4px"
          >General Aggregate</Text>
          <Text
            fontWeight="500"
            fontSize="16px"
            color="primary.500"
          >$2,000,000.00</Text>
        </Box>
      </Box>
    </Box>
  </Box>;
};
