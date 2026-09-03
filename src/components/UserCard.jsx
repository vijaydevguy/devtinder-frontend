import React from "react";
import UserSkeleton from "./UserSkeleton";

const UserCard = React.forwardRef(
  ({ isLoading = false, item, handleSendRequest, reqItem }, ref) => {
    const { _id, photoUrl, about, firstName, lastName } = item;
    const isReqLoading = reqItem && reqItem.id == _id;
    const isInterested = isReqLoading && (reqItem.status = "interested");
    const isIgnored = isReqLoading && (reqItem.status = "ignored");

    return (
      /* Loaded Card State */
      <div
        ref={ref}
        className="card bg-base-100 w-96 shadow-sm justify-center bg-white/5"
      >
        <figure>
          <img
            src={
              photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="Shoes"
            className="object-cover object-top w-full h-[280px] pointer-events-none select-none"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={isReqLoading}
              className="btn btn-outline"
            >
              {isIgnored ? "Ignoring..." : "Ignore"}
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              disabled={isReqLoading}
              className="btn btn-secondary"
            >
              {isInterested ? "Accepting..." : "Accept"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default UserCard;
