import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Flex} from "@chakra-ui/react";
import RegisterSidebar from "./components/RegisterSidebar";
import RegisterForm from "./components/RegisterForm";
import styles from "./MultiStepRegister.module.scss";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      type: role,
      companyName: "",
      fmcsa: "",
      carrierIdentifier: "",
      legalName: "",
      usdot: "",
      mc: "",
      operatingStatus: "",
      mailingAddress: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      email: "",
      phone: "",
      emailCode: "",
      phoneCode: "",
    },
    mode: "onChange",
  });

  const validateStep1 = (data) => {
    const requiredFields = ["companyName", "fmcsa", "carrierIdentifier"];
    return requiredFields.every(
      (field) => data[field] && data[field].trim() !== ""
    );
  };

  const validateStep2 = (data) => {
    const requiredFields = ["addressLine1", "city", "state", "zipCode"];
    return requiredFields.every(
      (field) => data[field] && data[field].trim() !== ""
    );
  };

  const validateStep3 = (data) => {
    // Only check email field since the form accepts either email or phone in one field
    return data.email && data.email.trim() !== "";
  };

  const validateStep4 = (data) => {
    return data.emailCode && data.emailCode.length === 4;
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

    // Debug logging for step 3 (email validation)
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
      title: "Your details",
      completed: completedSteps.has(1),
      active: currentStep === 1,
    },
    {
      id: 2,
      title: "Address",
      completed: completedSteps.has(2),
      active: currentStep === 2,
    },
    {
      id: 3,
      title: "Email and Phone number",
      completed: completedSteps.has(3),
      active: currentStep === 3,
    },
    {
      id: 4,
      title: "Verification",
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

  const handleNext = async () => {
    if (currentStep < 4) {
      const isValid = await trigger();
      if (isValid && getStepValidation(currentStep)) {
        setCompletedSteps((prev) => new Set([...prev, currentStep]));
        setCurrentStep(currentStep + 1);
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
    setTimeout(() => {
      setIsLoading(false);
      navigate("/admin/dashboard");
    }, 1000);
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
        currentStep={currentStep}
        steps={steps}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        handleSubmit={handleSubmit(onSubmit)}
        onNext={handleNext}
        onBack={handleBack}
        isLoading={isLoading}
        getStepValidation={getStepValidation}
      />
    </Flex>
  );
};

export default Register;
