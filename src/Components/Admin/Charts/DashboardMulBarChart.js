import React from "react";
import Chart from "react-apexcharts";

const options = {
  radialBar: {
    dataLabels: {
      name: {
        fontSize: "22px",
      },
      value: {
        fontSize: "16px",
      },
      total: {
        show: true,
        label: "Total",
        formatter: function (w) {
          // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
          return 249;
        },
      },
    },
  },
};

function DashboardMulBarChart(props) {
  const optionsRadial = {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#E6E6E6",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
        },
        track: {
          background: "#E6E6E6",
          strokeWidth: "100%",
          margin: 0, // margin is in pixels
        },

        dataLabels: {
          showOn: "always",
          name: {
            //   offsetY: -20,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            formatter: function (val) {
              return val;
            },
            color: "#111",
            fontSize: "30px",
            show: true,
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              const arr = w.globals.seriesTotals;
              let result = 0;
              arr.map((item) => {
                result = result + item;
              });
              console.log(result);
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return result;
            },
          },
        },
      },
    },

    labels: ["truth", "lie"],
  };

  const series = [props?.truth, props?.lie];
  return (
    <div>
      <Chart
        options={optionsRadial}
        series={series}
        // width={"140%"}
        // height={"200%"}
        width={"120%"}
        height={"330vh"}
        type="radialBar"
      />
    </div>
  );
}

export default DashboardMulBarChart;
