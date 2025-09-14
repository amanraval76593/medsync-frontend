import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // adjust as needed

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem("authTokens"));
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
