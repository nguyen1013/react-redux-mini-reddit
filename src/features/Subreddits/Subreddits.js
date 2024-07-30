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
import splitName from "../../utils/splitName";

function Subreddits() {
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubReddits);
  const selectedSubreddit = useSelector(selectSelectedSubReddit);

  useEffect(() => {
    dispatch(loadSubReddits());
  }, [dispatch]);

  return (
    <div className={styles.stickyContainer}>
      <Card className={styles.subredditCard}>
        <h2 className={styles.subRedditsHeader}>Subreddits</h2>
        <ul className={styles.subredditsList}>
          {subReddits.map((subreddit) => {
            const subRedditName = splitName(subreddit.url);
            return (
              <li
                key={subreddit.id}
                className={`${
                  selectedSubreddit === subreddit.url &&
                  styles.selectedSubreddit
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
                    />
                  ) : (
                    <Avatar
                      name={subRedditName}
                      className={styles.avatarProfileImage}
                    />
                  )}
                  {subreddit.display_name}
                </button>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

export default Subreddits;
