import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubredits } from "../api/reddit";

export const loadSubReddit = createAsyncThunk(
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
      .addCase(loadSubReddit.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadSubReddit.fulfilled, (state, action) => {
        state.subReddit = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loadSubReddit.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectSubReddit = (state) => state.subReddit.subReddit;
export const selectAllStatesSubReddit = (state) => state.subReddit;
export default subRedditlice.reducer;
