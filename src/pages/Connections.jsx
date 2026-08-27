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
      <div className="flex flex-col gap-5 ">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={connection._id || connection.id}
              className="flex flex-row items-center gap-6 bg-black/10 p-4 rounded-2xl border border-white/5  "
            >
              <img
                src={photoUrl}
                alt="img"
                className="w-14 h-14 object-center object-cover rounded-full pointer-events-none select-none"
              />
              <div className="flex flex-col gap-4">
                <h2 className="font-medium text-xl">{`${firstName} ${lastName}`}</h2>
                {age && gender && <p>{`${age}-${gender}`}</p>}
                <p className="text-sm text-gray-200">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:gap-8 gap-5 px-4 py-10 lg:max-w-[40%] mx-auto">
      <h1 className="text-2xl font-bold">Connections</h1>
      {renderContent()}
    </div>
  );
};

export default Connections;
