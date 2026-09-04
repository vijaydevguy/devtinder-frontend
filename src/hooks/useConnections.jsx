import { useState, useCallback, useRef } from "react";
import { notify } from "../utils/toastify";
import { fetchConnections } from "../services/connectionService";

const LIMIT = 10;

const useConnections = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [connections, setConnections] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const getConnections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      pageRef.current = 1;
      const res = await fetchConnections(pageRef.current, LIMIT);
      const data = res?.data?.data ?? [];
      setConnections(data);
      setHasMore(data.length === LIMIT); // swap for res?.data?.hasMore if backend returns it
    } catch (err) {
      setError(err.message);
      notify(`Failed to fetch connections: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreConnections = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const nextPage = pageRef.current + 1;
      const res = await fetchConnections(nextPage, LIMIT);
      const data = res?.data?.data ?? [];
      setConnections((prev) => [...(prev ?? []), ...data]);
      setHasMore(data.length === LIMIT);
      pageRef.current = nextPage;
    } catch (err) {
      notify(`Failed to load more connections: ${err.message}`);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  return {
    loading,
    loadingMore,
    hasMore,
    connections,
    error,
    getConnections,
    loadMoreConnections,
  };
};

export default useConnections;
