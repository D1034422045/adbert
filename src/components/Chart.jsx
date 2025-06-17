import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
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

const months = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Chart() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    async function getCityTemperatureData(fetchFnPerMonth) {
      try {
        const responses = await Promise.all(months.map(fetchFnPerMonth));

        const allData = responses.map((res) => {
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

        return allData;
      } catch (err) {
        console.error("有錯誤：", err);
        return [];
      }
    }

    async function fetchData() {
      const tainan = await getCityTemperatureData(fetchTainanMonthData);
      const kaohsiung = await getCityTemperatureData(fetchKaohsiungMonthData);
      const taichung = await getCityTemperatureData(fetchTaichungMonthData);

      const combinedData = monthNames.map((name, index) => ({
        name,
        tainan: parseInt(tainan[index].temperature),
        kaohsiung: parseInt(kaohsiung[index].temperature),
        taichung: parseInt(taichung[index].temperature),
      }));
      setCombinedData(combinedData);
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={combinedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="2%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis ticks={[0, 20, 40, 60, 80, 100]} />
          <Tooltip />
          <Legend
            payload={[
              { value: "kaohsiung", type: "square", color: "#6495ed" },
              { value: "taichung", type: "square", color: "#8fbc8f" },
              { value: "tainan", type: "square", color: "#ffa500" },
            ]}
          />
          <Bar dataKey="taichung" stackId="a" fill="#8fbc8f" barSize={40} />
          <Bar dataKey="kaohsiung" stackId="a" fill="#6495ed" barSize={40} />
          <Bar dataKey="tainan" stackId="a" fill="#ffa500" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
