import { useState } from "react";
import { fetchFeeding } from "../services/feedService";
import { useDispatch } from "react-redux";
import { addFeed, removeFeed } from "../redux/slices/feedSlice";
import { sendRequest } from "../services/requestService";
import { notify } from "../utils/toastify";

const useFeed = () => {
  const [loading, setLoading] = useState(true);
  const [reqItem, setReqItem] = useState(null);

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await fetchFeeding();
      console.log(res, "testFeedRes");
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(`Failed fetching feed ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (status, id) => {
    try {
      setReqItem({ id, status });
      const res = await sendRequest(status, id);
      console.log(res);
      notify(`${res?.data?.message}`);
      dispatch(removeFeed(id));
    } catch (error) {
      notify(`${res?.data?.message}`);
    } finally {
      setReqItem(null);
    }
  };

  return {
    getFeed,
    loading,
    setLoading,
    handleSendRequest,
    reqItem,
  };
};

export default useFeed;
