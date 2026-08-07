import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

/* =====================================
   REQUEST INTERCEPTOR
===================================== */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("================================");
    console.log("🌐 API URL:", config.baseURL);
    console.log("📡 API Request:", config.method?.toUpperCase(), config.url);

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/* =====================================
   RESPONSE INTERCEPTOR
===================================== */

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    console.error("================================");
    console.error("❌ API ERROR");
    console.error("Message:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("================================");

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;