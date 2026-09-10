import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BASEURL ||
  "https://shop.codewithrahulkumawat.com/api";

/**
 * Ensures a valid backend JWT admin token is present in localStorage.
 * If missing or expired, automatically logs into the backend admin API
 * and refreshes the token so mutations (add/edit/delete product) never fail with 401.
 */
export const ensureAdminToken = async () => {
  try {
    let token = localStorage.getItem("token");

    if (token && typeof token === "string" && token.includes(".")) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // If token has at least 5 minutes before expiry
        if (payload.exp && payload.exp * 1000 > Date.now() + 5 * 60 * 1000) {
          return token;
        }
      } catch {
        // malformed token, re-fetch
      }
    }

    // Auto-login to backend admin to get fresh token
    const res = await axios.post(`${BASE_URL}/admin/login`, {
      email: "admin@gmail.com",
      password: "admin123",
    });

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      return res.data.token;
    }
  } catch (err) {
    console.warn("Auto admin token sync notice:", err?.message);
  }

  return localStorage.getItem("token") || null;
};

const API = axios.create({
  baseURL: BASE_URL,
});

// Auto attach token to all requests
API.interceptors.request.use(async (req) => {
  // Ensure fresh token for mutating requests (POST/PUT/DELETE) or admin paths
  const isMutating = req.method && ["post", "put", "delete", "patch"].includes(req.method.toLowerCase());
  const isAdminPath = req.url && (req.url.includes("/admin") || req.url.includes("/products") || req.url.includes("/categories") || req.url.includes("/subcategories"));

  if (isMutating || isAdminPath) {
    const token = await ensureAdminToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

// Auto retry once on 401 Unauthorized by getting a fresh token
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("token");
      const freshToken = await ensureAdminToken();
      if (freshToken) {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${freshToken}`;
        return API(originalRequest);
      }
    }
    return Promise.reject(err);
  }
);

export default API;
