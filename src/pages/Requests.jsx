import { useEffect } from "react";
import useConnections from "../hooks/useConnections";

const Requests = () => {
  const { loading, requests, error, getRequests } = useConnections();

  useEffect(() => {
    if (requests === null) {
      getRequests();
    }
  }, [requests, getRequests]);

  const renderContent = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }

    if (error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={getRequests}>Retry</button>
        </div>
      );
    }

    if (!requests || requests.length === 0) {
      return <h2>Make more requests</h2>;
    }

    return (
      <div className="flex flex-col gap-5 ">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            requests;
          return (
            <div
              key={request._id || request.id}
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
      <h1 className="text-2xl font-bold">Requests</h1>
      {renderContent()}
    </div>
  );
};

export default Requests;
