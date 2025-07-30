import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BarChartProps } from "../../types/chart.types";

const OrderBarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={{
            border: "1px solid #3F9A1E",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}/>
        <Bar dataKey="Orders" fill="#6BBF4E" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderBarChart;
