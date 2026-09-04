import { useState, useCallback, useRef } from "react";
import { notify } from "../utils/toastify";
import { fetchRequests, reviewRequest } from "../services/requestService";

const LIMIT = 10;

const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [requests, setRequests] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const [reviewItem, setReviewItem] = useState(null);

  const getRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      pageRef.current = 1;
      const res = await fetchRequests(pageRef.current, LIMIT);
      const data = res?.data?.data ?? [];
      setRequests(data);
      setHasMore(data.length === LIMIT); // swap for res?.data?.hasMore if backend returns it
    } catch (err) {
      setError(err.message);
      notify(`Failed to fetch connections: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreRequests = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const nextPage = pageRef.current + 1;
      const res = await fetchRequests(nextPage, LIMIT);
      const data = res?.data?.data ?? [];
      setRequests((prev) => [...(prev ?? []), ...data]);
      setHasMore(data.length === LIMIT);
      pageRef.current = nextPage;
    } catch (err) {
      notify(`Failed to load more requests: ${err.message}`);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  const handleReviewRequest = async (status, id) => {
    try {
      setReviewItem({ id, status });
      const res = await reviewRequest(status, id);
      notify(`${res?.data?.message}`);
      setRequests((prev) => prev.filter((req) => req?._id != id));
    } catch (error) {
      notify(`Failed to review with ${error.message}`);
    } finally {
      setReviewItem(null);
    }
  };

  return {
    loading,
    loadingMore,
    hasMore,
    requests,
    error,
    getRequests,
    loadMoreRequests,
    handleReviewRequest,
    reviewItem,
  };
};

export default useRequests;