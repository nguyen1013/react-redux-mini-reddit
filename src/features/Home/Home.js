import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedList } from "react-animated-list";
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

  const subRedditName =
    selectedSubreddit === "/" ? "Home" : splitName(selectedSubreddit);
  const subReddits = useSelector(selectSubReddits);
  let currentSubredditIcon = null;

  const currentSubreddit = subReddits.find(
    (subReddit) => subReddit.url === selectedSubreddit
  );
  if (currentSubreddit !== undefined) {
    currentSubredditIcon = currentSubreddit.icon_img;
  }

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
        ) : (
          <Avatar name={subRedditName} className={styles.avatarProfileImage} />
        )}
        <h2 className={styles.subredditTitle}>{selectedSubreddit}</h2>
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
