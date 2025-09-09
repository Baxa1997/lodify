import requestAuth from "../../utils/requestAuth";
import requestV2 from "../../utils/requestV2";

const authService = {
  login: (data) =>
    requestV2.post(`v2/login`, data, {
      headers: {"environment-id": data.environment_id},
    }),
  multiCompanyLogin: (data) => requestAuth.post("v2/multi-company/login", data),
  register: (data) => requestAuth.post("/company", data),
  refreshToken: (data, params) => requestV2.put(`v2/refresh`, data, {params}),
  updateToken: (data, params) => requestV2.put(`v2/refresh`, data, {params}),
  verifyCode: (sms_id, data, params) =>
    requestAuth.post(`v2/auth/verify/${sms_id}`, data, {params}),
  sendAccessToken: (data) => requestAuth.post(`v2/auth/logout`, data),
  sendCode: (data, params) => requestAuth.post(`v2/send-code`, data, {params}),
};

export default authService;
