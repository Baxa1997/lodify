import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import InputFormField from "../InputFormField";
import styles from "../../MultiStepRegister.module.scss";

const CompanyDetails = ({register, errors}) => {
  return (
    <Box className={styles.stepContent}>
      <InputFormField
        label="Company name"
        name="company_name"
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

      <InputFormField
        label="FMCSA"
        name="us_dot"
        placeholder="e.g., 1234567"
        register={register}
        errors={errors}
        isRequired
        validation={{
          required: "FMCSA is required",
          pattern: {
            value: /^[1-9][0-9]{0,6}$/,
            message:
              "Please enter a valid FMCSA number (1-7 digits, starting with 1-9)",
          },
        }}
      />

      <InputFormField
        label="Carrier Identifier"
        name="identifier"
        placeholder="SCAC"
        register={register}
        errors={errors}
        isRequired
        validation={{
          required: "Carrier Identifier is required",
          pattern: {
            value: /^[A-Z0-9]{2,4}$/,
            message:
              "Please enter a valid SCAC code (2-4 alphanumeric characters)",
          },
        }}
      />
    </Box>
  );
};

export default CompanyDetails;
