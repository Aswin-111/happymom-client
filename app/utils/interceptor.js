// utils/interceptor.js
import axios from "axios";

const TOKEN_KEY = "happymom_acc_token";

const interceptor = axios.create();

interceptor.interceptors.request.use(
  (config) => {
    if (!config.baseURL) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        console.error("NEXT_PUBLIC_BASE_URL is not defined.");
        return Promise.reject(new Error("API base URL is not configured."));
      }
      config.baseURL = baseUrl;
    }

    const publicEndpoints = [
      "/auth/signup",
      "/auth/login",
      "/auth/fetchreferraldata",
    ];

    const isPublicEndpoint = publicEndpoints.some((ep) =>
      config.url.startsWith(ep)
    );

    if (!isPublicEndpoint) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn(`No token found for protected endpoint ${config.url}`);
        // Optionally reject or handle accordingly
      }
    }

    return config;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  }
);

interceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error("Unauthorized access. Token might be invalid or expired.");
      localStorage.removeItem();
      // You may want to use Next.js router here if inside a React component
      window.location.href = "/login";
    }
    console.error("Axios response error:", error);
    return Promise.reject(error);
  }
);

export default interceptor;
