import { configureStore } from "@reduxjs/toolkit";
import redditSlice from "./redditSlice";
import subRedditSlice from "./subRedditSlice";
import commentSlice from "./commentSlice";

export default configureStore({
  reducer: {
    reddit: redditSlice,
    subReddit: subRedditSlice,
    comments: commentSlice
  },
});
