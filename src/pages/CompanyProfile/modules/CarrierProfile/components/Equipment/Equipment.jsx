import { Box } from "@chakra-ui/react";
import { useEquipmentProps } from "./useEquipmentProps";
import { DataTable } from "@components/DataTable";
import { InfoAccordionItem, InfoAccordionButton, InfoAccordionPanel, InfoAccordionTitle } from "../../../../components/InfoAccordion";
import { InfoCard } from "../InfoCard";

export const Equipment = () => {

  const { headData, bodyData } = useEquipmentProps();

  return <Box>
    <InfoAccordionItem>
      <InfoAccordionButton>
        <Box
          display="flex"
          alignItems="center"
          jusBoxtifyContent="space-between"
        >
          <InfoAccordionTitle
            fontSize="18px"
            fontWeight="600"
            color="primary.500"
          >
            Equipment
          </InfoAccordionTitle>
        </Box>
      </InfoAccordionButton>
      <InfoAccordionPanel>
        <Box
          display="flex"
          gap="20px"
          mb="20px"
        >
          <InfoCard
            title="Preferred Areas"
            badgeText="27 States"
          />
          <InfoCard
            title="Cross Border"
            badgeText="No Preferrred Lanes"
            isEmpty
          />
        </Box>
        <DataTable
          headData={headData}
          data={bodyData}
          border="1px solid #E9EAEB"
          borderRadius="8px"
          pagination
        />
      </InfoAccordionPanel>
    </InfoAccordionItem>
  </Box>;
};
