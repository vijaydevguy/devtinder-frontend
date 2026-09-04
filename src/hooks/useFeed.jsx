import { useCallback, useRef, useState } from "react";
import { fetchFeeding } from "../services/feedService";
import { useDispatch } from "react-redux";
import { addFeed, removeFeed } from "../redux/slices/feedSlice";
import { sendRequest } from "../services/requestService";
import { notify } from "../utils/toastify";

const useFeed = () => {
  const [loading, setLoading] = useState(true);
  const [reqItem, setReqItem] = useState(null);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const loadingRef = useRef(false)

  const getFeed = useCallback(async () => {
    // we have to avoid redundant api call
    // if (loading || !hasMore) return;
    if (loadingRef.current || !hasMore) return;

    try {
      loadingRef.current = true;
      setLoading(true);
      const res = await fetchFeeding(page);
      const newItems = res?.data?.data || [];
      console.log(newItems, "testFeedRes");
      if (newItems.length == 0) {
        setHasMore(false);
      } else {
        dispatch(addFeed(newItems));
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(`Failed fetching feed ${error.message}`);
      notify(error?.res?.data?.message || "Unable to load feed")
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page, hasMore, dispatch]);

  const handleSendRequest = async (status, id) => {
    try {
      setReqItem({ id, status });
      const res = await sendRequest(status, id);
      console.log(res);
      notify(`${res?.data?.message}`);
      dispatch(removeFeed(id));
    } catch (error) {
      // Notify the user about the error (res is undefined here)
      notify(error?.response?.data?.message || "Request failed");
    } finally {
      setReqItem(null);
    }
  };

  return {
    getFeed,
    loading,
    hasMore,
    setLoading,
    handleSendRequest,
    reqItem,
  };
};

export default useFeed;
