import React from "react";
import {Box, Text, Button, Flex} from "@chakra-ui/react";
import StepRenderer from "./StepRenderer";
import styles from "../MultiStepRegister.module.scss";

const RegisterForm = ({
  currentStep,
  steps,
  errors,
  control,
  watch,
  setValue,
  handleSubmit,
  onNext = () => {},
  onBack = () => {},
  isLoading,
  getStepValidation,
  onSubmit = () => {},
  getValues = () => {},
  handleStepChange = () => {},
  reset,
}) => {
  return (
    <Box className={styles.mainContent}>
      <Flex
        width="100%"
        bg="#FAFAFA"
        p="20px 24px"
        gap="16px"
        borderBottom={"1px solid #d6d7da"}>
        <Flex
          bg="#fff"
          border={"1px solid #d6d7da"}
          alignItems="center"
          justifyContent="center"
          w="52px"
          h="53px"
          borderRadius="12px">
          <img src="/img/registerUserIcon.svg" alt="" width="28px" h="28px" />
        </Flex>

        <Box>
          <Text color="#181D27" fontWeight="600" fontSize="16px">
            Create your account
          </Text>
          <Text mt="4px" color="#535862" fontSize="13px" fontWeight="400">
            Select Carrier
          </Text>
        </Box>
      </Flex>
      <Box className={styles.formContainer}>
        <Box width="100%" as="form" onSubmit={handleSubmit}>
          <StepRenderer
            control={control}
            currentStep={currentStep}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onSubmit={onSubmit}
            getValues={getValues}
            reset={reset}
            onNext={onNext}
            handleStepChange={handleStepChange}
          />

          {currentStep === 4 && (
            <Box display="flex" width="100%">
              <Button
                type="button"
                onClick={onNext}
                disabled={isLoading || !getStepValidation(currentStep)}
                width="360px"
                height="44px"
                padding="0 24px"
                background="#EF6820"
                color="white"
                border="none"
                borderRadius="8px"
                fontSize="16px"
                fontWeight="600"
                cursor="pointer"
                transition="all 0.2s ease"
                marginBottom="30px"
                _hover={{
                  background: "#EF6820",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
                _disabled={{
                  background: "#E2E8F0",
                  color: "#9CA3AF",
                  cursor: "not-allowed",
                  transform: "none",
                }}>
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
