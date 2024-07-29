import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostComments } from "../api/reddit";

export const loadComments = createAsyncThunk(
  "post/getComments",
  async (permalink) => {
    const comments = await getPostComments(permalink);
    return comments;
  }
);

const initialState = {
  // showingComments: false,
  comments: [],
  loadingComments: false,
  errorComments: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.loadingComments = true;
        state.errorComments = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loadingComments = false;
        state.errorComments = false;
      })
      .addCase(loadComments.rejected, (state) => {
        state.loadingComments = false;
        state.errorComments = true;
      });
  },
});

export const selectComments = (state) => state.comments.comments;
export const comments = (state) => state.comments;

export default commentSlice.reducer;
