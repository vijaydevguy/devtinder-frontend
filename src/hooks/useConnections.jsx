import React, { useState } from "react";
import { notify } from "../utils/toastify";
import { fetchConnections } from "../services/connectionService";

const useConnections = () => {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState(null);

  const getConnections = async () => {
    try {
      setLoading(true);
      const res = await fetchConnections();
      console.log(res,"testConnection");
      setConnections(res?.data);
    } catch (error) {
      notify(`Failed to fetch connections with ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    connections,
    getConnections,
  };
};

export default useConnections;
