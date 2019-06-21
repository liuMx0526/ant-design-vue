import axios from "axios";
import { notification } from "ant-design-vue";

const service = axios.create({
  baseURL: "",
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    let token = "Bearer " + "tokendata";
    if (token && config.headers.Authorization === undefined) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    const {
      response: { status, statusText },
      config: { url }
    } = error;
    notification.error({
      message: h => {
        return h(
          <div>
            请求错误 <span style="color: red">{status}</span> : {url}
          </div>
        );
      },
      description: statusText
    });
    return Promise.reject(error);
  }
);

export default service;
