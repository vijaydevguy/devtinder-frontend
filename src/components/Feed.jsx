import { useEffect } from "react";
import useFeed from "../hooks/useFeed";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { feedSelector } from "../redux/selectors/feedSelector";
import UserSkeleton from "./UserSkeleton";

const Feed = () => {
  const { getFeed, loading, feed } = useFeed();

  const Feeds = useSelector(feedSelector);

  useEffect(() => {
    getFeed();
  }, []);

  // console.log(Feeds, "testFeed");

  return (
    <div>
      <div className="flex flex-col gap-6 w-fit mx-auto items-center justify-center my-10">
        {loading && <UserSkeleton />}
        {!loading &&
          feed &&
          Feeds.length > 0 &&
          Feeds.map((item, i) => (
            <UserCard key={i} isLoading={loading} item={item} />
          ))}
      </div>

      {(!Feeds || Feeds.length <= 0) && !loading && <h2>No data found</h2>}
    </div>
  );
};

export default Feed;
