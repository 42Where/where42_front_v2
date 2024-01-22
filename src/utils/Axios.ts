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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error);
    error.response && console.log(error.response.status);
    // const { status } = error.response;
    if (error.response && error.response.status === 401) {
      console.log("401!!!!!!!!!!!!!!");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axios;
