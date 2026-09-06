import React, { useEffect, useCallback } from "react";
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

    const triggerSwipeRight = useCallback(() => {
      if (showTutorial) {
        onTutorialSwipe?.();
        controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        return;
      }
      controls.start({ x: window.innerWidth, transition: { duration: 0.3 } });
      logEvent({ category: "Feed", action: "Action", label: "Accepted (Swipe)" });
      handleSendRequest("interested", _id);
    }, [showTutorial, onTutorialSwipe, controls, handleSendRequest, _id]);

    const triggerSwipeLeft = useCallback(() => {
      if (showTutorial) {
        onTutorialSwipe?.();
        controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        return;
      }
      controls.start({ x: -window.innerWidth, transition: { duration: 0.3 } });
      logEvent({ category: "Feed", action: "Action", label: "Ignored (Swipe)" });
      handleSendRequest("ignored", _id);
    }, [showTutorial, onTutorialSwipe, controls, handleSendRequest, _id]);

    // Keyboard Shortcuts for Desktop
    useEffect(() => {
      if (!isTopCard || isReqLoading) return;

      const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
          triggerSwipeRight();
        } else if (e.key === "ArrowLeft") {
          triggerSwipeLeft();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isTopCard, isReqLoading, triggerSwipeLeft, triggerSwipeRight]);

    const handleDragEnd = (event, info) => {
      const swipeThreshold = 100;
      
      if (info.offset.x > swipeThreshold) {
        triggerSwipeRight();
      } else if (info.offset.x < -swipeThreshold) {
        triggerSwipeLeft();
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
        </div>

        {/* Desktop floating circular buttons */}
        <div className="absolute -bottom-24 w-full hidden md:flex justify-center gap-12 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerSwipeLeft();
            }}
            disabled={isReqLoading}
            className="w-16 h-16 rounded-full bg-base-200 border-2 border-red-500 text-red-500 text-3xl font-bold flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg disabled:opacity-50"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerSwipeRight();
            }}
            disabled={isReqLoading}
            className="w-16 h-16 rounded-full bg-base-200 border-2 border-green-500 text-green-500 text-4xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors shadow-lg pb-1 disabled:opacity-50"
          >
            ♥
          </button>
        </div>

        {showTutorial && <SwipeTutorial />}
      </motion.div>
    );
  },
);

export default UserCard;
