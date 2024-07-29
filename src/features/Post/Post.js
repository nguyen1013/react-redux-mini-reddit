import React, { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from "react-icons/ti";
import { format, fromUnixTime } from "date-fns";
import shortenNumber from "../../utils/shortenNumber";
import Card from "../../components/Cards/Card";
import Comment from "../Comment/Comment";
import defaultAvatar from "./avatar_default_5.png";
import styles from "./Post.module.css";

function Post(props) {
  const [voteValue, setVoteValue] = useState(0);
  const { post, onToggleComments } = props;
  const avatar = defaultAvatar;

  const onHandleVote = (newValue) => {
    if (voteValue === 0) {
      if (newValue === 1) {
        setVoteValue(1);
        post.ups += 1;
      }
      if (newValue === -1) {
        setVoteValue(-1);
        post.ups -= 1;
      }
    } else if (voteValue === 1) {
      setVoteValue(0);
      if (newValue === 1) {
        post.ups -= 1;
      }
      if (newValue === -1) {
        post.ups -= 1;
      }
    } else if (voteValue === -1) {
      setVoteValue(0);
      if (newValue === 1) {
        post.ups += 1;
      }
      if (newValue === -1) {
        post.ups += 1;
      }
    }
  };

  const renderUpVote = () => {
    if (voteValue === 1) {
      return <TiArrowUpThick className={styles.iconAction} />;
    }
    return <TiArrowUpOutline className={styles.iconAction} />;
  };

  const renderDownVote = () => {
    if (voteValue === -1) {
      return <TiArrowDownThick className={styles.iconAction} />;
    }
    return <TiArrowDownOutline className={styles.iconAction} />;
  };

  const getVoteType = (voteValue) => {
    if (voteValue === 1) {
      return styles.upVote;
    }
    if (voteValue === -1) {
      return styles.downVote;
    }
    return "";
  };

  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }
    if (post.loadingComments) {
      return (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      );
    }
    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      );
    }
    return null;
  }

  return (
    <article key={post.id}>
      <Card>
        <div className={styles.postWrapper}>
          <div className={styles.postVotesContainer}>
            <button
              type="button"
              aria-label="Up vote"
              onClick={() => onHandleVote(1)}
              className={`${styles.iconActionButton} ${styles.upVote} ${
                voteValue === 1 && styles.active
              }`}
            >
              {renderUpVote()}
            </button>

            <p className={`${styles.postVotesValue} ${getVoteType(voteValue)}`}>
              {shortenNumber(post.ups)}
            </p>

            <button
              type="button"
              aria-label="Down vote"
              onClick={() => onHandleVote(-1)}
              className={`${styles.iconActionButton} ${styles.downVote} ${
                voteValue === -1 && styles.active
              }`}
            >
              {renderDownVote()}
            </button>
          </div>

          <div className={styles.postContainer}>
            <p className={styles.postTitle}>{post.title}</p>
            {post.url.includes("jpeg") ? (
              <div className={styles.postImageContainer}>
                {
                  <img
                    src={post.url}
                    alt="post-img"
                    className={styles.postImage}
                  />
                }
              </div>
            ) : null}

            <div className={styles.postDetails}>
              <span className={styles.authorUsername}>
                <img src={avatar} alt="avatar" className={styles.avatar} />
                {post.author}&nbsp;&nbsp;
                <span className={styles.dateOfPost}>
                &#x2022;&nbsp;{format(fromUnixTime(post.created_utc), "dd MMM yyyy")}
                </span>
              </span>

              <span className={styles.postCommentsContainer}>
                <button
                  type="button"
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show Comments"
                  className={`${styles.iconActionButton} ${
                    post.showingComments && styles.showingComments
                  }`}
                >
                  <TiMessage className={styles.iconAction} />
                </button>
                <span>{post.num_comments}</span>
              </span>
            </div>
              {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
}

export default Post;
