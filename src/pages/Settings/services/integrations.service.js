import { useMutation, useQuery } from "@tanstack/react-query";
import httpRequest from "../../../utils/httpRequest";

const itemService = {
  getList: () => httpRequest.get("v2/items/integration"),
  update: (data) => httpRequest.put("v2/items/integration", data),
  create: (data) => httpRequest.post("v2/items/integration", data),
};

export const useGetIntegrations = (params = {}) => {
  return useQuery({
    queryKey: ["GET_INTEGRATIONS"],
    queryFn: () => itemService.getList(),
    select: (res) => res.data,
    ...params,
  });
};

export const useUpdateIntegrationsMutation = (params) => useMutation({ mutationFn: itemService.update, ...params });
export const useCreateIntegrationsMutation = (params) => useMutation({ mutationFn: itemService.create, ...params });
