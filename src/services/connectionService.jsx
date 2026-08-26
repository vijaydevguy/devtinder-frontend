import axios from "axios";
import { baseUrl } from "../../common";

export const fetchConnections = async () => {
  const res = await axios.get(`${baseUrl}/user/connections`, {
    withCredentials: true,
  });
  return res;
};
