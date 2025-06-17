import { useEffect } from "react";
import { fetchChartData } from "../store/chartSlice";
import { useSelector, useDispatch } from "react-redux";
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

export default function Chart() {
  const { chartCombineData, loading, error } = useSelector(
    (state) => state.chart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  if (loading) return <p>載入中...</p>;
  if (error) return <p>錯誤：{error}</p>;

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={chartCombineData}
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
              { value: "taichung", type: "square", color: "#8fbc8f" },
              { value: "tainan", type: "square", color: "#ffa500" },
              { value: "kaohsiung", type: "square", color: "#6495ed" },
            ]}
          />
          <Bar dataKey="taichung" stackId="a" fill="#8fbc8f" barSize={40} />
          <Bar dataKey="tainan" stackId="a" fill="#ffa500" barSize={40} />
          <Bar dataKey="kaohsiung" stackId="a" fill="#6495ed" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
