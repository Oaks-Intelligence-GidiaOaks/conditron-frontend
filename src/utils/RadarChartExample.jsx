import ReactApexChart from "react-apexcharts";

const data = [
  {
    subject: "Velocity",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Humidity",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Temperature",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Sunlight",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Rainfall",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const RadarChartExample = () => {
  const options = {
    chart: {
      height: 350,
      type: "radar",
    },
    xaxis: {
      categories: data.map((item) => item.subject),
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColor: "#e8e8e8",
          fill: {
            colors: ["#f8f8f8", "#fff"],
          },
        },
      },
    },
    title: {
      text: "Asset Comparison Radar Chart",
    },
    markers: {
      size: 5,
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: 150,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={[
          {
            name: "Asset",
            data: data.map((item) => item.A),
          },
          {
            name: "Asset 2",
            data: data.map((item) => item.B),
          },
        ]}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default RadarChartExample;
