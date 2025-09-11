import httpRequest from "../utils/httpRequest";

const usersService = {
  getList: () => httpRequest.get(`v2/items/users`, {}),
};

export default usersService;
