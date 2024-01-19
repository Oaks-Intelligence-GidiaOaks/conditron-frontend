import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const generateData = (count, yrange) => {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = "w" + (i + 1).toString();
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push({
      x,
      y,
    });
    i++;
  }
  return series;
};

const HeatmapChart = () => {
  const [state] = useState({
    series: [
      { name: "Severe", data: generateData(5, { min: -30, max: 55 }) },
      { name: "Major", data: generateData(5, { min: -30, max: 55 }) },
      { name: "Moderate", data: generateData(5, { min: -30, max: 55 }) },
      { name: "Minor", data: generateData(5, { min: -30, max: 55 }) },
      { name: "Insignificant", data: generateData(5, { min: -30, max: 55 }) },
    ],
    options: {
      chart: { height: 350, type: "heatmap" },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [
              { from: -30, to: 5, name: "low", color: "#00A100" },
              { from: 6, to: 20, name: "medium", color: "#128FD9" },
              { from: 21, to: 45, name: "high", color: "#FFB200" },
              { from: 46, to: 55, name: "extreme", color: "#FF0000" },
            ],
          },
        },
      },
      dataLabels: { enabled: false },
      stroke: { width: 1 },
      title: { text: "Asset Risk Heat Map" },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="heatmap"
        height={350}
      />
    </div>
  );
};

export default HeatmapChart;
