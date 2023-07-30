import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface followState {
  following: string[];
}

// Define the initial state using that type
const initialState: followState = {
  following: [],
};

export const followSlice = createSlice({
  name: "follow",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setInitialFollowing: (state, action: PayloadAction<string[]>) => {
      state.following = action.payload;
    },
    addToFollowing: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.following = [...state.following, userId];
    },
    removeFromFollowing: (state, action: PayloadAction<string>) => {
      const index = state.following.indexOf(action.payload);
      // only splice array when item is found
      if (index > -1) {
        state.following.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
  },
});

export const { setInitialFollowing, addToFollowing, removeFromFollowing } =
  followSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFollowing = (state: RootState) => state.follow.following;

export default followSlice.reducer;
