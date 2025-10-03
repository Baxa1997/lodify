import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Flex, useToast} from "@chakra-ui/react";
import RegisterSidebar from "./components/RegisterSidebar";
import RegisterForm from "./components/RegisterForm";
import authService from "../../services/auth/authService";
import styles from "./MultiStepRegister.module.scss";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    trigger,
    control,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      company_name: "",
      us_dot: "",
      identifier: "",
      legal_name: "",
      operating_status: "",
      mailing_address: "",
      physical_address1: "",
      physical_address2: "",
      city: "",
      state: "",
      zip_code: "",
      country: "United States",
      login: "",
      password: "",
      email: "",
      phone: "",
      emailCode: "",
      emailSmsId: "",
      type: "phone",
      client_type_id: "706337d3-80dc-4aca-80b3-67fad16cd0d6",
      role_id: "abc236d0-8a9a-4b10-9f44-6b51fcb35e9f",
    },
    mode: "onChange",
  });

  const validateStep1 = (data) => {
    return true;
  };

  const validateStep2 = (data) => {
    const requiredFields = [
      "physical_address1",
      "city",
      "state",
      "zip_code",
      "country",
    ];
    const hasRequiredFields = requiredFields.every(
      (field) => data[field] && data[field].trim() !== ""
    );

    if (data.zip_code && !/^\d{5}(-\d{4})?$/.test(data.zip_code)) {
      return false;
    }

    return hasRequiredFields;
  };

  const validateStep3 = (data) => {
    return true;
    // const requiredFields = ["email", "login", "password"];
    // return requiredFields.every(
    //   (field) => data[field] && data[field].trim() !== ""
    // );
  };

  const validateStep4 = (data) => {
    return data.emailCode && data.emailCode.trim() !== "";
  };

  const getStepValidation = (step) => {
    const data = watch();
    const isValid = (() => {
      switch (step) {
        case 1:
          return validateStep1(data);
        case 2:
          return validateStep2(data);
        case 3:
          return validateStep3(data);
        case 4:
          return validateStep4(data);
        default:
          return false;
      }
    })();

    if (step === 3) {
      console.log("Step 3 validation debug:", {
        email: data.email,
        emailTrimmed: data.email?.trim(),
        isValid: isValid,
        hasEmail: !!data.email,
        emailLength: data.email?.length,
      });
    }

    return isValid;
  };

  const steps = [
    {
      id: 1,
      title: "Select Carrier",
      completed: completedSteps.has(1),
      active: currentStep === 1,
    },
    {
      id: 2,
      title: "Verify Contact Info",
      completed: completedSteps.has(2),
      active: currentStep === 2,
    },
    {
      id: 3,
      title: "Verify Identity",
      completed: completedSteps.has(3),
      active: currentStep === 3,
    },
    {
      id: 4,
      title: "Join Carrier",
      completed: completedSteps.has(4),
      active: currentStep === 4,
    },
  ];

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
      setValue("type", location.state.role);
    } else {
      navigate("/login");
    }
  }, [location.state, navigate]);

  const handleNext = (skip = false) => {
    console.log("currentStep", currentStep);

    if (currentStep < 4) {
      if (getStepValidation(currentStep)) {
        setCompletedSteps((prev) => new Set([...prev, currentStep]));
        setCurrentStep(currentStep + 1);
      } else {
        if (skip) {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (step) => {
    if (
      step <= currentStep ||
      (step === currentStep + 1 && completedSteps.has(currentStep))
    ) {
      setCurrentStep(step);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const apiData = {
        company_name: data.company_name,
        us_dot: data.us_dot,
        identifier: data.identifier,
        physical_address: data.physical_address1,
        mailing_address: data.mailing_address,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        country: data.country,
        login: data.login,
        password: data.password,
        phone: data.phone || "",
        email: data.email,
        type: "login",
        client_type_id: data.client_type_id,
        role_id: data.role_id,
      };

      const response = await authService.register(apiData);

      toast({
        title: "Registration Successful!",
        description:
          "Your account has been created successfully. Please log in to continue.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      toast({
        title: "Registration Failed",
        description:
          error?.response?.data?.message ||
          "Failed to create account. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!role) {
    return null;
  }

  return (
    <Flex className={styles.multiStepContainer} minHeight="100vh">
      <RegisterSidebar
        steps={steps}
        currentStep={currentStep}
        handleStepChange={handleStepChange}
      />
      <RegisterForm
        control={control}
        onSubmit={onSubmit}
        currentStep={currentStep}
        steps={steps}
        errors={errors}
        watch={watch}
        setValue={setValue}
        reset={reset}
        getValues={getValues}
        handleSubmit={handleSubmit(onSubmit)}
        onNext={handleNext}
        onBack={handleBack}
        isLoading={isLoading}
        handleStepChange={handleStepChange}
        getStepValidation={getStepValidation}
      />
    </Flex>
  );
};

export default Register;
