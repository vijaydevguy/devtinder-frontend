import { useState, useCallback } from "react";
import { notify } from "../utils/toastify";
import { fetchConnections } from "../services/connectionService";

const useConnections = () => {
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState(null);
  const [error, setError] = useState(null);

  const getConnections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchConnections();
      console.log(res, "testConnections");
      setConnections(res?.data?.data ?? []);
    } catch (err) {
      setError(err.message);
      notify(`Failed to fetch connections: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, connections, error, getConnections };
};

export default useConnections;
