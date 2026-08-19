import axios from "axios";

const baseUrl = "https://devtinder-backend-lgug.onrender.com";

// Change this in authService.jsx
// const baseUrl = "http://localhost:5000";

export const loginService = async (payload) => {
  const res = await axios.post(`${baseUrl}/login`, payload, {
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
