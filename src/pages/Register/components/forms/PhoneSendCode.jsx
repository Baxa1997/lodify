import React, {useState} from "react";
import {Box, VStack, Text, Button, Flex} from "@chakra-ui/react";
import HFPhoneInput from "@components/HFPhoneInput";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "../../../../config/firebase";

function PhoneSendCode({control, setCurrentSubStep = () => {}, formData = {}}) {
  const [isLoading, setIsLoading] = useState(false);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      }
    );
  };

  const handleSendPhoneCode = (event) => {
    event.preventDefault();
    generateRecaptcha();
    console.log("recaptchaVerifier", window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier;
    const phone = formData.phone;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box borderRadius="12px" bg="white">
      <VStack align="start" spacing={2}>
        <Text maxW="360px" fontSize="18px" fontWeight="600" color="#111827">
          Enter Mobile Number
        </Text>
        <Text fontSize="16px" maxW="360px" color="#6B7280">
          To ensure the security of your account, we require verification of
          your FMCSA linked phone number
        </Text>

        <Box w="100%" mt="16px">
          <Text fontSize="14px" fontWeight="500" color="#414651" mb={2}>
            Phone number <span style={{color: "#EF6820"}}>*</span>
          </Text>
          <HFPhoneInput disabled name="phone" control={control} />
        </Box>

        <Button
          mt="10px"
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

      <div
        id="recaptcha-container"
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "center",
          height: "30px",
          width: "100%",
        }}></div>
    </Box>
  );
}

export default PhoneSendCode;
