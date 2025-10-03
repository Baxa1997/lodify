import React, {useState} from "react";
import {Box, Text, VStack, Button, Link, Flex} from "@chakra-ui/react";
import OtpInput from "react-otp-input";

const EmailOTP = ({
  email,
  onNext,
  onBack,
  currentSubStep,
  setCurrentSubStep,
}) => {
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailCodeChange = (value) => {
    setEmailCode(value);
  };

  const handleSendEmailCode = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Resend email code
    } catch (error) {
      console.error("Failed to resend email code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (emailCode.length === 4) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // After email verification, proceed to next step
        onNext && onNext();
      } catch (error) {
        console.error("Failed to verify email code:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box borderRadius="12px" bg="white">
      <Text fontSize="18px" w="360px" fontWeight="600" mb="8px" color="#111827">
        Check your email
      </Text>
      <Text fontSize="16px" w="360px" color="#6B7280" mb="30px">
        We sent a verification code to {email}
      </Text>

      <Box display="flex" w="356px" mt="30px">
        <OtpInput
          value={emailCode}
          onChange={handleEmailCodeChange}
          numInputs={4}
          renderSeparator={<span style={{width: "0px"}} />}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "80px",
                height: "80px",
                fontSize: "24px",
                fontWeight: "600",
                textAlign: "center",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                background: "#f8fafc",
                color: "#1e293b",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              placeholder="0"
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.background = "white";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.background = "#f8fafc";
                e.target.style.boxShadow = "none";
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = "#cbd5e1";
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = "#e2e8f0";
                }
              }}
            />
          )}
          inputStyle={{
            width: "70px",
            height: "70px",
            fontSize: "24px",
            fontWeight: "600",
            textAlign: "center",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            background: "#f8fafc",
            color: "#1e293b",
            outline: "none",
            transition: "all 0.2s ease",
          }}
          focusStyle={{
            borderColor: "#3b82f6",
            background: "white",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
          }}
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        />
      </Box>

      <Button
        my="20px"
        w="100%"
        h="44px"
        bg="#EF6820"
        color="white"
        _hover={{bg: "#EF6820"}}
        borderRadius="8px"
        onClick={handleVerifyEmail}
        isLoading={isLoading}
        loadingText="Verifying..."
        isDisabled={emailCode.length !== 4}>
        Verify email
      </Button>

      <VStack spacing={2} w="100%">
        <Text fontSize="16px" color="#6B7280" textAlign="center">
          Code didn't send?{" "}
          <Link color="#EF6820" onClick={handleSendEmailCode}>
            Click to resend
          </Link>
        </Text>
        <Flex align="center" gap="8px" justify="center">
          <img src="/img/backArrow.svg" alt="arrow-left" />
          <Text
            fontSize="16px"
            color="#6B7280"
            cursor="pointer"
            onClick={() => setCurrentSubStep("email")}>
            Back to Email Entry
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default EmailOTP;
