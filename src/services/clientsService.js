import httpRequest from "../utils/httpRequest";

const clientsService = {
  getListShipper: () => {
    return httpRequest.get(`v2/items/shippers`);
  },
  getListRepresentative: () => {
    return httpRequest.get(`v2/items/representative`);
  },
};

export default clientsService;
