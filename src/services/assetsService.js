import httpRequest from "../utils/httpRequest";

const assetsService = {
  getList: () => httpRequest.get(`v2/items/assets`, {}),
  getAssetById: (id) =>
    httpRequest.get(`v1/object-slim/assets/${id}?from-ofs=true`),
  updateAsset: (id, data) => httpRequest.put(`v2/items/assets/${id}`, data),
  getFuelTypes: () => httpRequest.get("v1/fuel-types"),
};

export default assetsService;
