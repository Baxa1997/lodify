import { useForm } from "react-hook-form";
import { useGetCompanySingle } from "../../services/companyInfo.service";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useCompanyInfoProps = () => {
  const { company_id, guid } = useSelector(state => state.auth.user_data);

  const id = company_id || guid;

  const { watch, setValue, reset, control } = useForm();

  const { data } = useGetCompanySingle({}, "50327dac-b610-420e-8a79-730e9db12dc8");


  useEffect(() => {
    if(data?.response) {
      const formData = {
        company_name: data.response.company_name,
        identifier: data.response.identifier,
        us_dot_number: data.response.us_dot_number,
        mc_number: data.response.mc_number,
        email: data.response.email,
        phone: data.response.phone,
        physical_address: data.response.physical_address,
        city: data.response.city,
        state: data.response.state,
        zip_code: data.response.zip_code,
        country: data.response.country,
      };
      reset(formData);
    }
  }, [data]);

  return {
    control,
    watch,
    setValue,
  };
};