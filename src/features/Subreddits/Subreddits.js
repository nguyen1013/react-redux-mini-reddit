import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Cards/Card";
import { loadSubReddits, selectSubReddits } from "../../store/subRedditSlice";
import styles from "./Subreddits.module.css";
import Avatar from "react-avatar";
import {
  setSelectedSubreddit,
  selectSelectedSubReddit,
} from "../../store/redditSlice";

function Subreddits() {
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubReddits);
  const selectedSubreddit = useSelector(selectSelectedSubReddit);

  useEffect(() => {
    dispatch(loadSubReddits());
  }, [dispatch]);

  return (
    <Card className={styles.subredditCard}>
      <h2>Subreddits</h2>
      <ul className={styles.subredditsList}>
        {subReddits.map((subreddit) => (
          <li
            key={subreddit.id}
            className={`${
              selectedSubreddit === subreddit.url && styles.selectedSubreddit
            }`}
          >
            <button
              type="button"
              onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
            >
              {subreddit.icon_img ? (
                <img
                  src={subreddit.icon_img}
                  alt={`${subreddit.display_name}`}
                  className={styles.subredditIcon}
                  style={{ border: `3px solid ${subreddit.primary_color}` }}
                />
              ) : (
                <Avatar
                  name={subreddit.display_name}
                  className={styles.avatarProfileImage}
                />
              )}

              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default Subreddits;
