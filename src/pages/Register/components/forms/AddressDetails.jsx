import React, {useState} from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  Link,
  Input,
  HStack,
} from "@chakra-ui/react";
import OtpInput from "react-otp-input";
import HFTextField from "../../../../components/HFTextField";
import styles from "../../MultiStepRegister.module.scss";
import HFPhoneInput from "../../../../components/HFPhoneInput";

const AddressDetails = ({control, errors, watch, onNext}) => {
  const [currentSubStep, setCurrentSubStep] = useState("form");
  const [phoneCode, setPhoneCode] = useState("1234");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formData = watch();

  const handlePhoneCodeChange = (value) => {
    setPhoneCode(value);
  };

  const handleEmailCodeChange = (value) => {
    setEmailCode(value);
  };

  const handleSendPhoneCode = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentSubStep("phone-verify");
    } catch (error) {
      console.error("Failed to send phone code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmailCode = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentSubStep("email-verify");
    } catch (error) {
      console.error("Failed to send email code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (phoneCode.length === 4) {
      setIsLoading(true);
      try {
        // Simulate API call for phone verification
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCurrentSubStep("email");
      } catch (error) {
        console.error("Failed to verify phone code:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyEmail = async () => {
    if (emailCode.length === 4) {
      setIsLoading(true);
      try {
        // API call for email verification
        const response = await fetch("/api/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            code: emailCode,
          }),
        });

        if (response.ok) {
          onNext && onNext();
        } else {
          throw new Error("Email verification failed");
        }
      } catch (error) {
        console.error("Failed to verify email code:", error);
        // For now, still proceed to next step (remove this in production)
        onNext && onNext();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfirmAndContinue = () => {
    setCurrentSubStep("phone");
  };

  if (currentSubStep === "phone") {
    return (
      <Box borderRadius="12px" bg="white">
        <VStack maxW="360px" align="start" spacing={2}>
          <Text fontSize="18px" fontWeight="600" color="#111827">
            Enter Mobile Number
          </Text>
          <Text fontSize="16px" color="#6B7280">
            To ensure the security of your account, we require verification of
            your FMCSA linked phone number
          </Text>

          <Box w="100%">
            <Text fontSize="14px" fontWeight="500" color="#414651" mb={2}>
              Phone number <span style={{color: "#EF6820"}}>*</span>
            </Text>
            <HFPhoneInput disabled name="phone" control={control} />
          </Box>

          <Button
            w="100%"
            h="44px"
            bg="#EF6820"
            color="white"
            _hover={{bg: "#EF6820"}}
            borderRadius="8px"
            onClick={handleSendPhoneCode}
            isLoading={isLoading}
            loadingText="Sending...">
            Send Code
          </Button>

          <Flex align="center" gap="8px" justify="center" w="100%" mt={4}>
            <img src="/img/backArrow.svg" alt="arrow-left" />
            <Text
              fontSize="16px"
              color="#6B7280"
              cursor="pointer"
              onClick={() => setCurrentSubStep("form")}>
              Back to Verify Identity
            </Text>
          </Flex>
        </VStack>
      </Box>
    );
  }

  if (currentSubStep === "phone-verify") {
    return (
      <Box borderRadius="12px" bg="white">
        <Text
          fontSize="18px"
          w="360px"
          fontWeight="600"
          mb="8px"
          color="#111827">
          Verification
        </Text>
        <Text fontSize="16px" w="360px" color="#6B7280">
          Please input the code we just sent to your FMCSA linked phone number
        </Text>

        <Box display="flex" w="356px" mt="30px">
          <OtpInput
            value={phoneCode}
            onChange={handlePhoneCodeChange}
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
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
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
          onClick={handleVerifyPhone}
          isLoading={isLoading}
          loadingText="Verifying..."
          isDisabled={phoneCode.length !== 4}>
          Verify phone number
        </Button>

        <VStack spacing={2} w="100%">
          <Text fontSize="16px" color="#6B7280" textAlign="center">
            Code didn't send?{" "}
            <Link color="#EF6820" onClick={handleSendPhoneCode}>
              Click to resend
            </Link>
          </Text>
          <Flex align="center" gap="8px" justify="center">
            <img src="/img/backArrow.svg" alt="arrow-left" />
            <Text
              fontSize="16px"
              color="#6B7280"
              cursor="pointer"
              onClick={() => setCurrentSubStep("phone")}>
              Back to Verify Identity
            </Text>
          </Flex>
        </VStack>
      </Box>
    );
  }

  if (currentSubStep === "email") {
    return (
      <Box borderRadius="12px" bg="white">
        <Text
          fontSize="18px"
          w="360px"
          fontWeight="600"
          mb="8px"
          color="#111827">
          Verify your Email
        </Text>
        <Text w="360px" fontSize="16px" color="#6B7280">
          Please input the code we just sent to your FMCSA linked Email
        </Text>

        <Box display="flex" w="356px" my="20px">
          <OtpInput
            value={emailCode}
            onChange={handleEmailCodeChange}
            numInputs={4}
            renderSeparator={<span style={{width: "0px", gap: "4px"}} />}
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
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
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
          mb="20px"
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
          Verify Email
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
              onClick={() => setCurrentSubStep("phone-verify")}>
              Back to Verify Identity
            </Text>
          </Flex>
        </VStack>
      </Box>
    );
  }

  return (
    <Box borderRadius="12px" bg="white">
      <VStack align="start" spacing={2} mb={6}>
        <Text fontSize="18px" fontWeight="600" color="#111827">
          Let’s start with the basics.
        </Text>
        <Text maxW="560px" fontSize="18px" color="#535862" fontWeight="400">
          Please review the information below and confirm that it matches your
          FMCSA records
        </Text>
      </VStack>

      <Flex className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="legal_name"
          label="Legal name"
          placeholder="ACME LOGISTICS LLC"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="dba_name"
          label="DBA Name"
          placeholder="ACME LOGISTICS"
          disabled
        />
      </Flex>

      <Flex mt={4} className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="us_dot"
          label="US DOT"
          placeholder="US DOT Number"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="mc_number"
          label="MC"
          placeholder="MC number"
          disabled
        />
      </Flex>

      <Text my="20px" fontSize="16px" fontWeight="600" color="#1e293b">
        Physical Address
      </Text>

      <Flex className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="physical_address1"
          label="Address Line 1"
          placeholder="Address Line 1"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="physical_address2"
          label="Address Line 2"
          placeholder="Address Line 2"
          disabled
        />
      </Flex>

      <Flex mt={4} className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="city"
          label="City"
          placeholder="City"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="state"
          label="State"
          placeholder="State"
          disabled
        />
      </Flex>

      <Flex mt={4} className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="zip_code"
          label="ZIP"
          placeholder="Zip code"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="country"
          label="Country"
          placeholder="Country"
          disabled
        />
      </Flex>

      <Text fontSize="16px" fontWeight="600" color="#1e293b" my="20px">
        Contact Information
      </Text>

      <Flex className={styles.formRow}>
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="email"
          label="Email address"
          placeholder="Email address"
          disabled
        />
        <HFTextField
          borderColor={"#d6d7da"}
          control={control}
          name="phone"
          label="Phone number"
          placeholder="Phone number"
          disabled
        />
      </Flex>

      <Button
        mt={6}
        h="44px"
        w="100%"
        bg="#EF6820"
        color="white"
        _hover={{bg: "#EF6820"}}
        borderRadius="8px"
        onClick={handleConfirmAndContinue}>
        Confirm & Continue
      </Button>

      <VStack mt={4} spacing={2}>
        <Text fontSize="16px" color="#000" fontWeight="600">
          If something doesn’t look right,{" "}
          <Link color="#EF6820" href="#">
            Contact us
          </Link>
        </Text>
        <Flex align="center" gap="8px">
          <img src="/img/backArrow.svg" alt="arrow-left" />
          <Text fontSize="16px" color="#6B7280" cursor="pointer">
            Back to Select Carrier
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AddressDetails;
