import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import FormField from "../FormField";
import styles from "../../MultiStepRegister.module.scss";

const CompanyDetails = ({register, errors}) => {
  return (
    <Box className={styles.stepContent}>
      <FormField
        label="Company name"
        name="company_name"
        placeholder="Company name"
        register={register}
        errors={errors}
        isRequired
        validation={{}}
      />

      <FormField
        label="FMCSA"
        name="us_dot"
        placeholder="e.g., USDOT 1234567 or MC 654321"
        register={register}
        errors={errors}
        isRequired
        hasDropdown
        validation={{}}
      />

      <FormField
        label="Carrier Identifier"
        name="identifier"
        placeholder="SCAC"
        register={register}
        errors={errors}
        isRequired
        validation={{}}
      />
    </Box>
  );
};

export default CompanyDetails;
