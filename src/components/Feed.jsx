import { useEffect, useRef } from "react";
import useFeed from "../hooks/useFeed";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { feedSelector } from "../redux/selectors/feedSelector";
import UserSkeleton from "./UserSkeleton";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Feed = () => {
  const didInitialLoad = useRef(false);
  const { getFeed, loading, hasMore, handleSendRequest, reqItem } = useFeed();

  const { lastElementRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: getFeed,
  });

  const Feeds = useSelector(feedSelector);

  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;
    getFeed();
  }, []);

  // console.log(Feeds, "testFeed");

  return (
    <div>
      <div className="flex flex-col gap-6 w-fit mx-auto items-center justify-center my-10">
       
        {console.log(Feeds, "testFeed")}
        {
          Feeds &&
          Feeds.length > 0 &&
          Feeds.map((item, i) => {
            // console.log({ item }, "testItem");
            const isLastElement = Feeds.length == i + 1;
            return (
              <UserCard
                key={item._id || i}
                ref={isLastElement ? lastElementRef : null}
                item={item}
                handleSendRequest={handleSendRequest}
                reqItem={reqItem}
              />
            );
          })}

           {loading && <UserSkeleton />}
      </div>

      {(!Feeds || Feeds.length <= 0) && !loading && <h2>No data found</h2>}
    </div>
  );
};

export default Feed;
