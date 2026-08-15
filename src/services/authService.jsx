import axios from "axios";

const baseUrl = "http://localhost:5000";

export const loginService = async (payload) => {
  const res = await axios.post(`${baseUrl}/login`, payload);
  return res;
};
