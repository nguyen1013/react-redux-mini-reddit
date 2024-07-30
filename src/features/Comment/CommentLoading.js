import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./Comment.module.css";
import getRandomNumber from "../../utils/getRandomNumber";

function CommentLoading() {
  return (
    <>
      <div className={styles.comment}>
        <div className={styles.commentMetadata}>
          <p className={styles.commentAuthor}>
            <Skeleton width={getRandomNumber(100, 200)} />
          </p>
          <p className={styles.commentCreatedTime}>
            <Skeleton width={getRandomNumber(100, 200)} />
          </p>
        </div>
      </div>
    </>
  );
}
export default CommentLoading;
