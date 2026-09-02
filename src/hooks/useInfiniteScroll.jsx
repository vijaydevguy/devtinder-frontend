import { useCallback, useEffect, useRef } from "react";

const useInfiniteScroll = ({ loading, hasMore, onLoadMore }) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        {
          rootMargin: "200px",
        },
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore],
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return { lastElementRef };
};

export default useInfiniteScroll;
