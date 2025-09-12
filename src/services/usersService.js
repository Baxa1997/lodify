import httpRequest from "../utils/httpRequest";

const usersService = {
  getList: () => httpRequest.get(`v2/items/users`, {}),
  deleteUser: (id) => httpRequest.delete(`v2/items/users/${id}`, {}),
};

export default usersService;
