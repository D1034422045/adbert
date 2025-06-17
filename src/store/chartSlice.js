import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
const token = import.meta.env.VITE_API_TOKEN;

const monthNames = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const stationIds = {
  tainan: "467410",
  kaohsiung: "467440",
  taichung: "467490",
};

// 通用抓資料函式
const fetchCityMonthData = (cityKey, month) => {
  return axios.get(API_URL, {
    params: {
      Authorization: token,
      Month: month,
      StationID: stationIds[cityKey],
    },
  });
};

export const fetchChartData = createAsyncThunk(
  "chart/fetchChartData",
  async () => {
    // 對三個城市分別做 12 個月的請求
    const cityKeys = Object.keys(stationIds);
    const allResponses = await Promise.all(
      cityKeys.map((city) =>
        Promise.all(months.map((m) => fetchCityMonthData(city, m)))
      )
    );
    // allResponses 結構：[[台南12個月回應], [高雄12個月回應], [台中12個月回應]]

    // 解析資料，轉成一維陣列
    const cityData = allResponses.map((responses) =>
      responses.map((res) => {
        const monthly =
          res.data.records.data.surfaceObs.location[0].stationObsStatistics
            .AirTemperature.monthly[0];
        return parseInt(monthly.Mean);
      })
    );
    // cityData: [[台南12月氣溫], [高雄12月氣溫], [台中12月氣溫]]

    // 組合資料
    const combinedData = monthNames.map((name, index) => ({
      name,
      tainan: cityData[0][index],
      kaohsiung: cityData[1][index],
      taichung: cityData[2][index],
    }));

    return combinedData;
  }
);

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
