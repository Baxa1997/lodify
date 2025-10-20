import httpRequest from "../utils/httpRequest";
import requestAuth from "../utils/requestAuth";

const chatService = {
  getList: (data) => {
    return httpRequest.post("v2/invoke_function/lodify-chat-gateway", {data});
  },
  getContacts: (clientTypeId, projectId) => {
    return requestAuth.get(
      `v2/user?client-type-id=${clientTypeId}&limit=10&offset=0&project-id=${projectId}`
    );
  },
};

export default chatService;
