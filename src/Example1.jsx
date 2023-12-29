import { useCallback, useRef, useState } from "react";
import usePosts from "./hooks/usePosts";
import { Post } from "./Post";

const Example1 = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, error, isError, results, hasNextPage } = usePosts(pageNum);
  const intObserver = useRef();

  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          // console.log("we are near last post");
          setPageNum((page) => page + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center">Error: {error.message}</p>;

  const content = results.map((post, i) => {
    return (
      <article
        ref={results.map.length - 1 === i ? lastPostRef : null}
        key={post.id}
      >
        <Post post={post} />
      </article>
    );
  });

  return (
    <>
      <h1 id="top">
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 1 - React only
      </h1>
      {content}
      {isLoading && <p className="center">Loading More Posts...</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
};

export default Example1;
