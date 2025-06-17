import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCityMonthData } from "../services/weatherApi";
import { monthNames, months, stationIds } from "../constants/chartConstants";

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
