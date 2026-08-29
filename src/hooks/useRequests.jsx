import { useState, useCallback } from "react";
import { notify } from "../utils/toastify";
import { fetchRequests, reviewRequest } from "../services/requestService";

const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(null);
  const [error, setError] = useState(null);

  const [reviewItem, setReviewItem] = useState(null);

  const getRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchRequests();
      console.log(res, "testRequests");
      setRequests(res?.data?.data ?? []);
    } catch (err) {
      setError(err.message);
      notify(`Failed to fetch connections: ${err.message}`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReviewRequest = async (status, id) => {
    try {
      setReviewItem({ id, status });
      const res = await reviewRequest(status, id);
      // console.log(res,"reviewRes")
      notify(`${res?.data?.message}`);
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req?._id != id),
      );
    } catch (error) {
      notify(`Failed to review with ${error.message}`, error);
    } finally {
      setReviewItem(null);
    }
  };

  return {
    loading,
    requests,
    error,
    getRequests,
    handleReviewRequest,
    reviewItem,
  };
};

export default useRequests;
