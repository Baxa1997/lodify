import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import FormField from "../FormField";
import styles from "../../MultiStepRegister.module.scss";

const CompanyDetails = ({register, errors}) => {
  return (
    <Box className={styles.stepContent}>
      <FormField
        label="Company name"
        name="companyName"
        placeholder="Company name"
        register={register}
        errors={errors}
        isRequired
        validation={{
          required: "Company name is required",
          minLength: {
            value: 2,
            message: "Company name must be at least 2 characters",
          },
        }}
      />

      <FormField
        label="FMCSA"
        name="fmcsa"
        placeholder="e.g., USDOT 1234567 or MC 654321"
        register={register}
        errors={errors}
        isRequired
        hasDropdown
        validation={{
          required: "FMCSA is required",
          minLength: {
            value: 3,
            message: "FMCSA must be at least 3 characters",
          },
        }}
      />

      <FormField
        label="Carrier Identifier"
        name="carrierIdentifier"
        placeholder="SCAC"
        register={register}
        errors={errors}
        isRequired
        validation={{
          required: "Carrier Identifier is required",
          minLength: {
            value: 2,
            message: "Carrier Identifier must be at least 2 characters",
          },
        }}
      />
    </Box>
  );
};

export default CompanyDetails;
