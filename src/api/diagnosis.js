import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // adjust if needed

export const fetchDiagnoses = async (token) => {
    console.log(token)
  return axios.get(`${BASE_URL}/medical/diagnosis/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchDiagnosisDetail = async (id, token) => {
   
    console.log(id)
    return axios.get(`${BASE_URL}/medical/diagnosis_detail/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const createDiagnosisVisit = async (token, data) => {
    return axios.post(`${BASE_URL}/medical/diagnosis/visit/create/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };