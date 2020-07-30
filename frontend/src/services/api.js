import axios from "axios";

import { logout } from "services/auth.service";

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  responseType: "json",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    const originalRequest = error.config;
    if (error.response && error.response.data && error.response.data.message === "jwt expired") {
      if (originalRequest.url !== "/refresh-token") {
        return new Promise((resolve, reject) => {
          api
            .post("/refresh-token")
            .then(() => {
              return resolve(axios(originalRequest));
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        logout(true);
      }
    }
  }
);

export default api;
