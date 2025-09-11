import React, {useState} from "react";
import {Box, Text, Button} from "@chakra-ui/react";
import OtpInput from "react-otp-input";
import styles from "../../MultiStepRegister.module.scss";
import {useQuery} from "@tanstack/react-query";
import authService from "../../../../services/auth/authService";

const VerificationStep = ({
  watch,
  setValue = () => {},
  onSubmit = () => {},
}) => {
  const [otp, setOtp] = useState("");

  const {data: smsId, refetch} = useQuery({
    queryKey: ["SEND_CODE"],
    queryFn: () => {
      return authService.sendCode(
        {
          type: "MAILCHIMP",
          recipient: watch("email"),
          sms_template_id: "4b73c53e-df0b-4f24-8d24-e7f03d858cda",
          field_slug: "text",
          variables: {},
        },
        {
          project_id: "7380859b-8dac-4fe3-b7aa-1fdfcdb4f5c1",
        }
      );
    },
    enabled: Boolean(watch("email")),
    select: (res) => res?.sms_id,
  });

  const handleOtpChange = (value) => {
    setOtp(value);
    setValue("emailCode", value);
  };

  const handleVerify = () => {
    authService
      .verifyCode(
        smsId,
        {
          provider: "email",
          otp: otp,
        },
        {
          project_id: "7380859b-8dac-4fe3-b7aa-1fdfcdb4f5c1",
        }
      )
      .then((res) => {
        onSubmit(watch());
        console.log("resresressss", res);
      });
  };

  const isOtpComplete = otp.length === 4;

  return (
    <Box className={styles.stepContent}>
      <Box className={styles.verificationContent}>
        <Box className={styles.verificationIcon}>
          <img src="/img/mail.svg" alt="" />
        </Box>
        <Text as="h3" fontSize="30px" fontWeight="600" color="#1e293b" mb="8px">
          Check your email
        </Text>
        <Text color="#64748b" fontSize="16px" mb="30px">
          We sent a verification link to{" "}
          {watch("email") || "bahridnurullav@gmail.com"}
        </Text>

        <Box className={styles.verificationContentOtp}>
          <Box className={styles.verificationCode}>
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
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
              focusStyle={{
                borderColor: "#3b82f6",
                background: "white",
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
              }}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            />
          </Box>

          <Button
            type="button"
            className={styles.verifyBtn}
            width="100%"
            background="#3b82f6"
            color="white"
            border="none"
            padding="12px 24px"
            borderRadius="8px"
            fontSize="16px"
            fontWeight="600"
            cursor="pointer"
            transition="all 0.2s ease"
            marginBottom="20px"
            onClick={handleVerify}
            isDisabled={!isOtpComplete}
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
              boxShadow: "none",
            }}>
            Verify email
          </Button>
        </Box>

        <Text
          className={styles.resendText}
          color="#64748b"
          fontSize="14px"
          margin="0">
          Didn't receive the email?{" "}
          <Text
            onClick={refetch}
            as="span"
            className={styles.resendLink}
            color="#3b82f6"
            cursor="pointer"
            textDecoration="underline">
            Click to resend
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default VerificationStep;
