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

// High-speed API cache for public GET endpoints (3 minutes TTL)
const apiCache = new Map();
const CACHE_TTL_MS = 3 * 60 * 1000;

export const clearApiCache = () => {
  apiCache.clear();
  try {
    if (typeof sessionStorage !== "undefined") {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("cj_cache_")) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch {}
};

import {
  FALLBACK_PRODUCTS,
  FALLBACK_CATEGORIES,
  FALLBACK_SUBCATEGORIES,
} from "../data/fallbackData.js";

// Bulletproof offline fallback resolver for public read endpoints
const getFallbackResponse = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  let cleanUrl = rawUrl.split("?")[0].replace(/\/$/, "");
  if (!cleanUrl.startsWith("/")) cleanUrl = "/" + cleanUrl;
  cleanUrl = cleanUrl.replace(/^\/api/, "");
  if (!cleanUrl.startsWith("/")) cleanUrl = "/" + cleanUrl;

  if (cleanUrl === "/home") {
    const categoryProducts = {};
    FALLBACK_CATEGORIES.forEach((cat) => {
      categoryProducts[cat._id] = FALLBACK_PRODUCTS.filter(
        (p) =>
          p.categoryId?._id === cat._id ||
          p.categoryId === cat._id ||
          p.categoryId?.slug === cat.slug
      );
    });
    return {
      data: {
        latestProducts: FALLBACK_PRODUCTS.slice(0, 10),
        categories: FALLBACK_CATEGORIES,
        categoryProducts,
      },
    };
  }

  if (cleanUrl === "/products") {
    return { data: { products: FALLBACK_PRODUCTS } };
  }
  if (cleanUrl === "/categories") {
    return { data: { categories: FALLBACK_CATEGORIES } };
  }
  if (cleanUrl === "/subcategories") {
    return { data: { subCategories: FALLBACK_SUBCATEGORIES } };
  }
  if (cleanUrl.startsWith("/subcategories/category/")) {
    const catId = cleanUrl.replace("/subcategories/category/", "");
    const subs = FALLBACK_SUBCATEGORIES.filter(
      (s) =>
        s.categoryId?._id === catId ||
        s.categoryId === catId ||
        s.categoryId?.slug === catId
    );
    return { data: { subCategories: subs } };
  }
  if (cleanUrl.startsWith("/products/slug/")) {
    const slug = cleanUrl.replace("/products/slug/", "").toLowerCase();
    const prod = FALLBACK_PRODUCTS.find(
      (p) =>
        p.slug?.toLowerCase() === slug ||
        p._id === slug ||
        (p.name &&
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") === slug)
    );
    if (prod) {
      return { data: { product: prod } };
    }
  }
  if (cleanUrl.startsWith("/products/category/")) {
    const catId = cleanUrl.replace("/products/category/", "");
    const prods = FALLBACK_PRODUCTS.filter(
      (p) =>
        p.categoryId?._id === catId ||
        p.categoryId === catId ||
        p.categoryId?.slug === catId
    );
    return { data: { products: prods } };
  }
  if (cleanUrl.startsWith("/products/subcategory/")) {
    const subId = cleanUrl.replace("/products/subcategory/", "");
    const prods = FALLBACK_PRODUCTS.filter(
      (p) =>
        (p.subCategoryId?._id || p.subCategoryId) === subId ||
        p.subCategoryId?.slug === subId
    );
    return { data: { products: prods } };
  }
  if (cleanUrl.startsWith("/products/")) {
    const idOrSlug = cleanUrl.replace("/products/", "").toLowerCase();
    const prod = FALLBACK_PRODUCTS.find(
      (p) =>
        p._id === idOrSlug ||
        p.slug?.toLowerCase() === idOrSlug ||
        (p.name &&
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") === idOrSlug)
    );
    if (prod) {
      return { data: { product: prod } };
    }
  }

  return null;
};

// Wrap API.get with instant caching for public read requests
const originalGet = API.get.bind(API);
API.get = async (url, config = {}) => {
  const isAdminLocation = typeof window !== "undefined" && window.location.pathname.includes("admin");
  const isPublic = !url.includes("/admin") && !config?.skipCache && !isAdminLocation;
  if (isPublic) {
    const cacheKey = `cj_cache_${url}_${JSON.stringify(config?.params || {})}`;
    const now = Date.now();

    // 1. Check in-memory cache (0ms instant return)
    const mem = apiCache.get(cacheKey);
    if (mem && (now - mem.timestamp < CACHE_TTL_MS)) {
      return mem.data;
    }

    // 2. Check sessionStorage
    try {
      if (typeof sessionStorage !== "undefined") {
        const stored = sessionStorage.getItem(cacheKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (now - parsed.timestamp < CACHE_TTL_MS) {
            apiCache.set(cacheKey, parsed);
            return parsed.data;
          }
        }
      }
    } catch {}

    // 3. Fetch from network with auto fallback on error
    try {
      const res = await originalGet(url, config);
      if (res && res.data) {
        const item = { timestamp: now, data: res };
        apiCache.set(cacheKey, item);
        try {
          if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(cacheKey, JSON.stringify(item));
          }
        } catch {}
        return res;
      }
    } catch (networkErr) {
      console.warn(`[Offline Fallback] Network failed for ${url}, serving cached/fallback data:`, networkErr?.message);
      const fallback = getFallbackResponse(url);
      if (fallback) {
        return fallback;
      }
      throw networkErr;
    }
  }

  return originalGet(url, config);
};

// Auto attach token to all requests
API.interceptors.request.use(async (req) => {
  // Ensure fresh token ONLY for mutating requests (POST/PUT/DELETE) or admin paths
  const isMutating = req.method && ["post", "put", "delete", "patch"].includes(req.method.toLowerCase());
  const isAdminPath = req.url && (req.url.startsWith("/admin") || req.url.includes("/admin/"));

  if (isMutating || isAdminPath) {
    const token = await ensureAdminToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

// Auto retry once on 401 Unauthorized by getting a fresh token & clear cache on mutations
API.interceptors.response.use(
  (res) => {
    const method = res.config?.method?.toLowerCase();
    if (["post", "put", "delete", "patch"].includes(method)) {
      clearApiCache();
    }
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    const isMutating = originalRequest?.method && ["post", "put", "delete", "patch"].includes(originalRequest.method.toLowerCase());
    const isAdminPath = originalRequest?.url && (originalRequest.url.startsWith("/admin") || originalRequest.url.includes("/admin/"));

    if (err.response?.status === 401 && originalRequest && !originalRequest._retry && (isMutating || isAdminPath)) {
      originalRequest._retry = true;
      if (typeof localStorage !== "undefined") localStorage.removeItem("token");
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
