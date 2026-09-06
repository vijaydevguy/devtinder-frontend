import { useEffect, useRef } from "react";
import useFeed from "../hooks/useFeed";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { feedSelector } from "../redux/selectors/feedSelector";
import UserSkeleton from "./UserSkeleton";

const Feed = () => {
  const didInitialLoad = useRef(false);
  const { getFeed, loading, hasMore, handleSendRequest, reqItem } = useFeed();

  const Feeds = useSelector(feedSelector);

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

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">
      
      {(Feeds?.length > 0 || loading) && (
        <div className="relative w-full max-w-sm h-[550px] flex items-center justify-center mt-10">
          
          {loading && (!Feeds || Feeds.length === 0) && <UserSkeleton />}

          {Feeds && Feeds.slice(0, 2).reverse().map((feedItem) => {
            const isTopCard = feedItem._id === Feeds[0]._id;
            return (
              <UserCard
                key={feedItem._id}
                item={feedItem}
                handleSendRequest={handleSendRequest}
                reqItem={reqItem}
                isTopCard={isTopCard}
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
