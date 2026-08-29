import { useState, useCallback } from "react";
import { notify } from "../utils/toastify";
import { fetchRequests } from "../services/requestService";

const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(null);
  const [error, setError] = useState(null);

  const getRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchRequests();
      console.log(res, "testRequests");
      setRequests(res?.data?.data ?? []);
    } catch (err) {
      setError(err.message);
      notify(`Failed to fetch connections: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, requests, error, getRequests };
};

export default useRequests;
