import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { AnimatedList } from "react-animated-list";
import Post from "../Post/Post";
// import PostLoading from "../Post/PostLoading";
import getRandomNumber from "../../utils/getRandomNumber";
import {
  loadPosts,
  loadSearchResults,
  selectPosts,
  selectAllStates,
  selectSelectedSubReddit,
  setPost,
  setSearchTerm,
  toogleShowingComments,
  loadComments,
} from "../../store/redditSlice";

function Home() {
  const reddit = useSelector(selectAllStates);
  const { isLoading, error, searchTerm, selectedSubreddit, posts } = reddit;
  const loadedPosts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts(selectedSubreddit));
    console.log(loadedPosts);
  }, [dispatch, selectedSubreddit]);

  const onToggleComments = (index) => {
    //     const getComments = (permalink) => {
    //       dispatch(loadComments(index, permalink));
    //     };
    //     return getComments;
  };

  return (
    <>
      <h2>{selectedSubreddit}</h2>
      {loadedPosts.map((post, index) => {
        // console.log(post.url)
        return (
          <Post
            key={post.id}
            post={post}
            onToggleComments={onToggleComments(index)}
          />
        );
      })}
    </>
  );
}

export default Home;
