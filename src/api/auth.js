import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// 어떤 user의 게시물을 가져올건지? token과 비교를 해서 가져오는 로직
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// 프로필의 닉넴을 변경하는 로직
export const updateProfile = async (formData) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
