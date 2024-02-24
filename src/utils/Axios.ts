import Axios, { AxiosRequestConfig } from "axios";
import useUserStore from "@/stores/useUserStore";

const axios = Axios.create({
  baseURL: undefined,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("accessToken"))
      ?.split("=")[1];
    // const accessToken = localStorage.getItem("accessToken");
    // console.log("accessToken", accessToken);

    // console.log("access", accessToken);
    // console.log("refresh", refreshToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    console.log(response.config.url, response.config.data, response.status);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // const refreshToken = document.cookie
      //   .split(";")
      //   .find((cookie) => cookie.includes("refreshToken"))
      //   ?.split("=")[1];
      // if (refreshToken) {
      //   localStorage.setItem("accessToken", refreshToken);
      // }
      // axios
      //   .post("/v3/jwt/reissue")
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // axios
      //   .post("/v3/jwt/reissue", {
      //     Headers: { Authorization: `Bearer ${refreshToken}` },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     // document.cookie = `accessToken=${res.data.accessToken}`;
      //   })
      //   .catch((err) => {});
      // axios
      //   .post("/v3/jwt/reissue", {
      //     refreshToken: document.cookie
      //       .split(";")
      //       .find((cookie) => cookie.includes("refreshToken"))
      //       ?.split("=")[1],
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     // document.cookie = `accessToken=${res.data.accessToken}`;
      //   });
    }
    return Promise.reject(error);
  }
);

export default axios;
