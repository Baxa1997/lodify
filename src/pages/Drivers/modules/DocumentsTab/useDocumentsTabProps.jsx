import { useGetTable } from "@services/items.service";
import { useSelector } from "react-redux";


export const useDocumentsTabProps = () => {

  const { companies_id: companyId, guid } = useSelector(state => state.auth.user_data);

  const companies_id = companyId || guid;

  const { data } = useGetTable("docuemnts", {}, { data: JSON.stringify({ companies_id }) });

  return {
    data,
  };
};
