import React from "react";
import {Box, Text} from "@chakra-ui/react";
import FormField from "../FormField";
import styles from "../../MultiStepRegister.module.scss";

const ContactDetails = ({register, errors}) => {
  return (
    <Box className={styles.stepContent}>
      <FormField
        type="email"
        label="Email Address"
        name="email"
        placeholder="Enter email address"
        register={register}
        errors={errors}
        isRequired
        validation={{}}
      />

      <FormField
        label="Login"
        name="login"
        placeholder="Create a login"
        register={register}
        errors={errors}
        isRequired
        validation={{}}
      />

      <FormField
        type="password"
        label="Password"
        name="password"
        placeholder="Create a password"
        register={register}
        errors={errors}
        isRequired
        validation={{}}
      />
    </Box>
  );
};

export default ContactDetails;
