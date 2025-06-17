import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0, isDisable: false },
  reducers: {
    INCREMENT: (state) => {
      state.count += 1;
    },
    RESET: (state) => {
      state.count = 0;
    },
    TOGGLE_DISABLE: (state) => {
      state.isDisable = !state.isDisable;
    },
  },
});

export const { INCREMENT, RESET, TOGGLE_DISABLE } = counterSlice.actions;
export default counterSlice.reducer;
