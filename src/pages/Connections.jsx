import React, { useEffect } from "react";
import useConnections from "../hooks/useConnections";

const Connections = () => {
  const { loading, connections, error, getConnections } = useConnections();

  useEffect(() => {
    if (connections === null) {
      getConnections();
    }
  }, [connections, getConnections]);

  const renderContent = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }

    if (error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={getConnections}>Retry</button>
        </div>
      );
    }

    if (!connections || connections.length === 0) {
      return <h2>Make more connections</h2>;
    }

    return (
      <div className="flex flex-col gap-5">
        {connections.map((connection) => (
          <div key={connection._id || connection.id} className="flex flex-col gap-4">
            <h2>{connection?.firstName}</h2>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Connections</h1>
      {renderContent()}
    </div>
  );
};

export default Connections;