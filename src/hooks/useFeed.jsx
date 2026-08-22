import React, { useState } from "react";
import { fetchFeeding } from "../services/feedService";
import { useDispatch } from "react-redux";
import { addFeed } from "../redux/slices/feedSlice";

const useFeed = () => {
  const [loading, setLoading] = useState();
  const [feed, setFeed] = useState(null);

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      setLoading(true);
      if (feed) return;
      const res = await fetchFeeding();
      console.log(res, "testFeed");
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(`Failed fetching feed ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    getFeed,
    loading,
    setLoading,
    feed,
  };
};

export default useFeed;
