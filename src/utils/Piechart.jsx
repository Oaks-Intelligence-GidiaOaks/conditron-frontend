import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import PropTypes from "prop-types";

const data = [
  { name: "Low Risk", value: 40 },
  { name: "Medium Risk", value: 38 },
  { name: "High Risk", value: 17 },
  { name: "Critical Risk", value: 5 },
];

const COLORS = ["#93D04F", "#FFC000", "#F10603", "#F6B492"];

const CustomTooltip = ({ payload }) => {
  if (payload && payload.length) {
    const dataPoint = payload[0];
    return (
      <div
        style={{ background: "#fff", padding: "5px", border: "1px solid #ccc" }}
      >
        {`${dataPoint.name}: ${dataPoint.value}%`}
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: COLORS[0],
          marginRight: "5px",
        }}
      />
      <span>Low Risk</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: COLORS[1],
          marginRight: "5px",
        }}
      />
      <span>Medium Risk</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: COLORS[3],
          marginRight: "5px",
        }}
      />
      <span>Critical Risk</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: COLORS[2],
          marginRight: "5px",
        }}
      />
      <span>High Risk</span>
    </div>
  </div>
);

const RiskPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
          label={(entry) => `${entry.name}: ${entry.value}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      payload: PropTypes.object,
      dataKey: PropTypes.string,
    })
  ),
};

export default RiskPieChart;
