import axios from "axios";

const baseUrl = "https://devtinder-backend-lgug.onrender.com";

export const loginService = async (payload) => {
  const res = await axios.post(`${baseUrl}/login`, payload, {withCredentials:true});
  return res;
};
