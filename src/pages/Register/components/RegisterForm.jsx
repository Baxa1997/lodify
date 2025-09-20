import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import StepRenderer from "./StepRenderer";
import FormNavigation from "./navigation/FormNavigation";
import styles from "../MultiStepRegister.module.scss";

const RegisterForm = ({
  currentStep,
  steps,
  register,
  errors,
  watch,
  setValue,
  handleSubmit,
  onNext,
  onBack,
  isLoading,
  getStepValidation,
  onSubmit = () => {},
  getValues = () => {},
  reset,
}) => {
  return (
    <Box className={styles.mainContent}>
      <Box className={styles.formContainer}>
        {currentStep !== 4 && (
          <>
            <Text
              as="h1"
              fontSize="24px"
              fontWeight="600"
              color="#1e293b"
              margin="0 0 8px 0">
              Create an account
            </Text>
            <Text
              color="#64748b"
              fontSize="16px"
              margin="0 0 30px 0">
              Please enter your details.
            </Text>
          </>
        )}

        <Box
          width="100%"
          as="form"
          onSubmit={handleSubmit}>
          <StepRenderer
            currentStep={currentStep}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onSubmit={onSubmit}
            getValues={getValues}
            reset={reset}
          />

          {currentStep < 4 && (
            <Box
              display="flex"
              justifyContent="center"
              width="100%">
              <Button
                type="button"
                className={styles.continueBtn}
                onClick={onNext}
                disabled={isLoading || !getStepValidation(currentStep)}
                width="360px"
                height="44px"
                padding="0 24px"
                background="#3b82f6"
                color="white"
                border="none"
                borderRadius="8px"
                fontSize="16px"
                fontWeight="600"
                cursor="pointer"
                transition="all 0.2s ease"
                marginBottom="30px"
                _hover={{
                  background: "#2563eb",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
                _disabled={{
                  background: "#e2e8f0",
                  color: "#9ca3af",
                  cursor: "not-allowed",
                  transform: "none",
                }}>
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </Box>
          )}
        </Box>

        <FormNavigation
          steps={steps}
          currentStep={currentStep}
          onBack={onBack}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default RegisterForm;
