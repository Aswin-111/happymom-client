import axios from "axios";

const interceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

interceptor.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" &&
      localStorage.getItem("happymom_acc_token");
    if (token && config.url !== "/admin/login") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle global error logic like token expiry
    return Promise.reject(error);
  }
);

export default interceptor;
