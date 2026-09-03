import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      const existing = new Set(state.map((u)=>u._id))
      const unique = action.payload.filter((u)=> !existing.has(u._id));
      return [...state, ...unique];
    },
    removeFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id != action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
