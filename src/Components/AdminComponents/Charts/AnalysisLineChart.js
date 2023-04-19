import React from 'react';
import Chart from 'react-apexcharts';

const options = {
  chart: {
    id: 'LineChart',
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  stroke: {
    width: '2',
  },
};

function AnalysisLineChart(props) {
  const series = [
    {
      name: 'Active Users',
      data: [
        10, 11, 12, 13, 9, 5, 8, 12, 22, 10, 11, 12, 13, 9, 5, 8, 12, 22, 10,
        11, 12, 13, 9, 5, 8, 12, 22, 10, 11, 12, 13, 9, 5, 8, 12, 22, 10, 11,
        12, 13, 9, 5, 8, 12, 22, 10, 11, 12, 13, 9, 5, 8, 12, 22, 10, 11, 12,
        13, 9, 5, 8, 12, 22, 10, 11, 12, 13, 9, 5, 8, 12, 22, 10, 11, 12, 13, 9,
        5, 8, 12, 22,
      ],
    },
  ];
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width={props?.width}
        height={props?.height}
      />
    </div>
  );
}

export default AnalysisLineChart;
