import React from "react";
import Chart from "react-apexcharts";

const options = {
  chart: {
    id: "apexchart-example",
  },
};

function DashboardLineCharts(props) {
  const series = [
    {
      name: "Active Users",
      data: props?.active,
    },
    {
      name: "Inactive Users",
      data: props?.inactive,
    },
    {
      name: "User Sessions",
      data: props?.tasks,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      // width={"250%"}
      // height={"200%"}
      width={"250%"}
      height={"300vh"}
    />
  );
}

export default DashboardLineCharts;
