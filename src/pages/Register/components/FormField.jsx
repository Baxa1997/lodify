import React from "react";
import {Box, Input, Text} from "@chakra-ui/react";
import styles from "../MultiStepRegister.module.scss";

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  validation = {},
  isRequired = false,
  hasDropdown = false,
  children,
  ...inputProps
}) => {
  return (
    <Box className={styles.formGroup}>
      <Text as="label" htmlFor={name} className={styles.formLabel}>
        {label} <span>{isRequired && "*"}</span>
      </Text>

      <Box className={hasDropdown ? styles.inputWithDropdown : ""}>
        <Input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          {...register(name, validation)}
          isInvalid={!!errors[name]}
          errorBorderColor="#e53e3e"
          className={styles.formInput}
          sx={{
            width: "360px",
            padding: hasDropdown ? "12px 40px 12px 16px" : "12px 16px",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "16px",
            transition: "all 0.2s ease",
            background: "white",
            _focus: {
              outline: "none",
              borderColor: "#3b82f6",
              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
            },
          }}
          {...inputProps}
        />
        {hasDropdown && <Text className={styles.dropdownIcon}>▼</Text>}
      </Box>

      {children}
    </Box>
  );
};

export default FormField;
