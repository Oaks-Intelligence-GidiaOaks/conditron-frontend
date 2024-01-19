import ReactApexChart from "react-apexcharts";

const data = [
  {
    name: "Humidity",
    variable: 10,
    amt: 2400,
  },
  {
    name: "Wind",
    variable: 50,
    amt: 2210,
  },
  {
    name: "Temperature",
    variable: 80,
    amt: 2290,
  },
  {
    name: "Rainfall",
    variable: 8,
    amt: 2000,
  },
  {
    name: "Sunshine",
    variable: 20,
    amt: 2181,
  },
];

const BarChartExample = () => {
  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
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
    title: {
      text: "Risk Variables Rating",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={[{ data: data.map((item) => item.variable) }]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChartExample;
