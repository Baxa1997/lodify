import httpRequest from "../utils/httpRequest";

const clientsService = {
  getListShipper: () => {
    return httpRequest.get(`v2/items/shippers`);
  },
  getListRepresentative: () => {
    return httpRequest.get(`v2/items/representative`);
  },

  createShipper: (data) => {
    return httpRequest.post(`v2/items/shippers`, data);
  },

  createRepresentative: (data) => {
    return httpRequest.post(`v2/items/representative`, data);
  },
};

export default clientsService;
