import axios from "axios";
import useUserStore from "../store/useUserStore";
import authInstance from "../axiosInstance/Auth";

export const register = async (userData) => {
  const response = await authInstance.post("/register", userData);
  return response.data;
};
export const login = async (userData) => {
  const { setUser, setAccessToken } = useUserStore.getState();

  const response = await authInstance.post("/login", userData);

  setUser(response.data.user);
  setAccessToken(response.data.accessToken);

  return response.data;
};

// 어떤 user의 게시물을 가져올건지? token과 비교를 해서 가져오는 로직
export const getUserProfile = async () => {
  const { accessToken } = useUserStore.getState();
  const response = await authInstance.get("/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
};

// 프로필의 닉넴을 변경하는 로직
export const updateProfile = async (formData) => {
  const { accessToken } = useUserStore.getState();

  const response = await authInstance.patch("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
};
