import CompanyDetails from "./forms/CompanyDetails";
import AddressDetails from "./forms/AddressDetails";
import ContactDetails from "./forms/ContactDetails";
import VerificationStep from "./forms/VerificationStep";
import PhoneVerification from "./forms/PhoneVerification";
import EmailVerification from "./forms/EmailVerification";
import EmailOTP from "./forms/EmailOTP";
import {useGetLodify} from "@services/lodify-user.service";

const StepRenderer = ({
  currentStep,
  control,
  errors,
  watch,
  setValue,
  onSubmit,
  reset = () => {},
  getValues = () => {},
  onNext = () => {},
  currentSubStep,
  setCurrentSubStep,
}) => {
  switch (currentStep) {
    case 1:
      return (
        <CompanyDetails
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
          onNext={onNext}
          reset={reset}
          getValues={getValues}
        />
      );
    case 2:
      return (
        <AddressDetails
          control={control}
          errors={errors}
          watch={watch}
          onNext={onNext}
        />
      );
    case 3:
      return (
        <ContactDetails control={control} errors={errors} onNext={onNext} />
      );
    case 4:
      // Handle verification substeps
      switch (currentSubStep) {
        case "phone":
        case "phone-verify":
          return (
            <PhoneVerification
              phone={watch("phone")}
              onNext={onNext}
              currentSubStep={currentSubStep}
              setCurrentSubStep={setCurrentSubStep}
              setValue={setValue}
            />
          );
        case "email":
          return (
            <EmailVerification
              email={watch("email")}
              onNext={onNext}
              currentSubStep={currentSubStep}
              setCurrentSubStep={setCurrentSubStep}
              setValue={setValue}
            />
          );
        case "email-verify":
          return (
            <EmailOTP
              email={watch("email")}
              onNext={onNext}
              currentSubStep={currentSubStep}
              setCurrentSubStep={setCurrentSubStep}
            />
          );
        default:
          return (
            <PhoneVerification
              phone={watch("phone")}
              onNext={onNext}
              currentSubStep={currentSubStep}
              setCurrentSubStep={setCurrentSubStep}
              setValue={setValue}
            />
          );
      }
    default:
      return null;
  }
};

export default StepRenderer;
