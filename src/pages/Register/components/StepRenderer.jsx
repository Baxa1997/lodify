import React from "react";
import CompanyDetails from "./forms/CompanyDetails";
import AddressDetails from "./forms/AddressDetails";
import ContactDetails from "./forms/ContactDetails";
import VerificationStep from "./forms/VerificationStep";

const StepRenderer = ({
  currentStep,
  register,
  errors,
  watch,
  setValue,
  onSubmit,
}) => {
  switch (currentStep) {
    case 1:
      return <CompanyDetails register={register} errors={errors} />;
    case 2:
      return <AddressDetails register={register} errors={errors} />;
    case 3:
      return <ContactDetails register={register} errors={errors} />;
    case 4:
      return (
        <VerificationStep
          watch={watch}
          setValue={setValue}
          onSubmit={onSubmit}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
