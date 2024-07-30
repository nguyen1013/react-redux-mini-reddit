import React from "react";
import Skeleton from "react-loading-skeleton";
import stylesPostLoading from "./PostLoading.module.css";
import stylesPost from "./Post.module.css";
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from "react-icons/ti";
import getRandomNumber from "../../utils/getRandomNumber";

function PostLoading() {
  return (
    <article className={stylesPostLoading.post}>
      <div className={stylesPost.postVotesContainer}>
        <button
          type="button"
          className={`${stylesPost.iconActionButton} ${stylesPost.upVote}`}
          aria-label="Up vote"
        >
          {/* <TiArrowUpOutline className={stylesPost.iconAction} /> */}
        </button>
        <Skeleton
          className={`${stylesPost.postVotesValue} ${stylesPostLoading.postVotesValueLoading}`}
        />
        <button
          type="button"
          className={`${stylesPost.iconActionButton} ${stylesPost.downVote}`}
          aria-label="Down vote"
        >
          {/* <TiArrowDownOutline className={stylesPost.iconAction} /> */}
        </button>
      </div>

      <div className={stylesPost.postContainer}>
        <h3 className={stylesPost.postTitle}>
          <Skeleton width={getRandomNumber(100, 200)} />
        </h3>

        <div className={stylesPost.postImageContainer}>
          <Skeleton height={250} />
        </div>
        
        <div className={stylesPost.postDetails}>
          <span>
            <Skeleton width={getRandomNumber(20, 50)} />
          </span>
          <span>
            <Skeleton width={getRandomNumber(50, 100)} />
          </span>
          <span className={stylesPost.postCommentsContainer}>
            <button
              type="button"
              className={`${stylesPost.iconActionButton}`}
              aria-label="Show comments"
            >
              {/* <TiMessage className={stylesPost.iconAction} /> */}
            </button>
            <Skeleton width={getRandomNumber(10, 50)} />
          </span>
        </div>
      </div>
    </article>
  );
}
export default PostLoading;
