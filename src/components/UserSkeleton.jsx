import React from "react";

const UserSkeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="card bg-base-100 w-96 shadow-sm justify-center"
        >
          <figure className="h-48 w-full skeleton rounded-b-none" />
          <div className="card-body gap-4">
            <div className="skeleton h-6 w-1/2"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-4/5"></div>
            <div className="card-actions justify-end">
              <div className="skeleton h-10 w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserSkeleton;
