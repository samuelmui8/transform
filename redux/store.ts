import { configureStore } from "@reduxjs/toolkit";
import expReducer from "./expSlice";
import fitnessReducer from "./fitnessSlice";
import followingReducer from "./followSlice";

export const store = configureStore({
  reducer: {
    exp: expReducer,
    fitness: fitnessReducer,
    follow: followingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
