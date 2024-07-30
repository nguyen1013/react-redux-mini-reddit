import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubredits } from "../api/reddit";

export const loadSubReddits = createAsyncThunk(
  "subReddit/getsubReddit",
  async () => {
    const subReddit = await getSubredits();
    return subReddit;
  }
);

const initialState = {
  subReddit: [],
  error: false,
  isLoading: false,
};

const subRedditlice = createSlice({
  name: "subReddit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSubReddits.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadSubReddits.fulfilled, (state, action) => {
        state.subReddit = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loadSubReddits.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectSubReddits = (state) => state.subReddit.subReddit;
export const selectAllStatesSubReddits = (state) => state.subReddit;
export default subRedditlice.reducer;
