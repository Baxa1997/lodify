import httpRequest from "../utils/httpRequest";

const usersService = {
  getList: () => httpRequest.get(`v2/items/users`, {}),
  updateUser: (id, data) => httpRequest.put(`v2/items/users/${id}`, data),
  getUserById: (id) => httpRequest.get(`v2/items/users/${id}`, {}),
  deleteUser: (id, data) => httpRequest.delete(`v2/items/users/${id}`, {data}),
};

export default usersService;
