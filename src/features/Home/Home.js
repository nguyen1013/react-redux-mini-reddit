import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";

import Post from "../Post/Post";
import PostLoading from "../Post/PostLoading";
import getRandomNumber from "../../utils/getRandomNumber";
import Avatar from "react-avatar";
import {
  loadPosts,
  loadComments,
  selectPosts,
  selectAllStates,
  setSearchTerm,
} from "../../store/redditSlice";
import { selectSubReddits } from "../../store/subRedditSlice";
import styles from "./Home.module.css";
import splitName from "../../utils/splitName";

function Home() {
  const reddit = useSelector(selectAllStates);
  const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
  const loadedPosts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubReddits);

  // Get the current subreddit name
  const subRedditName =
    selectedSubreddit === "/" ? "Home" : splitName(selectedSubreddit);

  // Get the icon of the current subreddit
  let currentSubredditIcon = null;
  const currentSubreddit = subReddits.find(
    (subReddit) => subReddit.url === selectedSubreddit
  );
  if (currentSubreddit !== undefined) {
    currentSubredditIcon = currentSubreddit.icon_img;
  }
  if (searchTerm) {
    currentSubredditIcon = null;
  }

  // Load posts when the component mounts
  useEffect(() => {
    dispatch(loadPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  // Load comments when the user clicks on the comments button
  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(loadComments({ index, permalink }));
    };
    return getComments;
  };

  // Display loading state
  if (isLoading) {
    return (
      <Zoom>
        {Array(getRandomNumber(3, 10))
          .fill()
          .map((_, index) => (
            <PostLoading key={index} />
          ))}
      </Zoom>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
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
      <div className={styles.error}>
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(""))}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.subredditHeader}>
        {currentSubredditIcon ? (
          <img
            src={currentSubredditIcon}
            alt={selectedSubreddit}
            className={styles.subredditIcon}
          />
        ) : searchTerm ? null : (
          <Avatar name={subRedditName} className={styles.avatarProfileImage} />
        )}
        <h3 className={styles.subredditTitle}>
          {searchTerm ? `Search results: "${searchTerm}"` : selectedSubreddit}
        </h3>
      </div>

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
