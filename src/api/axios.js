import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

// Auto attach token (for admin routes)
API.interceptors.request.use((req) => {
  if (req.url.startsWith("/admin")) {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

export default API;