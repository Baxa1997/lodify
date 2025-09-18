import httpRequest from "../utils/httpRequest";

const tripsService = {
  getList: (data) => {
    return httpRequest.post(`v2/invoke_function/lodify-trip-gateway`, {data});
  },
  getTripById: (data) =>
    httpRequest.post(`v2/invoke_function/lodify-trip-gateway`, {data}),
  getTripDetails: (id) => {
    const dataParam = JSON.stringify({id});
    return httpRequest.get(
      `v2/items/orders/${id}?data=${encodeURIComponent(dataParam)}`
    );
  },
  createTrip: (data) => httpRequest.post(`v2/items/trips`, data),
  updateTrip: (id, data) => httpRequest.put(`v2/items/trips`, data),
};

export default tripsService;
