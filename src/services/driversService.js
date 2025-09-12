import httpRequest from "../utils/httpRequest";

const driversService = {
  getList: () => httpRequest.get(`v2/items/drivers`, {}),
};

export default driversService;
