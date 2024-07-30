import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { AnimatedList } from "react-animated-list";
import CommentLoading from "../Comment/CommentLoading";
import getRandomNumber from "../../utils/getRandomNumber";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from "react-icons/ti";
import { formatDistanceToNow } from "date-fns";
import shortenNumber from "../../utils/shortenNumber";
import Card from "../../components/Cards/Card";
import Comment from "../Comment/Comment";
import Avatar from "react-avatar";
import styles from "./Post.module.css";
import { setUpsVotes } from "../../store/redditSlice";
import { useDispatch } from "react-redux";

function Post(props) {
  const [voteValue, setVoteValue] = useState(0);
  const { post, onToggleComments, index } = props;
  const dispatch = useDispatch();

  const onHandleVote = (newValue, index) => {
    let up;
    if (voteValue === 0) {
      if (newValue === 1) {
        setVoteValue(1);
        up = post.ups + 1;
        dispatch(setUpsVotes({ up, index }));
      }
      if (newValue === -1) {
        setVoteValue(-1);
        up = post.ups - 1;
        dispatch(setUpsVotes({ up, index }));
      }
    } else if (voteValue === 1) {
      setVoteValue(0);
      up = post.ups - 1;
      dispatch(setUpsVotes({ up, index }));
    } else if (voteValue === -1) {
      setVoteValue(0);
      up = post.ups + 1;
      dispatch(setUpsVotes({ up, index }));
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
          <AnimatedList animation="zoom">
            {Array(getRandomNumber(1, 5))
              .fill()
              .map((_, index) => (
                <CommentLoading key={index} />
              ))}
          </AnimatedList>
        </div>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <article key={post.id}>
      <Card>
        <div className={styles.postWrapper}>
          <div className={styles.postVotesContainer}>
            <button
              type="button"
              aria-label="Up vote"
              onClick={() => onHandleVote(1, index)}
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
              onClick={() => onHandleVote(-1, index)}
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
                <Avatar
                  name={post.author}
                  className={styles.avatarProfileImage}
                />
                {/* <img src={avatar} alt="avatar" className={styles.avatar} /> */}
                {post.author}&nbsp;&nbsp;
                <span className={styles.dateOfPost}>
                  &#x2022;&nbsp;
                  {formatDistanceToNow(new Date(post.created_utc * 1000), {
                    addSuffix: true,
                  })}
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
