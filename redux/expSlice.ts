import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface expState {
  value: number;
}

// Define the initial state using that type
const initialState: expState = {
  value: 0,
};

export const expSlice = createSlice({
  name: "exp",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setInitalAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { setInitalAmount, incrementByAmount } = expSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectExp = (state: RootState) => state.exp.value;

export default expSlice.reducer;
