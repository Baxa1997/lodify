import React from "react";
import {Box, Text} from "@chakra-ui/react";
import FormField from "../FormField";
import styles from "../../MultiStepRegister.module.scss";

const ContactDetails = ({register, errors}) => {
  return (
    <Box className={styles.stepContent}>
      <FormField
        label="Email or phone number"
        name="email"
        placeholder="name@domain.com or +1 555-123-4567"
        register={register}
        errors={errors}
        isRequired
        validation={{
          required: "Email or phone number is required",
          pattern: {
            value:
              /^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email or phone number",
          },
        }}>
        <Text pt={"6px"} fontSize="12px" color="#64748b">
          We'll send a one-time code to what you enter.
        </Text>
      </FormField>
    </Box>
  );
};

export default ContactDetails;
