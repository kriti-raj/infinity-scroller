import { useCallback, useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";

const InfinityScroller = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  const fetchPosts = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/posts?limit=5&skip=${page * 5}`
      );
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
    } catch (err) {
      console.error("Error loading page: ", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Observer Intersection
  useEffect(() => {
    const currentRef = ref.current;
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    // CleanUp Function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Infinity Scroll</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {loading && <div>Loading...</div>}
      <div ref={ref} />
    </div>
  );
};

export default InfinityScroller;
