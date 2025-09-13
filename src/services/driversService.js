import httpRequest from "../utils/httpRequest";

const driversService = {
  getList: () => httpRequest.get(`v2/items/drivers`, {}),
  getDriverById: (id) =>
    httpRequest.get(`v1/object-slim/drivers/${id}?from-ofs=true`),
  updateDriver: (id, data) => httpRequest.put(`v2/items/drivers`, data),
};

export default driversService;
