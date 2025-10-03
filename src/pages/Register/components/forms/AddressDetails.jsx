import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import InputFormField from "../InputFormField";
import SelectFormField from "../SelectFormField";
import {US_STATES, COUNTRIES, ZIP_CODE_PATTERNS} from "../../constants/states";
import styles from "../../MultiStepRegister.module.scss";

const AddressDetails = ({register, errors, watch}) => {
  const selectedCountry = watch("country");

  const stateValidation = {
    required: "State is required",
  };

  const countryValidation = {
    required: "Country is required",
  };

  const zipCodeValidation = {
    required: "Zip code is required",
    pattern: {
      value: /^\d{5}(-\d{4})?$/,
      message: "Please enter a valid zip code (12345 or 12345-6789)",
    },
  };

  return (
    <Box className={styles.stepContent}>
      {/* <InputFormField
        label="Address Line 1"
        name="physical_address1"
        placeholder="606 Hillrose Ave Unit B"
        register={register}
        errors={errors}
        isRequired
        validation={{
          required: "Address Line 1 is required",
        }}
        disabled
      />

      <InputFormField
        label="Address Line 2"
        name="physical_address2"
        placeholder="Address Line 2 (Optional)"
        register={register}
        errors={errors}
      />

      <Flex className={styles.formRow}>
        <InputFormField
          label="City"
          name="city"
          placeholder="Dayton"
          register={register}
          errors={errors}
          isRequired
          disabled
          validation={{
            required: "City is required",
            minLength: {
              value: 2,
              message: "City must be at least 2 characters",
            },
          }}
        />

        <SelectFormField
          label="State"
          name="state"
          placeholder="Select State"
          register={register}
          errors={errors}
          isRequired
          options={US_STATES}
          validation={stateValidation}
          disabled
        />
      </Flex>

      <Flex
        mt={2}
        className={styles.formRow}>
        <InputFormField
          label="Zip code"
          name="zip_code"
          placeholder="45404"
          register={register}
          errors={errors}
          isRequired
          validation={zipCodeValidation}
          disabled
        />

        <SelectFormField
          label="Country"
          name="country"
          placeholder="Select Country"
          register={register}
          errors={errors}
          options={COUNTRIES}
          validation={countryValidation}
          disabled
        />
      </Flex> */}
    </Box>
  );
};

export default AddressDetails;
