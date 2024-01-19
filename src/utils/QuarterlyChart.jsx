import ReactApexChart from "react-apexcharts";

const data = [
  {
    name: "1st Quarter",
    "Very Low Risk": 30,
    "Low Risk": 60,
    "Medium Risk": 80,
    "High risk": 42,
    "Very High Risk": 75,
  },
  {
    name: "2nd Quarter",
    "Very Low Risk": 30,
    "Low Risk": 60,
    "Medium Risk": 30,
    "High risk": 46,
    "Very High Risk": 45,
  },
  {
    name: "3rd Quarter",
    "Very Low Risk": 30,
    "Low Risk": 60,
    "Medium Risk": 80,
    "High risk": 30,
    "Very High Risk": 75,
  },
  {
    name: "4th Quarter",
    "Very Low Risk": 30,
    "Low Risk": 60,
    "Medium Risk": 80,
    "High risk": 10,
    "Very High Risk": 75,
  },
];

const QuarterlyChart = () => {
  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.map((item) => item.name),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Risk Level",
      },
    },
    title: {
      text: "Asset Inherent Risk",
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={Object.keys(data[0])
          .slice(1)
          .map((key) => ({ name: key, data: data.map((item) => item[key]) }))}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default QuarterlyChart;
