import httpRequest from "../utils/httpRequest";

const driversService = {
  getList: () => httpRequest.get(`v2/items/drivers`, {}),
  getDriverById: (id) => httpRequest.get(`v2/items/drivers/${id}`, {}),
  updateDriver: (id, data) => httpRequest.put(`v2/items/drivers/${id}`, data),
};

export default driversService;
