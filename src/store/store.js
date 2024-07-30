import { configureStore } from "@reduxjs/toolkit";
import redditSlice from "./redditSlice";
import subRedditSlice from "./subRedditSlice";

export default configureStore({
  reducer: {
    reddit: redditSlice,
    subReddit: subRedditSlice,
  },
});
