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
    console.log(subreddit, posts);
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
  "posts/getSearchResults",
  async (query) => {
    const posts = await getSearchResults(query);
    return posts;
  }
);

export const loadComments = createAsyncThunk(
  "posts/getComments",
  async (index, permalink) => {
    const comments = await getPostComments(permalink);
    console.log(index, comments);
    return { index, comments };
  }
);

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: "",
  selectedSubreddit: "/r/Home",
};

const redditSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost(state, action) {
      state.posts = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    toogleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
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
        state.posts[action.payload.index].showingComments =
          !state.posts[action.payload.index].showingComments;
        if (!state.posts[action.payload.index].showingComments) {
          return;
        }
        state.posts[action.payload.index].loadingComments = true;
        state.posts[action.payload.index].error = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.posts[action.payload.index].loadingComments = false;
        state.posts[action.payload.index].error = false;
        state.posts[action.payload.index].comments = action.payload.comments;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.posts[action.payload.index].loadingComments = false;
        state.posts[action.payload.index].error = true;
      });
  },
});

export const selectPosts = (state) => state.reddit.posts;

export const selectAllStates = (state) => state.reddit;
export const selectSelectedSubReddit = (state) =>
  state.reddit.selectedSubreddit;

export const { setPost, setSearchTerm, toogleShowingComments } =
  redditSlice.actions;

export default redditSlice.reducer;

// export const selectFilteredPosts = createSelector(
//    [selectPosts, selectAllStates],
//    (posts, allStates) => {
//      const { searchTerm } = allStates;
//      return posts.filter((post) =>
//        post.title.toLowerCase().includes(searchTerm.toLowerCase())
//      );
//    }
// )
