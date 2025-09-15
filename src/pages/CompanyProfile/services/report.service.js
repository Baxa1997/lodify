import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../../utils/httpRequest";

const reportService = {
  getCompanyInfo: (companyId) => httpRequest.get(`v1/object-slim/companies/${companyId}`).then(res => res.data),
};

export const useGetCompanyInfo = (params, companyId) => {
  return useQuery({
    queryKey: ["COMPANY_INFORMATION", params],
    queryFn: () => reportService.getCompanyInfo(companyId),
    ...params,
  });
};
