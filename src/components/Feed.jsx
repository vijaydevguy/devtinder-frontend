import { useEffect } from "react";
import useFeed from "../hooks/useFeed";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { feedSelector } from "../redux/selectors/feedSelector";
import UserSkeleton from "./UserSkeleton";

const Feed = () => {
  const { getFeed, loading, handleSendRequest, reqItem } = useFeed();

  const Feeds = useSelector(feedSelector);
  useEffect(() => {
    getFeed();
  }, []);

  // console.log(Feeds, "testFeed");

  return (
    <div>
      <div className="flex flex-col gap-6 w-fit mx-auto items-center justify-center my-10">
        {loading && <UserSkeleton />}
        {console.log(Feeds, "testFeed")}
        {!loading &&
          Feeds &&
          Feeds.length > 0 &&
          Feeds.map((item, i) => {
            // console.log({ item }, "testItem");
            return (
              <UserCard
                key={i}
                item={item}
                handleSendRequest={handleSendRequest}
                reqItem={reqItem}
              />
            );
          })}
      </div>

      {(!Feeds || Feeds.length <= 0) && !loading && <h2>No data found</h2>}
    </div>
  );
};

export default Feed;
