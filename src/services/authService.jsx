import axios from "axios";
import { baseUrl } from "../../common";

// const baseUrl = "https://devtinder-backend-lgug.onrender.com";
// const baseUrl = apiUrl;

// Change this in authService.jsx
// const baseUrl = "http://localhost:5000";

export const loginService = async (payload) => {
  const res = await axios.post(`${baseUrl}/login`, payload, {
    withCredentials: true,
  });
  return res;
};

export const signUp = async (payload) => {
  const res = await axios.post(`${baseUrl}/signup`, payload, {
    withCredentials: true,
  });
  return res;
};

export const fetchUser = async () => {
  const res = await axios.get(`${baseUrl}/profile/view`, {
    withCredentials: true,
  });
  return res;
};

export const logout = async () => {
  const res = await axios.post(
    `${baseUrl}/logout`,
    {},
    {
      withCredentials: true,
    },
  );
  return res;
};
