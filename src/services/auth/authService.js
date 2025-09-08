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
  verifyCode: (sms_id, otp, data) =>
    requestAuth.post(`/verify/${sms_id}/${otp}`, data),
  sendAccessToken: (data) => requestAuth.post(`v2/auth/logout`, data),
};

export default authService;
