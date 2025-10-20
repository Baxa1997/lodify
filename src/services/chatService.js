import httpRequest from "../utils/httpRequest";

const chatService = {
  getList: (data) => {
    return httpRequest.post("v2/invoke_function/lodify-chat-gateway", {data});
  },
};

export default chatService;
