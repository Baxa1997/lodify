import { useForm } from "react-hook-form";
import { useGetUsdotInfo } from "../../services/report.service";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useReportProps = () => {
  const { company_id, guid, client_type_id, role_id } = useSelector(state => state.auth.user_data);

  console.log({ company_id });

  const { control, watch, setValue, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const usdotMutation = useGetUsdotInfo({ 
    onSuccess: (data) => {
      console.log(data);
    }, 
  });

  useEffect(() => {
    usdotMutation.mutate({
      data: {
        offset: 0,
        limit: 20,
        companies_id: [
          company_id || guid,
        ],
      },
    });
  }, []);

  return { control, watch, setValue, handleSubmit, onSubmit };
};