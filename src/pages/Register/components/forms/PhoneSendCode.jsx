import React, {useState, useEffect} from "react";
import {Box, VStack, Text, Button, Flex, useToast} from "@chakra-ui/react";
import HFPhoneInput from "@components/HFPhoneInput";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  connectAuthEmulator,
} from "firebase/auth";
import {auth} from "../../../../config/firebase";

function PhoneSendCode({control, setCurrentSubStep = () => {}, formData = {}}) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (window.location.hostname === "localhost") {
      try {
        connectAuthEmulator(auth, "http://localhost:9099");
        auth.settings.appVerificationDisabledForTesting = true;
        console.log("⚙️ Firebase Auth Emulator enabled (reCAPTCHA bypassed)");
      } catch (err) {
        console.log("⚙️ Emulator already connected");
      }
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("✅ reCAPTCHA solved");
          },
          "expired-callback": () => {
            toast({
              title: "reCAPTCHA expired",
              description: "Please try again.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
          },
        }
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
        console.log("🔐 reCAPTCHA ready with ID:", widgetId);
      });
    }
  }, [toast]);

  const handleSendPhoneCode = async (event) => {
    event.preventDefault();
    const phone = formData.phone;

    if (!phone || !phone.match(/^\+\d{10,15}$/)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter number with + and country code.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) throw new Error("RecaptchaVerifier not ready.");

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

      window.confirmationResult = confirmationResult;

      toast({
        title: "SMS Sent!",
        description: "Verification code sent successfully.",
        status: "success",
        duration: 3000,
      });

      setCurrentSubStep("phone-verify");
    } catch (error) {
      console.error("Error sending code:", error);
      toast({
        title: "Verification Failed",
        description:
          error.message || "Unable to send code. Check reCAPTCHA setup.",
        status: "error",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box borderRadius="12px" bg="white">
      <VStack align="start" spacing={2}>
        <Text maxW="360px" fontSize="18px" fontWeight="600" color="#111827">
          Enter Mobile Number
        </Text>
        <Text fontSize="16px" maxW="360px" color="#6B7280">
          To ensure the security of your account, we require verification of
          your FMCSA linked phone number.
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
