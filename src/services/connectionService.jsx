import axios from "axios";
import { baseUrl } from "../../common";

export const fetchConnections = async (page = 1, limit = 10) => {
  const res = await axios.get(`${baseUrl}/user/connections`, {
    params: { page, limit },
    withCredentials: true,
  });
  return res;
};