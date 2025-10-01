import React from "react";
import {Flex} from "@chakra-ui/react";
import {Box} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import HFSelect from "../../../../components/HFSelect";

function FirstSection({control}) {
  return (
    <Flex
      border="1px solid #E9EAEB"
      borderRadius="12px"
      p="24px"
      alignItems="center"
      gap="24px"
      justifyContent="space-between">
      <Box w={"100%"}>
        <Text mb={"6px"} fontSize={"14px"} fontWeight={"500"} color={"#414651"}>
          Customer <span>*</span>
        </Text>
        <HFSelect
          view_field="legal_name"
          value="guid"
          table_slug="companies"
          size="md"
          control={control}
          name="company_id"
          options={[]}
        />
      </Box>
      <Box w={"100%"}>
        <Text mb={"6px"} fontSize={"14px"} fontWeight={"500"} color={"#414651"}>
          Load ID <span>*</span>
        </Text>
        <HFSelect
          view_field="full_name"
          value="guid"
          table_slug="users"
          size="md"
          width={"100%"}
          control={control}
          name="users_id"
          options={[]}
        />
      </Box>
      <Box w={"100%"}>
        <Text mb={"6px"} fontSize={"14px"} fontWeight={"500"} color={"#414651"}>
          Created By <span>*</span>
        </Text>
        <HFSelect
          view_field="external_id"
          value="guid"
          table_slug="trailers"
          size="md"
          width={"100%"}
          control={control}
          name="trailers_id"
          options={[]}
        />
      </Box>
    </Flex>
  );
}

export default FirstSection;
