import httpRequest from "../utils/httpRequest";

const assetsService = {
  getList: () => httpRequest.get(`v2/items/assets`, {}),
};

export default assetsService;
