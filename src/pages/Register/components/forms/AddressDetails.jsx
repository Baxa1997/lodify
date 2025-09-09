import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import FormField from "../FormField";
import styles from "../../MultiStepRegister.module.scss";

const AddressDetails = ({register, errors}) => {
  return (
    <Box className={styles.stepContent}>
      <FormField
        label="Address Line 1"
        name="addressLine1"
        placeholder="606 Hillrose Ave Unit B"
        register={register}
        errors={errors}
        isRequired
        validation={{
          required: "Address Line 1 is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        }}
      />

      <FormField
        label="Address Line 2"
        name="addressLine2"
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
          validation={{
            required: "City is required",
            minLength: {
              value: 2,
              message: "City must be at least 2 characters",
            },
          }}
        />

        <FormField
          label="State"
          name="state"
          placeholder="OH"
          register={register}
          errors={errors}
          isRequired
          hasDropdown
          validation={{
            required: "State is required",
            minLength: {
              value: 2,
              message: "State must be at least 2 characters",
            },
          }}
        />
      </Flex>

      <Flex className={styles.formRow}>
        <FormField
          label="Zip code"
          name="zipCode"
          placeholder="45404"
          register={register}
          errors={errors}
          isRequired
          validation={{
            required: "Zip code is required",
            pattern: {
              value: /^\d{5}(-\d{4})?$/,
              message: "Please enter a valid zip code",
            },
          }}
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
