import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFeed from "../hooks/useFeed";
import UserCard from "./UserCard";
import { feedSelector } from "../redux/selectors/feedSelector";
import UserSkeleton from "./UserSkeleton";
import { updateProfile } from "../services/profileService";
import { editUser } from "../redux/slices/userSlice";
import { selectUserDetails } from "../redux/selectors/userSelector";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const didInitialLoad = useRef(false);
  const { getFeed, loading, hasMore, handleSendRequest, reqItem } = useFeed();

  const Feeds = useSelector(feedSelector);
  const profile = useSelector(selectUserDetails);

  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;
    getFeed();
  }, []);

  // Fetch more items when running low (e.g., less than 3 items left)
  useEffect(() => {
    if (Feeds && Feeds.length < 3 && hasMore && !loading) {
      getFeed();
    }
  }, [Feeds, hasMore, loading, getFeed]);

  const handleTutorialComplete = async () => {
    if (user && !user.hasSeenTutorial) {
      try {
        // Construct a safe payload containing only the allowed fields to pass backend validation
        const safePayload = { hasSeenTutorial: true };
        
        if (profile) {
          const allowedFields = [
            "firstName", "lastName", "emailId", "photoUrl", 
            "gender", "age", "about", "skills"
          ];
          
          allowedFields.forEach((field) => {
            if (profile[field] !== undefined && profile[field] !== null) {
              safePayload[field] = profile[field];
            }
          });
        }

        await updateProfile(safePayload);
        
        // Hide tutorial only after successful API call
        dispatch(editUser({ ...user, hasSeenTutorial: true }));
      } catch (err) {
        console.error("Failed to update tutorial status", err);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">
      {(Feeds?.length > 0 || loading) && (
        <div className="relative w-full max-w-sm h-[550px] flex items-center justify-center mt-10">
          {loading && (!Feeds || Feeds.length === 0) && <UserSkeleton />}

          {Feeds &&
            Feeds.slice(0, 2)
              .reverse()
              .map((feedItem) => {
                const isTopCard = feedItem._id === Feeds[0]._id;
                return (
                  <UserCard
                    key={feedItem._id}
                    item={feedItem}
                    handleSendRequest={handleSendRequest}
                    reqItem={reqItem}
                    isTopCard={isTopCard}
                    showTutorial={isTopCard && user && !user.hasSeenTutorial}
                    onTutorialSwipe={handleTutorialComplete}
                  />
                );
              })}
        </div>
      )}

      {(!Feeds || Feeds.length <= 0) && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-2xl opacity-70">No more profiles found</h2>
        </div>
      )}
    </div>
  );
};

export default Feed;
