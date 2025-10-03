import React from "react";
import {Box, Flex, Text, VStack, Button, Link} from "@chakra-ui/react";
import HFTextField from "../../../../components/HFTextField";
import HFSelect from "../../../../components/HFSelect";
import {US_STATES, COUNTRIES} from "../../constants/states";
import styles from "../../MultiStepRegister.module.scss";

const AddressDetails = ({control, errors, watch}) => {
  console.log("watchwatchwatch", watch());
  return (
    <Box borderRadius="12px" bg="white">
      <VStack align="start" spacing={2} mb={6}>
        <Text fontSize="18px" fontWeight="600" color="#111827">
          Let’s start with the basics.
        </Text>
        <Text maxW="560px" fontSize="18px" color="#535862" fontWeight="400">
          Please review the information below and confirm that it matches your
          FMCSA records
        </Text>
      </VStack>

      <Flex className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="legal_name"
          label="Legal name"
          placeholder="ACME LOGISTICS LLC"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="dba_name"
          label="DBA Name"
          placeholder="ACME LOGISTICS"
          disabled
        />
      </Flex>

      <Flex mt={4} className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="us_dot"
          label="US DOT"
          placeholder="US DOT Number"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="mc_number"
          label="MC"
          placeholder="MC number"
          disabled
        />
      </Flex>

      <Text my="20px" fontSize="16px" fontWeight="600" color="#1e293b">
        Physical Address
      </Text>

      <Flex className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="physical_address1"
          label="Address Line 1"
          placeholder="Address Line 1"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="physical_address2"
          label="Address Line 2"
          placeholder="Address Line 2"
          disabled
        />
      </Flex>

      <Flex mt={4} className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="city"
          label="City"
          placeholder="City"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="state"
          label="State"
          placeholder="State"
          disabled
        />
      </Flex>

      <Flex mt={4} className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="zip_code"
          label="ZIP"
          placeholder="Zip code"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="country"
          label="Country"
          placeholder="Country"
          disabled
        />
      </Flex>

      <Text fontSize="16px" fontWeight="600" color="#1e293b" my="20px">
        Contact Information
      </Text>

      <Flex className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="email"
          label="Email address"
          placeholder="Email address"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="phone"
          label="Phone number"
          placeholder="Phone number"
          disabled
        />
      </Flex>

      <Button
        mt={6}
        h="44px"
        w="100%"
        bg="#EF6820"
        color="white"
        _hover={{bg: "#EF6820"}}
        borderRadius="8px">
        Confirm & Continue
      </Button>

      <VStack mt={4} spacing={2}>
        <Text fontSize="16px" color="#000" fontWeight="600">
          If something doesn’t look right,{" "}
          <Link color="#EF6820" href="#">
            Contact us
          </Link>
        </Text>
        <Flex align="center" gap="8px">
          <img src="/img/backArrow.svg" alt="arrow-left" />
          <Text fontSize="16px" color="#6B7280" cursor="pointer">
            Back to Select Carrier
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AddressDetails;
