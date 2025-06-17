import { stationIds } from "../constants/chartConstants";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
const token = import.meta.env.VITE_API_TOKEN;

// 通用抓資料函式
export const fetchCityMonthData = (cityKey, month) => {
  return axios.get(API_URL, {
    params: {
      Authorization: token,
      Month: month,
      StationID: stationIds[cityKey],
    },
  });
};
