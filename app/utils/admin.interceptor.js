import axios from "axios";

const interceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

interceptor.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" &&
      localStorage.getItem("happymom_admin_acc_token");
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
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Token might be invalid or expired.");
      localStorage.removeItem("happymom_admin_acc_token");
      // You may want to use Next.js router here if inside a React component
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default interceptor;
