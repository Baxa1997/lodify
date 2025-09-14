import { useMutation, useQuery } from "@tanstack/react-query";
import httpRequest from "../../../utils/httpRequest";

const reportService = {
  getUsdotInfo: (data) => httpRequest.post("v3/menus/3829e676-0d59-42bc-abec-fff34ec3f0da/views/347d9ac8-56e7-42fe-9262-2cae202fe45a/tables/insurance_history/items/list?project-id=7380859b-8dac-4fe3-b7aa-1fdfcdb4f5c1", data).then(res => res.data),
  getOperatingInfo: (params) => httpRequest.get("", { params }).then(res => res.data),
  getCompanyInfo: (params) => httpRequest.get("", { params }).then(res => res.data),
};

// export const useGetUsdotInfo = (params, props) => {
//   return useQuery({
//     queryKey: ["USDOT_INFORMATION", params],
//     queryFn: () => reportService.getUsdotInfo(props),
//     ...params,
//   });
// };

export const useGetUsdotInfo = (params) => useMutation({
  mutationFn: reportService.getUsdotInfo,
  ...params,
});

export const useGetOperatingInfo = (params, props) => {
  return useQuery({
    queryKey: ["OPERATING_INFORMATION", params],
    queryFn: () => reportService.getOperatingInfo(props),
    ...params,
  });
};

export const useGetCompanyInfo = (params, props) => {
  return useQuery({
    queryKey: ["COMPANY_INFORMATION", params],
    queryFn: () => reportService.getCompanyInfo(props),
    ...params,
  });
};
