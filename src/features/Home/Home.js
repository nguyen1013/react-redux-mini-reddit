import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import {
  loadPosts,
  selectPosts,
  selectAllStates,
  loadComments,
} from "../../store/redditSlice";

function Home() {
  const reddit = useSelector(selectAllStates);
  const { isLoading, error, searchTerm, selectedSubreddit, posts } = reddit;
  const loadedPosts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts(selectedSubreddit));//
  }, [dispatch, selectedSubreddit]);

  const onToggleComments = (index) => {
        const getComments = (permalink) => {
          console.log(index, permalink);
          dispatch(loadComments({index, permalink}));
        };
        return getComments;
  };

  return (
    <>
      <h2>{selectedSubreddit}</h2>
      {loadedPosts.map((post, index) => {
        return (
          <Post
            key={post.id}
            post={post}
            index={index}
            onToggleComments={onToggleComments(index)}
            />
        );
      })}
    </>
  );
}

export default Home;
