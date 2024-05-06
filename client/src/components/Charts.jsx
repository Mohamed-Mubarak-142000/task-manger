import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Charts = ({ data }) => {
  return (
    <div>
      <h1 className="text-gray-600 p-3 my-5 text-[22px]">Charts by priority</h1>
      <ResponsiveContainer width={"90%"} height={400}>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey={"name"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray={"3  3"} />
          <Bar dataKey={"total"} fill="#0084ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
