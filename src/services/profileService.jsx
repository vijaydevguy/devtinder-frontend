import axios from "axios";
import { baseUrl } from "../../common";

export const updateProfile = async (payload) => {
  const res = await axios.patch(`${baseUrl}/profile/edit`, payload, {
    withCredentials: true,
  });
  return res.data;
};
