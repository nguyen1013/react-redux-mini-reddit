import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedList } from "react-animated-list";
import Post from "../Post/Post";
import PostLoading from "../Post/PostLoading";
import getRandomNumber from "../../utils/getRandomNumber";
import {
  loadPosts,
  loadComments,
  loadSearchResults,
  selectPosts,
  selectSearchTerm,
  selectAllStates,
  setSearchTerm,
} from "../../store/redditSlice";

function Home() {
  const reddit = useSelector(selectAllStates);
  const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
  const loadedPosts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(loadComments({ index, permalink }));
    };
    return getComments;
  };

  if (isLoading) {
    return (
      <AnimatedList animation="zoom">
        {Array(getRandomNumber(3, 10)).fill(<PostLoading />)}
      </AnimatedList>
    );
  }

  if (error) {  
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button
          type="button"
          onClick={() => dispatch(loadPosts(selectedSubreddit))}
        >
          Try again
        </button>
      </div>
    );
  }

  if (loadedPosts.length === 0) { 
    return (
      <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(""))}>
          Go back
        </button>
      </div>
    );
  }

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
