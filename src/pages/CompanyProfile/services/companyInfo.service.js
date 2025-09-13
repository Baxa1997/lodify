import { useMutation, useQuery } from "@tanstack/react-query";
import httpRequest from "../../../utils/httpRequest";

const itemService = {
  getSingle: (id) => httpRequest.get(`v1/object-slim/companies/${id}`),
  updateSingle: (data) => httpRequest.put("/v2/items/companies", data),
};

export const useGetCompanySingle = (params = {}, id) => {
  return useQuery({
    queryKey: ["GET_COMPANY_SINGLE", id],
    queryFn: () => itemService.getSingle(id),
    select: (res) => res.data,
    enabled: !!id,
    ...params,
  });
};

export const useUpdateCompanySingleMutation = (params) => useMutation({ mutationFn: itemService.updateSingle, ...params });
