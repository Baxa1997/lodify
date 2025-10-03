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
import HFTextField from "../../../../components/HFTextField";
import styles from "../../MultiStepRegister.module.scss";
import HFPhoneInput from "../../../../components/HFPhoneInput";

const AddressDetails = ({control, errors, watch, onNext}) => {
  const [currentSubStep, setCurrentSubStep] = useState("form");
  const [phoneCode, setPhoneCode] = useState(["", "", "", ""]);
  const [emailCode, setEmailCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const formData = watch();

  const handlePhoneCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...phoneCode];
      newCode[index] = value;
      setPhoneCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`phone-code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleEmailCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...emailCode];
      newCode[index] = value;
      setEmailCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`email-code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
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
    const code = phoneCode.join("");
    if (code.length === 4) {
      setIsLoading(true);
      try {
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
    const code = emailCode.join("");
    if (code.length === 4) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onNext && onNext();
      } catch (error) {
        console.error("Failed to verify email code:", error);
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
        <VStack maxW="360px" align="start" spacing={4}>
          <Text fontSize="18px" fontWeight="600" color="#111827">
            Verification
          </Text>
          <Text fontSize="16px" color="#6B7280">
            Please input the code we just sent to your FMCSA linked phone number
          </Text>

          <HStack spacing={4} justify="center" w="100%">
            {phoneCode.map((digit, index) => (
              <Input
                key={index}
                id={`phone-code-${index}`}
                value={digit}
                onChange={(e) => handlePhoneCodeChange(index, e.target.value)}
                maxLength={1}
                width="60px"
                height="60px"
                textAlign="center"
                fontSize="24px"
                fontWeight="600"
                border="2px solid #d6d7da"
                borderRadius="8px"
                bg="white"
                _focus={{
                  borderColor: "#EF6820",
                  boxShadow: "0 0 0 3px rgba(239, 104, 32, 0.1)",
                }}
              />
            ))}
          </HStack>

          <Button
            w="100%"
            h="44px"
            bg="#EF6820"
            color="white"
            _hover={{bg: "#EF6820"}}
            borderRadius="8px"
            onClick={handleVerifyPhone}
            isLoading={isLoading}
            loadingText="Verifying..."
            isDisabled={phoneCode.join("").length !== 4}>
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
        </VStack>
      </Box>
    );
  }

  if (currentSubStep === "email") {
    return (
      <Box borderRadius="12px" bg="white" p={6}>
        <VStack align="start" spacing={4}>
          <Text fontSize="18px" fontWeight="600" color="#111827">
            Verify your Email
          </Text>
          <Text fontSize="16px" color="#6B7280">
            Please input the code we just sent to your FMCSA linked Email
          </Text>

          <HStack spacing={4} justify="center" w="100%">
            {emailCode.map((digit, index) => (
              <Input
                key={index}
                id={`email-code-${index}`}
                value={digit}
                onChange={(e) => handleEmailCodeChange(index, e.target.value)}
                maxLength={1}
                width="60px"
                height="60px"
                textAlign="center"
                fontSize="24px"
                fontWeight="600"
                border="2px solid #d6d7da"
                borderRadius="8px"
                bg="white"
                _focus={{
                  borderColor: "#EF6820",
                  boxShadow: "0 0 0 3px rgba(239, 104, 32, 0.1)",
                }}
              />
            ))}
          </HStack>

          <Button
            w="100%"
            h="44px"
            bg="#EF6820"
            color="white"
            _hover={{bg: "#EF6820"}}
            borderRadius="8px"
            onClick={handleVerifyEmail}
            isLoading={isLoading}
            loadingText="Verifying..."
            isDisabled={emailCode.join("").length !== 4}>
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
