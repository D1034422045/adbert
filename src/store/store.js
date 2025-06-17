import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import chartReducer from "./chart/chartSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    chart: chartReducer,
  },
});

export default store;
