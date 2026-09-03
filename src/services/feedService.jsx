import axios from "axios";
import { baseUrl } from "../../common";

export const fetchFeeding = async (page = 1, limit = 10) => {
  const res = await axios.get(`${baseUrl}/feed`, {
    params: {
      page,
      limit,
    },
    withCredentials: true,
  });
  return res;
};
