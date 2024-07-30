import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import {
  getSubreditPosts,
  getSearchResults,
  getPostComments,
} from "../api/reddit";

export const loadPosts = createAsyncThunk(
  "posts/getPosts",
  async (subreddit) => {
    const posts = await getSubreditPosts(subreddit);
    const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    return postsWithMetadata;
  }
);

export const loadSearchResults = createAsyncThunk(
  "posts/getSearch",
  async (query) => {
    const posts = await getSearchResults(query);
    const postsWithMetadata = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    return postsWithMetadata;
  }
);

export const loadComments = createAsyncThunk(
  "posts/getComments",
  async ({ index, permalink }) => {
    const comments = await getPostComments(permalink);
    return comments;
  }
);

const initialState = {
  searchTerm: "",
  posts: [],
  error: false,
  isLoading: false,  
  selectedSubreddit: "/r/Home",
};

const redditSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setUpsVotes(state, action) {
      const { up, index } = action.payload;
      state.posts[index].ups = up;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(loadSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loadSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(loadComments.pending, (state, action) => {
        const { index } = action.meta.arg;
        state.posts[index].showingComments =
          !state.posts[index].showingComments;
        if (!state.posts[index].showingComments) {
          return;
        }
        state.posts[index].loadingComments = true;
        state.posts[index].errorComments = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        const { index } = action.meta.arg;
        state.posts[index].loadingComments = false;
        state.posts[index].errorComments = false;
        state.posts[index].comments = action.payload;
      })
      .addCase(loadComments.rejected, (state, action) => {
        const { index } = action.meta.arg;
        state.posts[index].loadingComments = false;
        state.posts[index].errorComments = true;
      });
  },
});

export const selectPosts = (state) => state.reddit.posts;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectAllStates = (state) => state.reddit;
export const selectSelectedSubReddit = (state) =>
  state.reddit.selectedSubreddit;

export const { setSearchTerm, setUpsVotes, setSelectedSubreddit } = redditSlice.actions;

export default redditSlice.reducer;
