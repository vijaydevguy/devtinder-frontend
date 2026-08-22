import axios from "axios";
import { baseUrl } from "../../common";

export const fetchFeeding = async () => {
  const res = await axios.get(
    `${baseUrl}/feed`,
    {
      withCredentials: true,
    },
  );
  return res;
};
