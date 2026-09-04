import axios from "axios";
import { baseUrl } from "../../common";

export const fetchRequests = async (page = 1, limit = 10) => {
  const res = await axios.get(`${baseUrl}/user/requests/received`, {
    params: { page, limit },
    withCredentials: true,
  });
  return res;
};

export const reviewRequest = async (status, id) => {
  const res = await axios.post(
    `${baseUrl}/request/review/${status}/${id}`,
    {},
    {
      withCredentials: true,
    },
  );
  return res;
};

export const sendRequest = async (status, id) => {
  const res = await axios.post(
    `${baseUrl}/request/send/${status}/${id}`,
    {},
    {
      withCredentials: true,
    },
  );
  return res;
};
