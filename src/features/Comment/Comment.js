import React from "react";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import Avatar from "react-avatar";
import styles from "./Comment.module.css";
import { splitUserName } from "../../utils/splitName";

function Comment(props) {
  const { comment } = props;

  // Split the username to readable name for Avatar component displaying
  let userName = comment.author;
  if (comment.author) {
    userName = splitUserName(comment.author);
  }

  return (
    <div className={styles.comment}>
      <div className={styles.commentMetadata}>
        <div className={styles.avatarContainer}>
        {comment.body ? (
          <Avatar name={userName} className={styles.avatarProfileImage} />
        ) : null}

        <p className={styles.commentAuthor}>{comment.author}</p>
        </div>
        <p className={styles.commentCreatedTime}>
          {comment.created_utc
            ? formatDistanceToNow(new Date(comment.created_utc * 1000), {
                addSuffix: true,
              })
            : null}
        </p>
      </div>
      <ReactMarkdown>{comment.body}</ReactMarkdown>
    </div>
  );
}

export default Comment;
