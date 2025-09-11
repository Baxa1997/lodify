import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import FormField from "../FormField";
import styles from "../../MultiStepRegister.module.scss";

const AddressDetails = ({register, errors}) => {
  return (
    <Box className={styles.stepContent}>
      <FormField
        label="Address Line 1"
        name="physical_address1"
        placeholder="606 Hillrose Ave Unit B"
        register={register}
        errors={errors}
        isRequired
        validation={{}}
      />

      <FormField
        label="Address Line 2"
        name="physical_address2"
        placeholder="Address Line 2 (Optional)"
        register={register}
        errors={errors}
      />

      <Flex className={styles.formRow}>
        <FormField
          label="City"
          name="city"
          placeholder="Dayton"
          register={register}
          errors={errors}
          isRequired
          validation={{}}
        />

        <FormField
          label="State"
          name="state"
          placeholder="OH"
          register={register}
          errors={errors}
          isRequired
          hasDropdown
          validation={{}}
        />
      </Flex>

      <Flex className={styles.formRow}>
        <FormField
          label="Zip code"
          name="zip_code"
          placeholder="45404"
          register={register}
          errors={errors}
          isRequired
          validation={{}}
        />

        <FormField
          label="Country"
          name="country"
          placeholder="United States"
          register={register}
          errors={errors}
          hasDropdown
        />
      </Flex>
    </Box>
  );
};

export default AddressDetails;
