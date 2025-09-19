import React, { useEffect } from "react";
import CompanyDetails from "./forms/CompanyDetails";
import AddressDetails from "./forms/AddressDetails";
import ContactDetails from "./forms/ContactDetails";
import VerificationStep from "./forms/VerificationStep";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "@utils/httpRequest";

const StepRenderer = ({
  currentStep,
  register,
  errors,
  watch,
  setValue,
  onSubmit,
  reset = () => {},
}) => {
  const fmcsa = watch("us_dot");

  const { data, isSuccess } = useQuery({
    queryKey: ["GET_FMCSA_DATA", fmcsa],
    queryFn: () => httpRequest.get(`https://lodify-usa.u-code.io/data/fmcsa/${fmcsa}/extra?page=1&limit=1`),
    enabled: Boolean(fmcsa && currentStep === 2),
  });

  useEffect(() => {
    if(isSuccess) {
      const responseData = data[0];
      reset({
        physical_address1: responseData?.phy_street,
        city: responseData?.phy_city,
        state: responseData?.phy_state,
        zip_code: responseData?.phy_zip,
        country: responseData?.phy_country,
        email: responseData?.email_address,
      });
    }
  }, [data]);

  switch (currentStep) {
  case 1:
    return <CompanyDetails
      register={register}
      errors={errors} />;
  case 2:
    return (
      <AddressDetails
        register={register}
        errors={errors}
        watch={watch}
      />
    );
  case 3:
    return <ContactDetails
      register={register}
      errors={errors}
    />;
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
