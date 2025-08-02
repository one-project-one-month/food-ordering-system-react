import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { PieChartProps } from "../../types/chart.types";

const COLORS = ["#3F9A1E", "#2E6D14", "#6BBF4E"];

const OrderPieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{
            border: "1px solid #3F9A1E",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OrderPieChart;
