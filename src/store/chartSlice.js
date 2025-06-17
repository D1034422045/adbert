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

const fetchTainanMonthData = (month) => {
  return axios.get(API_URL, {
    params: {
      Authorization: token,
      Month: month,
      StationID: "467410",
    },
  });
};

const fetchKaohsiungMonthData = (month) => {
  return axios.get(API_URL, {
    params: {
      Authorization: token,
      Month: month,
      StationID: "467440",
    },
  });
};

const fetchTaichungMonthData = (month) => {
  return axios.get(API_URL, {
    params: {
      Authorization: token,
      Month: month,
      StationID: "467490",
    },
  });
};

export const fetchChartData = createAsyncThunk(
  "chart/fetchChartData",
  async () => {
    const tainanResponses = await Promise.all(months.map(fetchTainanMonthData));
    const tainan = tainanResponses.map((res) => {
      const monthly =
        res.data.records.data.surfaceObs.location[0].stationObsStatistics
          .AirTemperature.monthly[0];
      const city =
        res.data.records.data.surfaceObs.location[0].station.StationName;
      return {
        month: monthly.Month,
        temperature: monthly.Mean,
        city,
      };
    });

    const kaohsiungResponses = await Promise.all(
      months.map(fetchKaohsiungMonthData)
    );
    const kaohsiung = kaohsiungResponses.map((res) => {
      const monthly =
        res.data.records.data.surfaceObs.location[0].stationObsStatistics
          .AirTemperature.monthly[0];
      const city =
        res.data.records.data.surfaceObs.location[0].station.StationName;
      return {
        month: monthly.Month,
        temperature: monthly.Mean,
        city,
      };
    });

    const taichungResponses = await Promise.all(
      months.map(fetchTaichungMonthData)
    );
    const taichung = taichungResponses.map((res) => {
      const monthly =
        res.data.records.data.surfaceObs.location[0].stationObsStatistics
          .AirTemperature.monthly[0];
      const city =
        res.data.records.data.surfaceObs.location[0].station.StationName;
      return {
        month: monthly.Month,
        temperature: monthly.Mean,
        city,
      };
    });

    const combinedData = monthNames.map((name, index) => ({
      name,
      tainan: parseInt(tainan[index].temperature),
      kaohsiung: parseInt(kaohsiung[index].temperature),
      taichung: parseInt(taichung[index].temperature),
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
