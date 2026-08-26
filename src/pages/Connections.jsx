import React, { useEffect } from "react";
import useConnections from "../hooks/useConnections";

const Connections = () => {
  const { loading, connections, getConnections } = useConnections();

  useEffect(() => {
    if (!connections) {
      getConnections();
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2>Connections</h2>
      {(connections && connections.length == 0) && <h2>Make more connections</h2>}
      {loading && <h2>Loading...</h2>}
      <div className="flex flex-col gap-5">
        {connections &&
          connections.length > 0 &&
          connections.map((connection, i) => (
            <div key={i} className="flex flex-col gap-4">
              <h2>{connection?.firstName}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connections;
