import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // Adjust if needed

export const register = async (data) => {
  return axios.post(`${BASE_URL}/register/`, data);
};

export const login = async (data) => {
    console.log(data)
  return axios.post(`${BASE_URL}/login/`, data);
};
