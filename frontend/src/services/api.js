import axios from "axios";

/*
=================================================
API INSTANCE
=================================================
*/

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

/*
=================================================
REQUEST INTERCEPTOR
=================================================

Automatically attach JWT token to every API request.
*/

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};

      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("================================");
    console.log(
      "🌐 API URL:",
      config.baseURL
    );

    console.log(
      "📡 API Request:",
      config.method?.toUpperCase(),
      config.url
    );

    console.log(
      "🔐 Token:",
      token ? "Present ✅" : "Missing ❌"
    );

    console.log("================================");

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/*
=================================================
RESPONSE INTERCEPTOR
=================================================

IMPORTANT:

Do NOT automatically redirect to /login here.

Authentication is handled by:

AuthContext
        +
ProtectedRoute

A single failed API request should NOT destroy
the user's entire login session.

This is especially important for:

/inbox
/chat
/offers
/farmer-offers
/marketplace

etc.
*/

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    console.error("================================");
    console.error("❌ API ERROR");

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Status:",
      error.response?.status
    );

    console.error(
      "Data:",
      error.response?.data
    );

    console.error(
      "URL:",
      error.config?.url
    );

    console.error("================================");

    /*
    =================================================
    401 UNAUTHORIZED
    =================================================

    Do NOT remove token here.

    The component that made the request can handle
    the error.

    AuthContext is responsible for deciding whether
    the authentication session is actually invalid.
    */

    if (error.response?.status === 401) {
      console.warn(
        "⚠️ API returned 401 Unauthorized."
      );

      console.warn(
        "Authentication data was NOT automatically removed."
      );
    }

    return Promise.reject(error);
  }
);

export default api;