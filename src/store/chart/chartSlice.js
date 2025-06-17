import { createSlice } from "@reduxjs/toolkit";
import { fetchChartData } from "./chartThunks";

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartCombineData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartCombineData = action.payload;
        state.loading = false;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "資料取得失敗";
      });
  },
});

export default chartSlice.reducer;
