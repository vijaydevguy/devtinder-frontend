import { useEffect } from "react";
import useRequests from "../hooks/useRequests";
import RequestSkeleton from "../components/RequestSkeleton";

const Requests = () => {
  const {
    loading,
    requests,
    error,
    getRequests,
    handleReviewRequest,
    reviewItem,
  } = useRequests();

  useEffect(() => {
    if (requests === null) {
      getRequests();
    }
  }, []);

  const renderContent = () => {
    if (loading) {
      return <RequestSkeleton />;
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
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request?.fromUserId;

          const isLoading = reviewItem && request._id == _id;
          const isAccepting = isLoading && reviewItem.status == "accepted";
          const isRejecting = isLoading && reviewItem.status == "rejected";

          return (
            <div
              key={request._id || request.id}
              className="flex lg:flex-row flex-col items-center justify-between gap-6 bg-black/10 p-4 rounded-2xl border border-white/5  "
            >
              <div className="flex flex-row items-center gap-6 w-full flex-1">
                <img
                  src={photoUrl}
                  alt="img"
                  className="w-14 h-14 object-center object-cover rounded-full pointer-events-none select-none"
                />
                <div className="flex flex-col gap-4 w-full">
                  <h2 className="font-medium text-xl">{`${firstName} ${lastName}`}</h2>
                  {age && gender && <p>{`${age}-${gender}`}</p>}
                  <p className="text-sm text-gray-200">{about}</p>
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-row items-center gap-4 w-full lg:w-fit">
                <button
                  disabled={isLoading}
                  onClick={() => handleReviewRequest("rejected", request?._id)}
                  className="btn btn-primary btn-outline w-full flex-1 cursor-pointer"
                >
                  {isRejecting ? "Rejecting..." : "Reject"}
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => handleReviewRequest("accepted", request?._id)}
                  className="btn btn-secondary w-full flex-1 cursor-pointer"
                >
                  {isAccepting ? "Accepting..." : "Accept"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:gap-8 gap-5 px-4 py-10 lg:max-w-[50%] mx-auto">
      <h1 className="text-2xl font-bold">Requests</h1>
      {renderContent()}
    </div>
  );
};

export default Requests;
