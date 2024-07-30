import React from "react";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import Avatar from 'react-avatar';
import styles from "./Comment.module.css";
import {splitUserName} from "../../utils/splitName";

function Comment(props) {
  const { comment } = props;
  let userName = comment.author;
  if (comment.author) {
    userName = splitUserName(comment.author);
  }
  return (
    <div className={styles.comment}>
      <div className={styles.commentMetadata}>
        <Avatar name={userName} className={styles.avatarProfileImage} />
        <p className={styles.commentAuthor} >{comment.author}</p>
        <p className={styles.commentCreatedTime}>
        {comment.created_utc ? formatDistanceToNow(new Date(comment.created_utc * 1000), { addSuffix: true }) : null}         
        </p>        
      </div>
      <ReactMarkdown>{comment.body}</ReactMarkdown>
    </div>
  );
}

export default Comment;
