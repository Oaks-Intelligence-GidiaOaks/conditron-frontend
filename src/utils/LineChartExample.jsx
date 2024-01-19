import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const LineChartExample = ({ selectedRisk }) => {
  const chartData = selectedRisk.map((value) => ({
    ...value,
    date: new Date(value.date).toLocaleTimeString(),
    risk: value.risk.toFixed(2),
  }));

  const options = {
    chart: {
      height: 350,
    },
    xaxis: {
      type: "category",
      categories: chartData.map((item) => item.date),
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "solid",
      color: "#008FFB",
    },
    tooltip: {
      x: {
        format: "HH:mm",
      },
      y: {
        formatter: (value) => `${value}%`,
      },
    },
    legend: {
      show: true,
    },
    title: {
      text: "Risk Analysis Status",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={[
          {
            name: "Risk",
            data: chartData.map((item) => parseFloat(item.risk)),
          },
        ]}
        type="area"
        height={350}
      />
    </div>
  );
};

LineChartExample.propTypes = {
  selectedRisk: PropTypes.arrayOf(
    PropTypes.shape({
      // date: PropTypes.instanceOf(Date).isRequired,
      risk: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LineChartExample;
