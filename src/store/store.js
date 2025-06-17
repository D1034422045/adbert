import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import chartReducer from "./chartSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    chart: chartReducer,
  },
});

export default store;
