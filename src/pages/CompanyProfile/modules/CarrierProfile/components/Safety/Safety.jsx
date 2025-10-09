import { Box, Text } from "@chakra-ui/react";
import { StatusText } from "../../../../components/StatusText";
import { CardData } from "../../../../components/CardData";
import { format, isValid } from "date-fns";
import { InfoAccordionItem, InfoAccordionButton, InfoAccordionPanel, InfoAccordionTitle } from "../../../../components/InfoAccordion";

export const Safety = ({ data = {} }) => {

  const {
    safety_rating_date,
    safety_rating,
    safety_review_date,
    safety_type,
    mcs_150_form_date,
    mcs_150_year,
    mcs_150_mileage,
  } = data;

  return <Box>
    <InfoAccordionItem >
      <InfoAccordionButton>
        <InfoAccordionTitle>
          Safety
        </InfoAccordionTitle>
      </InfoAccordionButton>
      <InfoAccordionPanel>
        <Box
          display="flex"
          alignItems="flex-start"
          gap="20px"
        >
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
              Safety
            </Text>
            <StatusText
              title="Safety Rating:"
              data={safety_rating}
            />
            <StatusText
              title="Rating Date:"
              data={isValid(new Date(safety_rating_date)) ? format(new Date(safety_rating_date), "dd/MM/yyyy") : ""}
            />
          </CardData>
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
              MCS-150 Most Recent
            </Text>
            <StatusText
              title="Date:"
              data={mcs_150_form_date}
            />
            <StatusText
              title="MCS-150 Year:"
              data={mcs_150_year}
            />
            <StatusText
              title="MCS-150 Miles:"
              data={mcs_150_mileage}
            />
          </CardData>
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
              Latest Review
            </Text>
            <StatusText
              title="Review Type:"
              data={safety_type}
            />
            <StatusText
              title="Review Date:"
              data={safety_review_date}
            />
            <StatusText
              title="Document:"
              data="None"
            />
            <StatusText
              title="Reported Miles:"
              data="None"
            />
          </CardData>
        </Box>
      </InfoAccordionPanel>
    </InfoAccordionItem>
  </Box>;
};
