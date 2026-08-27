import axios from "axios";
import { baseUrl } from "../../common";

export const fetchRequests = async () => {
  const res = await axios.get(`${baseUrl}/user/requests/received`, {
    withCredentials: true,
  });
  return res;
};
