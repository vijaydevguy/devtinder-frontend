import React from "react";

const RequestSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex lg:flex-row flex-col items-center justify-between gap-6 bg-white/5 p-4 rounded-2xl border border-white/5 w-full animate-pulse"
        >
          {/* Avatar & User Details */}
          <div className="flex flex-row items-center gap-6 w-full flex-1">
            <div className="skeleton w-14 h-14 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="skeleton h-5 w-1/3"></div>
              <div className="skeleton h-4 w-1/4"></div>
              <div className="skeleton h-4 w-4/5"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-4 w-full lg:w-fit">
            <div className="skeleton h-10 w-full lg:w-24 rounded-lg"></div>
            <div className="skeleton h-10 w-full lg:w-24 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestSkeleton;
