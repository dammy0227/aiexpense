import axios from "axios";

// ✅ Replace with your deployed backend URL
const API = axios.create({
  baseURL: "https://aiexpense-frh7.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
