import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";

// Define a type for the slice state
interface LeaderBoardItem {
  username: string;
  userexp: number;
  userid: string;
}

interface leaderboardState {
  leaderboardInfo: LeaderBoardItem[];
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: leaderboardState = {
  leaderboardInfo: [],
  isLoading: false,
  error: null,
};

export const fetchLeaderboard = createAsyncThunk<
  LeaderBoardItem[],
  void,
  { state: RootState }
>("leaderboard/fetchLeaderboard", async (_, { getState }) => {
  const state = getState();
  const following = [...state.follow.following];
  const usersRef = collection(db, "users");

  const promises = following.map(async (userId: string) => {
    const q = query(usersRef, where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    // Assuming there's only one matching user for each ID
    const userDoc = querySnapshot.docs[0];
    if (userDoc.exists()) {
      const userExp = userDoc.data().exp;
      const username = userDoc.data().name;
      return {
        username,
        userexp: userExp,
        userid: userId,
      };
    }

    // If the user is not found, you might want to handle this case accordingly
    return null;
  });

  const leaderboardItems = await Promise.all(promises);
  return leaderboardItems.filter(Boolean) as LeaderBoardItem[];
});

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.leaderboardInfo = [...action.payload];
    });
    builder.addCase(fetchLeaderboard.rejected, (state, action) => {
      state.isLoading = true;
      state.error = "failed to fetch leaderboard";
    });
    builder.addCase(fetchLeaderboard.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectLeaderboard = (state: RootState) =>
  state.leaderboard.leaderboardInfo;

export default leaderboardSlice.reducer;
