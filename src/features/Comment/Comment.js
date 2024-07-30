import React from "react";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import Avatar from 'react-avatar';
import styles from "./Comment.module.css";

function Comment(props) {
  const { comment } = props;
  return (
    <div className={styles.comment}>
      <div className={styles.commentMetadata}>
        <Avatar name={comment.author} className={styles.avatarProfileImage} />
        <p className={styles.commentAuthor} >{comment.author}</p>
        <p className={styles.commentCreatedTime}>
        {formatDistanceToNow(new Date(comment.created_utc * 1000), { addSuffix: true })}
        </p>        
      </div>
      <ReactMarkdown>{comment.body}</ReactMarkdown>
    </div>
  );
}

export default Comment;
