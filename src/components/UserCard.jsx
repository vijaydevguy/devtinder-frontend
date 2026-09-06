import React, { useEffect } from "react";
import UserSkeleton from "./UserSkeleton";
import { logEvent } from "../utils/analytics";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import SwipeTutorial from "./SwipeTutorial";

const UserCard = React.forwardRef(
  (
    { isLoading = false, item, handleSendRequest, reqItem, isTopCard = true, showTutorial, onTutorialSwipe },
    ref,
  ) => {
    const { _id, photoUrl, about, firstName, lastName } = item;

    const isReqLoading = reqItem && reqItem.id == _id;
    const isInterested = isReqLoading && reqItem.status === "interested";
    const isIgnored = isReqLoading && reqItem.status === "ignored";

    const x = useMotionValue(0);
    // Rotate based on drag distance: 200px drag = 15deg rotation
    const rotate = useTransform(x, [-200, 200], [-15, 15]);

    const controls = useAnimation();

    useEffect(() => {
      // If request completes or fails and it's still mounted, reset the position
      if (!reqItem) {
        controls.start({
          x: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        });
      }
    }, [reqItem, controls]);

    const handleDragEnd = (event, info) => {
      const swipeThreshold = 100;
      
      // If tutorial is active, just dismiss it and snap back without making API calls
      if (showTutorial) {
        if (Math.abs(info.offset.x) > swipeThreshold) {
          onTutorialSwipe?.();
        }
        controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        return;
      }

      if (info.offset.x > swipeThreshold) {
        // Swipe Right
        controls.start({ x: window.innerWidth, transition: { duration: 0.3 } });
        logEvent({
          category: "Feed",
          action: "Action",
          label: "Accepted (Swipe)",
        });
        handleSendRequest("interested", _id);
      } else if (info.offset.x < -swipeThreshold) {
        // Swipe Left
        controls.start({
          x: -window.innerWidth,
          transition: { duration: 0.3 },
        });
        logEvent({
          category: "Feed",
          action: "Action",
          label: "Ignored (Swipe)",
        });
        handleSendRequest("ignored", _id);
      } else {
        // Snap back if threshold not met
        controls.start({
          x: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        });
      }
    };

    return (
      <motion.div
        ref={ref}
        drag={isTopCard && !isReqLoading ? "x" : false}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, rotate, transformOrigin: "center bottom" }}
        className={`card bg-base-100 w-full max-w-sm shadow-xl justify-center border border-white/10 absolute select-none touch-none ${
          isTopCard ? "z-10 cursor-grab active:cursor-grabbing" : "z-0 pointer-events-none"
        }`}
      >
        <figure>
          <img
            src={
              photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="Profile"
            draggable="false"
            className="object-cover object-top w-full h-[350px] pointer-events-none select-none"
          />
        </figure>
        <div className="card-body pointer-events-none">
          <h2 className="card-title text-2xl">{`${firstName} ${lastName}`}</h2>
          <p className="text-sm opacity-80">{about}</p>

          {/* hide buttons */}
          {/* <div className="card-actions justify-end mt-4 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (showTutorial) {
                  onTutorialSwipe?.();
                  return;
                }
                logEvent({ category: "Feed", action: "Action", label: "Ignored" });
                handleSendRequest("ignored", _id);
              }}
              disabled={isReqLoading}
              className="btn btn-outline flex-1"
            >
              {isIgnored ? "Ignoring..." : "Ignore"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (showTutorial) {
                  onTutorialSwipe?.();
                  return;
                }
                logEvent({ category: "Feed", action: "Action", label: "Accepted" });
                handleSendRequest("interested", _id);
              }}
              disabled={isReqLoading}
              className="btn btn-secondary flex-1"
            >
              {isInterested ? "Accepting..." : "Accept"}
            </button>
          </div> */}
        </div>
        {showTutorial && <SwipeTutorial />}
      </motion.div>
    );
  },
);

export default UserCard;
