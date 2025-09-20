import { useEffect } from "react";
import CompanyDetails from "./forms/CompanyDetails";
import AddressDetails from "./forms/AddressDetails";
import ContactDetails from "./forms/ContactDetails";
import VerificationStep from "./forms/VerificationStep";
import { useGetLodify } from "@services/lodify-user.service";

const StepRenderer = ({
  currentStep,
  register,
  errors,
  watch,
  setValue,
  onSubmit,
  reset = () => {},
  getValues = () => {},
}) => {
  const fmcsa = watch("us_dot");

  const { data, isSuccess } = useGetLodify(fmcsa, {
    enabled: Boolean(fmcsa && currentStep === 2),
  });

  useEffect(() => {
    if(isSuccess) {
      const responseData = data[0];
      reset({
        ...getValues(),
        physical_address1: responseData?.phy_street,
        city: responseData?.phy_city,
        state: responseData?.phy_state,
        zip_code: responseData?.phy_zip,
        country: responseData?.phy_country,
        email: responseData?.email_address,
        phone: responseData?.telephone,
        client_type_id: "706337d3-80dc-4aca-80b3-67fad16cd0d6",
        role_id: "abc236d0-8a9a-4b10-9f44-6b51fcb35e9f",
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
