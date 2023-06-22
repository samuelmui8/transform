import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface fitnessState {
  calories: number;
  completed: string[];
  workout: number;
  minutes: number;
}

// Define the initial state using that type
const initialState: fitnessState = {
  calories: 0,
  completed: [],
  workout: 0,
  minutes: 0,
};

export const fitnessSlice = createSlice({
  name: "fitness",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    resetCompleted: (state) => {
      state.completed = [];
    },
    initCalories: (state, action: PayloadAction<number>) => {
      state.calories = action.payload;
    },
    initWorkout: (state, action: PayloadAction<number>) => {
      state.calories = action.payload;
    },
    initMinutes: (state, action: PayloadAction<number>) => {
      state.calories = action.payload;
    },
    setCalories: (state, action: PayloadAction<number>) => {
      state.calories = action.payload;
    },
    setCompleted: (state, action: PayloadAction<string>) => {
      state.completed = [...state.completed, action.payload];
    },
    setWorkout: (state, action: PayloadAction<number>) => {
      state.workout += action.payload;
    },
    setMinutes: (state, action: PayloadAction<number>) => {
      state.minutes += action.payload;
    },
  },
});

export const {
  resetCompleted,
  setCalories,
  setCompleted,
  setWorkout,
  setMinutes,
  initCalories,
  initMinutes,
  initWorkout,
} = fitnessSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCalorie = (state: RootState) => state.fitness.calories;
export const selectCompleted = (state: RootState) => state.fitness.completed;
export const selectWorkout = (state: RootState) => state.fitness.workout;
export const selectMinutes = (state: RootState) => state.fitness.minutes;

export default fitnessSlice.reducer;
