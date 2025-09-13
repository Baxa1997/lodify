import { useForm } from "react-hook-form";

export const useCompanyInfoProps = () => {

  const { control } = useForm();

  return {
    control,
  };
};